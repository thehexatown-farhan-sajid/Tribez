import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCardId } from "../../redux/counterSlice";
import "./style.scss";
import { Card, CardImg, CardBody } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { hexanftAddress, hexaMarketplaceAddress } from "../../utils/options";
import connect from "../../utils/auth";
import HexaNFTs from "../../Abis/contracts/HexaNFTs.sol/HexaNFTs.json";
import HexaMarketplace from "../../Abis/contracts/HexaMarketplace.sol/HexaMarketplace.json";
import { useLocation } from "react-router-dom";

const ProfileCard = ({ images, names, prices, tokenIds }) => {
  const dispatch = useDispatch();
  const [isfill, setIsfill] = useState(false);
  const navigate = useNavigate();
  const [id, setId] = useState(null);
  const location = useLocation();
  //   const data = location.state;
  // console.log("datadata",data);

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
  // console.log("owners",owners)

  return (
    <div>
      <Card className="card-wrap">
        <div className="card-img-wrapp">
          <CardImg top className="card-img" src={images} alt="Card image cap" />
          <div className="card-play-button">
            {/* <img src="/images/play-btn.svg" alt="img" /> */}
          </div>
        </div>
        <CardBody className="card-body">
          <div className="browseCardBottom">
            <div className="carDetail">
              <div className="cardLeft">
                <p className="theWeeknd">{names}</p>
                <div className="walkerWraper">
                  <span className="bay">tokenId:</span>
                  <span className="walkeMusic">
                    {String(tokenIds).padStart(5, "0")}
                  </span>
                  <img src="/images/tick.svg" alt="tick" />
                </div>
              </div>
              <div className="cardRight">
                <div className="etherumWrapper">
                  <img src="/images/ethereum.svg" alt="ethereum" />
                  <p className="cont">{prices}</p>
                </div>
              </div>
            </div>
            <hr className="w-100" />
            {prices > 0 ? (
              <div className="buyNowC">
                <span onClick={() => setId(tokenIds)}>Cancel List</span>
                <span
                  onClick={() => {
                    navigate("/item-list");
                    dispatch(setCardId(tokenIds));
                  }}
                >
                  Update List
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
            ) : (
              <div className="buyNowC">
                <span
                  onClick={() => {
                    navigate("/item-list");
                    dispatch(setCardId(tokenIds));
                  }}
                >
                  List Now
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

export default ProfileCard;
