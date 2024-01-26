import { useState } from 'react'
import './App.css'
import Navigation from "./components/navigation/Navigation.jsx";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/home/home.jsx";
import AllRecipes from "./pages/all-recipes/all-recipes.jsx";
import RandomRecipe from "./pages/random-recipe/random-recipe.jsx";
import Login from "./pages/login/login.jsx";
import RecipeCard from "./components/recipe-card/recipe-card.jsx";
import RecipeDetails from "./pages/recipe-details/recipe-details.jsx";


function App() {

  return (
    <>
        <Navigation/>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/recipes" element={<AllRecipes/>}/>
            <Route path="/random" element={<RandomRecipe/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/recipes/:id" element={<RecipeDetails/>}/>
        </Routes>
    </>
  )
}

export default App
