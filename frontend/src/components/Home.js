import React from 'react'
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Trends from "./Trends";


const Home = () => {
  return (
  <>
    <Sidebar />
      <Feed />  
      <Trends />
    
    </>
  )
}

export default Home