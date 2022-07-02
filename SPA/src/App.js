import { Route, Routes } from "react-router-dom";
import {useEffect, useState}from 'react';
import AuthContexts from "./contexts/authContext";
import Catalog from "./components/Catalog/Catalog";
import Create from "./components/Create/Create";
import Details from "./components/Details/Details";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { Footer } from "./components/Footer/Footer";


function App() {
  const [user,setUser]=useState();
    console.log(user,'attach user')
    console.log(setUser)
  useEffect(()=>{

  },[])
  return (
    <AuthContexts.Provider value={[user,setUser]}>
    <div className="App">
      <Header user={user}></Header>
      <main className="main">
        <Routes>
          <Route path="/"  element={<Home/>}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/catalog/*" element={<Catalog />}></Route>
          <Route path="/create" element={<Create />}></Route>
          <Route path="/details/:id" element={<Details />}></Route>
        </Routes>
      </main>
         <Footer/>
    </div>
    </AuthContexts.Provider>
  );
}

export default App;
