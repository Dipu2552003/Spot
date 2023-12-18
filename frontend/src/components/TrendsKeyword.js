import React from "react";
import "./css/TrendsKeyword.css"

const TrendsKeyword = () => {
  const [state, setState] = React.useState([
    {
      id: 1,
      country: "VIT Spot round Coming soon",
      keyword: "Admission open",
      totalKeywords: "What's new at Vishwakarma Institute of Technology cutoff 2023? MHT CET Counselling CAP Round 3 Seat Allotment Results are out.  ",
      img_src: "https://www.vit.edu/images/NIRF_aug23.jpg",
    },
    {
      id: 2,
      country: "",
      keyword: "Important: Check your admission chances here with MHT CET 2023 College Predictor ",
      totalKeywords: "Janiye next epsiode main",
    },
    {
      id: 3,
      country: "",
      keyword: "-2 floor main mila bhoot",
      totalKeywords: "rat ke 10 baje 2 bacho ne dekha bhoot bole teri maa ki ",
      img_src: "",
    },
  ]);
  return (
    <div className="keywords">
      <div className="key">
        <div className="keyword__heading">
          <h4>Trends for you</h4>
        </div>
        {state.map((keyword) => (
          <div key={keyword.id}>
            <div className="country">{keyword.country}</div>
            <div className="keyword__name">
              <strong>{keyword.keyword}</strong>
            </div>
            <div className="keyword__tweets">{keyword.totalKeywords}</div>
            <div className="keyword_img" ><img src={keyword.img_src} /></div>          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendsKeyword;
