
import React, { createContext, useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"
import axios from "axios"
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext(null)

function AuthContextProvider({ children }) {
    const navigate = useNavigate()

    const [authState, setAuthState] = useState({
        isAuth: false,
        user: null,
        status: "pending",
    })

    async function handleGetInfo() {
        try {
            const jwtToken = localStorage.getItem("jwtToken");
            const result = await axios.get(
                "https://frontend-educational-backend.herokuapp.com/api/user",
                {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                }
            )
            console.log(result)
            setAuthState((prevState) => ({
                ...prevState,
                isAuth: true,
                user: {
                    username: result.data.username,
                    email: result.data.email,
                    id: result.data.id,
                },
                status: "done",
            }))
        } catch (e) {
            console.error(e);
            setAuthState((prevState) => ({
                ...prevState,
                isAuth: false,
                status: "error",
            }))
        }
    }

    useEffect(() => {
        const jwtToken = localStorage.getItem("jwtToken")
        if (!jwtToken) {
            setAuthState((prevState) => ({
                ...prevState,
                isAuth: false,
                status: "done",
            }));
            return
        }

        const decodedToken = jwtDecode(jwtToken);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp > currentTime) {
            void handleGetInfo()
            console.log("valid")
        } else {
            setAuthState((prevState) => ({
                ...prevState,
                isAuth: false,
                status: "done",
            }))
            navigate('/')
        }
    }, [])

    useEffect(() => {
        console.log(authState);
    }, [authState])


    function login(token) {
        localStorage.setItem("jwtToken", token)
        void handleGetInfo()
            .then(() => {
                navigate("/profile")
            })
            .catch ((error) => {
                console.error("Error navigating to profile page:", error)
            })
    }

    function logout() {
        console.log('logout')
        try {
            navigate('/')
        } catch (error) {
            console.error("Error navigating to home page:", error);
        }
        localStorage.removeItem("jwtToken")
        setAuthState({
            isAuth: false,
            user: null,
            status: "done",
        });

    }

    const contextData = {
        ...authState,
        login: login,
        logout: logout,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {authState.status === "pending" ? <p>loading...</p> : children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
