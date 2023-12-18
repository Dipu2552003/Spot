import {React,useContext, useEffect} from "react";
import AddQuestion from "./AddQuestion";
import Post from "./Post";
import examplePosts from "./useExamplePosts"

import questionContext from "../context/questions/questionContext";
const Feed = () => {
  const context = useContext(questionContext);
  const {questions,getQuestions}= context;
  const {tagQuestions,getTagQuestions}= context;


  useEffect(()=>{
    getQuestions()
  })

  return (
    <div className="posts">
      <div className="posts__home">Home</div>
      <AddQuestion />
      <>
 
      {questions.map((question)=>{
        return <Post question={question}/>;
      })}
      
      </>
    
    </div>
  );
};

export default Feed;
