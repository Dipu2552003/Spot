import { React, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Post.css";
import {
  FaRegCheckCircle,
  FaComment,
  FaRegChartBar,
  FaHeart,
  FaLeaf,
} from "react-icons/fa";

import questionContext from "../context/questions/questionContext";

const Post = (props) => {
  //modal
  const [showModal, setShowModal] = useState(false);

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
        setUser(json.user[0]);
        console.log(user); // Assuming you want to set the first user in the array
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUserData();
  }, []);

  //user stuff end

  const context = useContext(questionContext);
  const { question } = props;
  const [answer, setAnswer] = useState(""); // Change to string

  let navigate = useNavigate();

  const onChange = (e) => {
    setAnswer(e.target.value); // Update directly with the value
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(answer===""){
      alert("answer is empty");
    }else{
      setShowModal(true);
    }
    const response = await fetch("http://localhost:5000/api/answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        answer,
        questionId: question._id,
        userId: user?._id,
        userimgUrl: user?.imgUrl,
        username: user?.name,
        userbio: user?.bio,
      }),
    });

    const json = await response.json();
    // console.log(json);
    console.log(user?.bio);

    if (json.answer) {
      console.log(json.answer);
      
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="postss">
      <div className="post_first">
        <div className="posts__first__img asd">
          <img src={question.userimgUrl} />
        </div>
        <span>
          <div className="name">{question.username}</div>
          <div className="posts__first__username">
            <small>{question.userbio}</small>
          </div>
        </span>
        <div className="posts__first__username">
          {/* <span>{question.tags}</span> */}
        </div>
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
        <div className="post_details">
          {question.answers.map((answerObj) => (
            <div className="postss__details__msg" key={answerObj._id}>
              <div className="post_first">
                <div className="posts__first__img asd">
                  <img src={answerObj.userimgUrl} />
                </div>
                <span>
                  <div className="name">{answerObj.username}</div>
                  <div className="posts__first__username">
                    <small>{answerObj?.userbio}</small>
                  </div>
                </span>
                <div className="posts__first__username">
                  {/* <span>{question.tags}</span> */}
                </div>
              </div>
              <br></br>
              {answerObj?.answer}

              <hr />
            </div>
          ))}
          <div className="input-button-container">
            {" "}
            {/* Container for the input and button */}
            <input
              className="create__control"
              type="text"
              name="answer"
              onChange={onChange}
              placeholder="type answer"
            />
            <button
              className="button-57"
              data-dismiss="modal"
              data-toggle="modal"
              data-target=".bd-example-modal-sm"
              onClick={handleSubmit}
            >
              <span className="text">Answer</span>
              <span>euuu</span>
            </button>
          </div>
        </div>
      </div>

      {/* modal */}
      {showModal && (
        <div
          className="modal fade bd-example-modal-sm"
          tabindex="-1"
          role="dialog"
          aria-labelledby="mySmallModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-sm">
            <div className="alert">
              <div className="modal-content">
                <div className="modal_heading">
                  <i
                    class="fa-regular fa-circle-check fa-2xl"
                    style={{ color: "green" }}
                  ></i>
                </div>
                <div className="modal_content" style={{ paddingTop: "20px" }}>
                  <p>successfully Done!</p>
                </div>
                <button
                  type="button"
                  className="modal_close"
                  data-toggle="modal"
                  data-target=".bd-example-modal-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;

{
  /* <div className="reactions">
          <span>

            <FaComment className="re" /> 45
         
          </span>
          <span>
            <FaRegChartBar className="re" /> 4
          </span>
          <span>
            <FaHeart className="re" /> 345
          </span>
          <span>
            <FaLeaf className="re" /> 234
          </span>
        </div> */
}
