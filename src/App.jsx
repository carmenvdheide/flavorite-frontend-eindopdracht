import React from "react"
import './App.css'
import Navigation from "./components/navigation/Navigation.jsx";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/home/home.jsx";
import AllRecipes from "./pages/all-recipes/all-recipes.jsx";
import RandomRecipe from "./pages/random-recipe/random-recipe.jsx";
import Login from "./pages/login/login.jsx";
import RandomRecipeDetails from "./components/random-recipe-details/RandomRecipeDetails.jsx";
import AllRecipeDetails from "./components/all-recipe-details/AllRecipeDetails.jsx";
import Register from "./pages/RegisterForm/Register.jsx";
import Profile from "./pages/profile/profile.jsx";
import HomeRecipeDetails from "./components/home-recipe-details/HomeRecipeDetails.jsx";
import Footer from "./components/footer/footer.jsx";


function App() {

  return (
    <>
        <Navigation/>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/recipes" element={<AllRecipes/>}/>
            <Route path="/random" element={<RandomRecipe/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path="/recipes/:id" element={<AllRecipeDetails/>}/>
            <Route path="random/:id" element={<RandomRecipeDetails/>}/>
            <Route path="home/:id" element={<HomeRecipeDetails/>}/>

        </Routes>
        <Footer/>
    </>
  )
}

export default App
