
import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import Trends from "./components/Trends";

//context
import QuestionState from "./context/questions/QuestionState";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import TagPage from "./components/TagPage";
import About from "./components/About";
import { ContactUs } from "./components/ContactUs";


function App() {
  return (
    <>
    <QuestionState>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/about" element={About}></Route>
          <Route path="/contactUs" element={ContactUs}></Route>
          <Route path="/tag/:tag" element={<TagPage />} />
        </Routes>
      </Router>
     
    </QuestionState>
    </>
  );
}

export default App;

