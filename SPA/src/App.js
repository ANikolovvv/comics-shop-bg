import { Route, Routes } from "react-router-dom";
import {useEffect, useState}from 'react';
import AuthContexts from "./contexts/authContext";
import Catalog from "./components/Catalog/Catalog";
import Create from "./components/Create/Create";
import Details from "./components/Details/Details";
import Header from "./components/common/Header/Header";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { Footer } from "./components/common/Footer/Footer";
import { MyOrder } from "./components/MyOrder/MyOrder";
import { NotFound } from "./components/404/404";
import { Edit } from "./components/Edit/Edit";


function App() {
  const [user,setUser]=useState();
    console.log(user,'attach user')
    console.log(setUser)
  useEffect(()=>{

  },[])
 // value={[user,setUser]}
  return (
    <AuthContexts.Provider value={[user,setUser]} >
    <div className="App">
      <Header ></Header>
      <main className="main">
        <Routes>
          <Route path="/"  element={<Home/>}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/catalog/*" element={<Catalog />}></Route>
          <Route path="/create" element={<Create />}></Route>
          <Route path="/my-orders" element={<MyOrder/>}></Route>
          <Route path="/details/:id" element={<Details />}></Route>
          <Route path="/edit/:id" element={<Edit />}></Route>
          <Route path="*" element={<NotFound/>}></Route>
        </Routes>
      </main>
         <Footer/>
    </div>
    </AuthContexts.Provider>
  );
}

export default App;
