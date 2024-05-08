import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from "react-router-dom";
import AuthContextProvider from "./context/AuthContextProvider.jsx";
import FavoriteRecipesProvider from "./context/FavoriteRecipesProvider.jsx";
import SearchedRecipesProvider from "./context/SearchedRecipesProvider.jsx"
import PreviousPageProvider from "./context/PreviousPageProvider.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Router>
        <AuthContextProvider>
            <FavoriteRecipesProvider>
                <SearchedRecipesProvider>
                    <PreviousPageProvider>
                        <App />
                    </PreviousPageProvider>
                </SearchedRecipesProvider>
            </FavoriteRecipesProvider>
        </AuthContextProvider>
      </Router>
  </React.StrictMode>,
)
