import styled from "styled-components";
import Nav from "./components/Nav";
import "./App.css";
import Banner from "./components/Banner";
import Category from "./components/Category";
import Row from "./components/Row";
import requests from "./api/requests";
import { Outlet, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage"
import Mainpage from "./pages/MainPage";
import SearchPage from "./pages/SearchPage"
import DetailPage from "./pages/DetailPage"
const Layout = () => {
  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  )
}

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LoginPage />} />
          <Route path="main" element={<Mainpage />} />
          <Route path=":movieId" element={<DetailPage />} />
          <Route path="search" element={<SearchPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

