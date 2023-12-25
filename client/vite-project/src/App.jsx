 {/* This is a proper way of commenting in React JS. */}

import {Routes, Route } from "react-router-dom"
import './App.css'
import axios from 'axios'; 
import IndexPage from "./pages/IndexPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import Layout from "./Layout"
import { UserContextProvider } from "./UserContext";
import AccountPage from "./pages/AccountPage.jsx"
import PlacesPage from "./pages/PlacesPage.jsx"
axios.defaults.baseURL = 'http://localhost:4000'; 
axios.defaults.withCredentials=true;



function App() {
  return (
    <UserContextProvider>
    <Routes>
      <Route path="/"element={<Layout/>}>
      <Route index element={<IndexPage/>}/>
      <Route path="/LoginPage" element={<LoginPage/>}/>
      <Route path="/RegisterPage" element={<RegisterPage/>}/>
      <Route path="/AccountPage" element={<AccountPage/>}/>         {/* We are creating subpages in Account page 
      i.e We are creating different subpages within the same page for going to different sections like My Profile, My Accommodations and My Places */}
       <Route path="/AccountPage/places" element={<PlacesPage/>}/> 
      </Route>
      
    </Routes>
    </UserContextProvider>
  )
}

export default App
