import { React, useContext, useEffect, useState } from "react";
import "./css/AddQuestion.css";

import {
  FaRegImage,
  FaRegListAlt,
  FaRegSmile,
  FaCalendarCheck,
} from "react-icons/fa";

import questionContext from "../context/questions/questionContext";

const AddQuestion = () => {

  //modal
  const [showModal, setShowModal] = useState(false);
  //
  const hashtags = ["academic", "scholarship", "extracuricular"]; // Add your hashtags here
  const [selectedHashtags, setSelectedHashtags] = useState([]);

  //
  //user
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

  // Empty dependency array to ensure the effect runs only once

  const context = useContext(questionContext);
  const { addQuestion } = context;
  const userInitial = [];

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

    if (localStorage.getItem("token")) {
      if (question.questionName === "") {
        
      } else {
        addQuestion(
          question.questionName,
          question.questionUrl,
          question.tags,
          user?._id,
          user?.imgUrl,
          user?.name,
          user?.bio
        );
        setQuestion({
          questionName: "",
          questionUrl: "",
          tags: [],
          userId: user?._id,
          userimgUrl: user?.imgUrl,
          username: user?.name,
          userbio: user?.bio,
        });
        setShowModal(true);
      }
    } else {
      alert("Please Login");
    }
  };

  return (
    <>
      <div className="create">
        <div className="create__first">
          <div className="create__img">
            <img src={user?.imgUrl} alt="profile img" />
          </div>
          <div className="create__input">
            <input
              type="text"
              className="create__control"
              placeholder="What's the question?"
              onChange={onChange}
              name="questionName"
            />
          </div>
        </div>
        <div className="create__second">
          <div className="create__icons">
            <FaRegImage className="ic" />
            <FaRegListAlt className="ic" />
            <FaRegSmile className="ic" />
            <FaCalendarCheck className="ic" />
          </div>
          <div className="create__btn">
            <button
              className="button-17"
              data-toggle="modal"
              data-target="#exampleModal"
              data-whatever="@mdo"
            >
              Ask Question
                          </button>
                         
          </div>
        </div>
      </div>
      {/* Modal */}

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
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Question
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
            <p>
              Tips on getting good answers quickly Make sure your question has
              not been asked already Keep your question short and to the point
              Double-check grammar and spelling
            </p>
            <input
              type="text"
              className="form-control"
              id="recipient-name"
              placeholder="Start with Why? What ? How? etc"
              onChange={onChange}
              name="questionName"
            />
            <p>
              <button
                className="button-17"
                type="button"
                data-toggle="collapse"
                data-target="#collapseExample"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                Img URL
              </button>
              <button
                className="button-17"
                type="button"
                data-toggle="collapse"
                data-target="#collapseExample-2"
                aria-expanded="false"
                aria-controls="collapseExample-2"
              >
                Hashtag
              </button>
            </p>
            <div className="collapse" id="collapseExample">
              <input
                type="text"
                className="form-control"
                id="img-url"
                placeholder="with url"
                onChange={onChange}
                name="questionUrl"
              />
            </div>
            <divcreate__control className="collapse" id="collapseExample-2">
              <p>
                {hashtags.map((hashtag, index) => (
                  <button
                    key={index}
                    className="button-17"
                    type="button"
                    onClick={() =>
                      setSelectedHashtags([...selectedHashtags, hashtag])
                    }
                  >
                    {hashtag}
                  </button>
                ))}
              </p>
              <input
                type="text"
                className="create__control"
                placeholder="tag"
                onChange={onChange}
                name="tags"
              />
            </divcreate__control>

            <div className="modal-footer">
              <button type="button" className="button-17" data-dismiss="modal">
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
        </div>
        
      </div>
 {/* alert */}
 
 {showModal && (
<div className="modal fade bd-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-sm">
  <div className="alert">
    <div className="modal-content">
    <div className="modal_heading">
    <i class="fa-regular fa-circle-check fa-2xl" style={{color: "green"}}></i>
     </div>
     <div className="modal_content" style={{paddingTop: "20px"}}>
     <p>successfully Done!</p>
     </div>
     <button type="button" className="modal_close" data-toggle="modal" data-target=".bd-example-modal-sm">Close</button>
    </div>
  </div>
  </div>
</div>
)}
    </>
  );
};

export default AddQuestion;
