import React from "react";
import "./style.scss";

const RevolutionCard = () => {
  return (
    <div className="revolutionCard">
      <div className="cardImage">
        <div className="play-button">
          <img src="/images/play-btn.svg" alt="img" />
        </div>
      </div>
      <div className="cardBottom">
        <div className="cardDetail">
          <div className="cardLeft">
            <p className="theWeekend">theWeeknd x Ariana G.</p>
            <div className="walkerWrapper">
              <span className="by">by</span>
              <span className="walkerMusic">alanwalkermusic</span>
              <img src="/images/tick.svg" alt="tick" />
            </div>
          </div>
          <div className="cardRight">
            <div className="etheriumWrapper">
              <img src="/images/ethereum.svg" alt="ethereum" />
              <p className="count">195.5</p>
            </div>
            <p className="price">$ 700,265</p>
          </div>
        </div>
        <div className="buyNow">BUY NOW</div>
      </div>
    </div>
  );
};

export default RevolutionCard;
