import React, { useContext, useEffect, useState } from "react";
import "./css/Profile.css";
import Sidebar from "./Sidebar";
import questionContext from "../context/questions/questionContext";

const Profile = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showQuestions, setShowQuestions] = useState(true);
  const [showAnswers, setShowAnswers] = useState(false);

  const handleQuestionClick = () => {
    setShowQuestions(true);
    setShowAnswers(false);
  };

  const handleAnswerClick = () => {
    setShowQuestions(false);
    setShowAnswers(true);
  };
  // Function to set the selected question when the edit button is clicked
  const handleEditClick = (question) => {
    setSelectedQuestion(question);
  };
  const hashtags = ["academic", "scholarship", "extracuricular"];
  const context = useContext(questionContext);
  const { deleteQuestion } = context;

  const onChange = (e) => {
    const { name, value } = e.target;

    // Handle tags input
    if (name === "tags") {
      const tagsArray = value.split(",").map((tag) => tag.trim());
      setQuestion((prevState) => ({
        ...prevState,
        tags: tagsArray,
      }));
    } else {
      setQuestion((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const [question, setQuestion] = useState({
    questionName: "",
    questionUrl: "",
    tags: [],
    userId: "",
    userimgUrl: "",
    username: "",
    userbio: "",
  });

  const handleClick = (e) => {
    e.preventDefault();
  };

  const [user, setUser] = useState(null); // Initialize user state with null
  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/auth/getuser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        });

        if (!response.ok) {
          console.error("Error fetching user data:", response.statusText);
          return;
        }

        const json = await response.json();
        setUser(json.user[0]); // Assuming you want to set the first user in the array
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUserData();
  }, []);

  return (
    <div>
      {/* modal for edit */}

      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content">
            <h1> </h1>
            {selectedQuestion && (
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Question: {selectedQuestion.questionName}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>

                <input
                  type="text"
                  className="form-control"
                  id="recipient-name"
                  placeholder="Start with Why? What ? How? etc"
                  onChange={onChange}
                  name="questionName"
                />

                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Url: {selectedQuestion.questionUrl}
                  </h5>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="img-url"
                  placeholder="with url"
                  onChange={onChange}
                  name="questionUrl"
                />
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Tags: {selectedQuestion.tags}
                </h5>
                </div>
                <input
                  type="text"
                  className="create__control"
                  placeholder="tag"
                  onChange={onChange}
                  name="tags"
                />

                <div className="modal-footer">
                  <button
                    type="button"
                    className="button-17"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={handleClick}
                    className="button-17"
                    data-dismiss="modal"
                    data-toggle="modal"
                    data-target=".bd-example-modal-sm"
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* end */}
      <Sidebar></Sidebar>
      <div className="wrapper">
        <div className="left">
          <img src={user?.imgUrl} alt="user" width="100" />
          <h4>{user?.name}</h4>
          <p>{user?.bio}</p>
          <div className="info">
            <h3>Information</h3>
            <div className="info_data">
              <div className="data">
                <h4>Email</h4>
                <p>{user?.email}</p>
              </div>
              <div className="data">
                <h4>Prn_number</h4>
                <p>{user?.prn}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="projects">
            <div className="title">
              <span>
                <button
                  className={`heading ${showQuestions ? "active" : ""}`}
                  onClick={handleQuestionClick}
                >
                  Question
                </button>
                <button
                  className={`heading ${showQuestions ? "active" : ""}`}
                  onClick={handleAnswerClick}
                >
                  Answer
                </button>
              </span>
            </div>
            <div className="projects_data">
              {showQuestions && (
                <div className="data">
                  <h4>Question </h4>
                  <p></p>
                  {user?.questions.map((question, index) => (
                    <div key={index}>
                      <div className="postss">
                        <div className="post_first">
                          <div className="posts__first__img asd">
                            <img src={question.userimgUrl} />
                          </div>
                          <span>
                            <div className="user_data">
                              <div className="name">{question.username} </div>
                              <div className="posts__first__username">
                                <small>{question.userbio}</small>
                              </div>
                            </div>
                          </span>
                        </div>
                        <div className="post_details">
                          <div className="posts__first__name">
                            <strong>{question.questionName}</strong>{" "}
                          </div>

                          <div className="post_details__img">
                            {question.questionUrl !== "" ? (
                              <img src={question.questionUrl} alt="post" />
                            ) : null}
                          </div>
                          <div className="icons">
                            <div className="edit">
                              <button
                                data-toggle="modal"
                                data-target="#exampleModal"
                                data-whatever="@mdo"
                                style={{
                                  background: "none",
                                  border: "none",
                                  cursor: "pointer",
                                }}
                                onClick={() => handleEditClick(question)}
                              >
                                <i class="fa-regular fa-pen-to-square fa-xs"></i>
                              </button>
                            </div>
                            <div className="delete">
                              <i
                                class="fa-regular fa-trash-can fa-xs"
                                onClick={() => {
                                  deleteQuestion(question._id);
                                }}
                              ></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {showAnswers && (
                <div className="data">
                  <h4>Answeres</h4>
                  <p></p>
                  <div>
                    {user && user.answers.length > 0 && (
                      <div>
                        {user.answers.map((answer, index) => (
                          <div key={index}>
                            {answer.answer}
                            <div className="icons">
                              <div className="edit">
                                <i class="fa-regular fa-pen-to-square fa-xs"></i>
                              </div>
                              <div className="delete">
                                <i
                                  class="fa-regular fa-trash-can fa-xs"
                                  onClick={() => {
                                    deleteQuestion(question._id);
                                  }}
                                ></i>
                              </div>
                            </div>
                            <hr></hr>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="social_media">
            <ul>{/* Add your social media links here */}</ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
