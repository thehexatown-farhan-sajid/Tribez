import React from "react";
import { Card, CardImg, CardBody } from "reactstrap";

import "./style.scss";

const NFTCollectionCard = ({ image, bg }) => {
  return (
    <div>
      <Card className="nft-carousel-cards" style={{ backgroundColor: bg }}>
        <div className="cardImage">
          <CardImg top className="card-imag" src={image} alt="Card image cap" />
          <div className="play-button">
            <img src="/images/play-btn.svg" alt="img" />
          </div>
        </div>
        <CardBody className="collection-card-body">
          <div className="cardBotom">
            <div className="cardDetail">
              <div className="cardLeft">
                <p className="theWeekend">theWeeknd x Ariana G.</p>
                <div className="walkerWrapper">
                  <span className="by">by</span>
                  <span className="walkerMusic">alanwalkermusic</span>
                  <img src="/images/nft-tick.svg" alt="nft" />
                </div>
              </div>
              <div className="cardRight">
                <div className="etheriumWrapper">
                  <img src="/images/nft_ethereum.svg" alt="nft" />
                  <p className="count">195.5</p>
                </div>
                <p className="price">$ 700,265</p>
              </div>
            </div>
            <div className="buyNow">BUY NOW</div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default NFTCollectionCard;
