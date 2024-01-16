import { useState } from 'react'
import './App.css'
import Navigation from "./components/navigation/Navigation.jsx";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/home/home.jsx";
import AllRecipes from "./pages/all-recipes/all-recipes.jsx";
import RandomRecipe from "./pages/random-recipe/random-recipe.jsx";
import Login from "./pages/login/login.jsx";


function App() {

  return (
    <>
        <Navigation/>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/recipes" element={<AllRecipes/>}/>
            <Route path="/random" element={<RandomRecipe/>}/>
            <Route path="/login" element={<Login/>}/>
        </Routes>
    </>
  )
}

export default App
