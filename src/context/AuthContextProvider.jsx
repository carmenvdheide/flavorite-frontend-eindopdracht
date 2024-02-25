import {createContext, useEffect, useState} from "react";
import {jwtDecode} from 'jwt-decode'
import axios from "axios";

export const AuthContext = createContext(null)

function AuthContextProvider({children}) {

    const [ authState, setAuthState ] = useState({
        isAuth: false,
        user: null,
        status: 'pending'
    })

    const jwtToken = localStorage.getItem('jwtToken')


    async function handleGetInfo() {
        try {
            const result = await axios.get('https://frontend-educational-backend.herokuapp.com/api/user', {
                headers: {
                    authorization: `Bearer ${jwtToken}`
                }
            })
            console.log(result)
            setAuthState({
                isAuth: true,
                user: {
                    username: result.data.username,
                    email: result.data.email,
                    id: result.data.id
                }, status: 'done'
            })
        } catch (e) {
            console.error(e)
        }
    }


    useEffect(() => {
        const currenTime = Date.now() / 1000
        const decodedToken = jwtDecode(jwtToken)
        console.log(decodedToken.exp)
        console.log(currenTime)
        if (jwtToken && decodedToken.exp > currenTime){
            void handleGetInfo()
            console.log('valid')
        } else {
            setAuthState(prevState => ({
                ...prevState,
                isAuth: false,
                status: 'done'
            }));
        }
    }, []);

    useEffect(() => {
        console.log(authState)
    }, [authState]);


    function login(token) {
        localStorage.setItem('jwtToken', token)
        void handleGetInfo()
    }

    function logout() {
        localStorage.removeItem('jwtToken')
        setAuthState({
            isAuth: false,
            user: null,
            status: 'done'
        })
    }



    const contextData = {
        ...authState,
        login: login,
        logout: logout,
    };


return (
    <AuthContext.Provider value={contextData}>
        {authState.status === 'pending'
            ? <p>loading...</p>
            : children}
    </AuthContext.Provider>
)


}

export default AuthContextProvider