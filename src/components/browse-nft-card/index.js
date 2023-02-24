import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCardId } from "../../redux/counterSlice";
import "./style.scss";
import { Card, CardImg, CardBody } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { hexanftAddress, hexaMarketplaceAddress } from "../../utils/options";
import connect from "../../utils/auth";
import HexaNFTs from "../../Abis/contracts/HexaNFTs.sol/HexaNFTs.json";
import HexaMarketplace from "../../Abis/contracts/HexaMarketplace.sol/HexaMarketplace.json";

const BrowseCard = ({ images, names, prices, owners, tokenIds }) => {
  const dispatch = useDispatch();
  const { addresswallet } = useSelector((state) => state.counter);
  const [isfill, setIsfill] = useState(false);
  const navigate = useNavigate();
  const [id, setId] = useState(null);

  useEffect(() => {
    async function cancelListing() {
      const { account, web3 } = await connect();
      const marketplaceContract = new web3.eth.Contract(
        HexaMarketplace.abi,
        hexaMarketplaceAddress
      );
      await marketplaceContract.methods
        .cancelListing(hexanftAddress, id)
        .send({ from: account });
    }
    if (id && id !== 0) {
      cancelListing();
    }
  }, [id]);

  // console.log("addresswallet",addresswallet)
  return (
    <div>
      <Card className="card-wrap">
        <div className="card-img-wrapp">
          <CardImg
            top
            className="card-imag"
            src={images}
            alt="Card image cap"
          />
          <div className="card-play-button">
            {/* <img src="/images/play-btn.svg" alt="img" /> */}
          </div>
        </div>
        <CardBody className="card-body-cont">
          <div className="browseCardBottom">
            <div className="cardDetail">
              <div className="cardLeft">
                <p className="theWeekend">{names}</p>
                <div className="walkerWrapper">
                  <span className="by">tokenId:</span>
                  <span className="walkerMusic">
                    {String(tokenIds).padStart(5, "0")}
                  </span>
                  {/* <img src="/images/tick.svg" alt="tick"/> */}
                </div>
              </div>
              <div className="cardRight">
                <div className="etheriumWrapper">
                  <img src="/images/ethereum.svg" alt="ethereum" />
                  <p className="count">{prices}</p>
                </div>
                <p className="price">$ 700,265</p>
              </div>
            </div>
            {owners?.toLowerCase() === addresswallet ? (
              <div className="buyNow">
                <span onClick={() => setId(tokenIds)}>Cancel List</span>
                {/* <span
                  onClick={() => {
                    navigate("/item-list");
                    dispatch(setCardId(tokenIds));
                  }}
                >
                  Update List
                </span> */}
                <img
                  src={
                    !isfill ? "/images/heart.svg" : "/images/heart-filled.png"
                  }
                  width="15px"
                  height="13px"
                  alt="img"
                  onClick={() => setIsfill(!isfill)}
                />
              </div>
            ) : (
              <div className="buyNow">
                <span
                  onClick={() => {
                    dispatch(setCardId(tokenIds));
                    navigate("/product-detail");
                  }}
                >
                  BUY NOW
                </span>
                <img
                  src={
                    !isfill ? "/images/heart.svg" : "/images/heart-filled.png"
                  }
                  width="15px"
                  height="13px"
                  alt="img"
                  onClick={() => setIsfill(!isfill)}
                />
              </div>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default BrowseCard;
