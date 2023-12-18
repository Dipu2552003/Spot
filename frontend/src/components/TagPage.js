import React, { useEffect, useState,useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddQuestion from "./AddQuestion";
import Post from "./Post";
import examplePosts from "./useExamplePosts"
import Sidebar from "./Sidebar";

import questionContext from "../context/questions/questionContext";

const TagPage = () => {
  const { tag } = useParams();
  const navigate = useNavigate();

  const context = useContext(questionContext);
  const {questions,getQuestions}= context;
  const {tagQuestions,getTagQuestions}= context;


  useEffect(()=>{
    getTagQuestions(tag)
  })

  return (
    <>
   <Sidebar></Sidebar>
    <div className="posts">
      <div className="posts__home">{tag}</div>
      <AddQuestion />
      <>

      {questions.map((question)=>{
        return <Post question={question}/>;
      })}
      
      </>
    
    </div>
    </>
  );
};

export default TagPage;
