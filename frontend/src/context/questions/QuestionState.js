import QuestionContext from "./questionContext";
import { useState } from "react";


const QuestionState = (props)=>{
   
    const questionsInitial=[]
    const userInitial=[]

    const [questions,setQuestions]=useState(questionsInitial);
    const [user,setUser]= useState(userInitial)

    //getQuestions

    const getQuestions = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/question`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token')
          }
        });
    
        const json = await response.json()
       
      setQuestions(json)
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    //gettagquestion
    const getTagQuestions = async (tag) => {
      try {
        const response = await fetch(`http://localhost:5000/api/question/tag/${tag}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token')
          }
        });
    
        const json = await response.json();
        setQuestions(json);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };


    //addquestion

    const addQuestion = async (questionName, questionUrl, tags, userId, userimgUrl, username,userbio) => {
      try {
        const response = await fetch('http://localhost:5000/api/question', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token')
          },
          body: JSON.stringify({
            questionName: questionName,
            questionUrl: questionUrl,
            tags: tags,
            userId: userId,
            userimgUrl: userimgUrl,
            username: username,
            userbio: userbio,
          })
        });
    
        if (response.ok) {
          const newQuestion = await response.json();
          setQuestions([...questions, newQuestion]);
        } else {
          console.error('Failed to add question');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    const deleteQuestion = async (id) => {
      try {
        const response = await fetch(`http://localhost:5000/api/question/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token')
          }
        });
    
        if (response.ok) {
          // If the deletion was successful, remove the question from the state
          setQuestions((prevQuestions) => prevQuestions.filter((question) => question._id !== id));
          alert("done");
          window.location.reload();
        } else {
          console.error('Failed to delete question');
          alert("not done");
        }
      } catch (error) {
        console.error('An error occurred:', error);
        alert("error");
      }
    };
    

    const editQuestion = async (id, questionName, questionUrl, tags) => {
      try {
        const response = await fetch(`http://localhost:5000/api/question/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token')
          },
          body: JSON.stringify({
            questionName: questionName,
            questionUrl: questionUrl,
            tags: tags,
          })
        });
    
        if (response.ok) {
          // If the update was successful, you can handle the response as needed
          const updatedQuestion = await response.json();
          // Perform any necessary updates or actions with the updatedQuestion data
        } else {
          console.error('Failed to update question');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };
    

    const getuser = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/auth/getuser`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token')
          }
        });
    
        const json = await response.json()
       
       setUser(json);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    


    return (
        <QuestionContext.Provider value={{ questions, addQuestion, getQuestions,getuser,getTagQuestions,deleteQuestion,editQuestion}}>
          {props.children}
        </QuestionContext.Provider>
      )

}

export default QuestionState;