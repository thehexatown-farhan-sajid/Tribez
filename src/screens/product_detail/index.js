import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setOwnerAddress } from "../../redux/counterSlice";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  hexanftAddress,
  hexaMarketplaceAddress,
  // hexanAuctionAddress,
} from "../../utils/options";
import connect from "../../utils/auth";
import HexaNFTs from "../../Abis/contracts/HexaNFTs.sol/HexaNFTs.json";
import HexaMarketplace from "../../Abis/contracts/HexaMarketplace.sol/HexaMarketplace.json";
// import HexamAuction from "../../Abis/contracts/HexaAuction.sol/HexamAuction.json";

// import BrowseCard from "../../components/browse-nft-card";
import Page from "../../components/page";

import "./style.scss";
// import { useNavigate } from "react-router-dom";
import { Chart } from "./chart";
import Offers from "../../components/offers";
import Auctions from "../../components/auctions";
import DetailPageCards from "./suggested-nfts-detail";
import Footer from "../../components/footer";

const data = ["All", "Music", "Sound", "Elect.", "Jazz", "Rock"];
// const detail = [
//   {
//     img: "/images/ethereum.svg",
//     price: "4,554",
//     usd: "$ 2,456,120",
//     expiration: ["2", "d", "14", "h", "5", "m", "11", "s"],
//     from: "zeeshui.ux",
//   },
// ];

// const images = [
//   "/browse-nft/browse-nft-1.png",
//   "/browse-nft/browse-nft-2.png",
//   "/browse-nft/browse-nft-3.png",
//   "/browse-nft/browse-nft-4.png",
// ];

const ProductDetail = () => {
  // const navigate = useNavigate();
  const { cardid } = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  const [cardinfo, setCardInfo] = useState([]);
  const [isSelected, setIsSelected] = useState(0);
  const navigate = useNavigate();

  // const [isOpen, setIsOpen] = useState(false);
  // const [newestIsOpen, setNewestIsOpen] = useState(false);
  // const [isClicked, setIsClicked] = useState(false);
  useEffect(() => {
    async function loadImage() {
      const { web3 } = await connect();
      const nftContract = new web3.eth.Contract(HexaNFTs.abi, hexanftAddress);
      const marketplaceContract = new web3.eth.Contract(
        HexaMarketplace.abi,
        hexaMarketplaceAddress
      );
      // const auctionContract = new web3.eth.Contract(
      //   HexamAuction.abi,
      //   hexanAuctionAddress
      // );
      const tokenUri = await nftContract.methods.tokenURI(cardid).call();
      const owner = await nftContract.methods.ownerOf(cardid).call();

      let listings = await marketplaceContract.methods
        .listings(hexanftAddress, cardid, owner)
        .call();
      let price = ethers.utils.formatUnits(
        listings.pricePerItem.toString(),
        "ether"
      );
      const meta = await axios.get(tokenUri);
      let item = {
        price: price,
        owner: owner,
        tokenId: cardid,
        image: meta.data.image,
        name: meta.data.name,
        symbol: meta.data.symbol,
        description: meta.data.description,
        royalty: meta.data.royalty,
      };

      setCardInfo(item);
    }
    loadImage();
  }, [cardid]);

  // const toggleHandler = () => {
  //   setIsOpen(!isOpen);
  // };
  // const newestToggler = () => {
  //   setNewestIsOpen(!newestIsOpen);
  // };

  async function Buynft() {
    const { account, web3 } = await connect();
    const nftContract = new web3.eth.Contract(HexaNFTs.abi, hexanftAddress);
    const marketplaceContract = new web3.eth.Contract(
      HexaMarketplace.abi,
      hexaMarketplaceAddress
    );
    // here we get ownerOf nft
    let owner;
    if (cardid !== 0) {
      owner = await nftContract.methods.ownerOf(cardid).call();
    }
    // get listing price
    const listings = await marketplaceContract.methods
      .listings(hexanftAddress, cardid, owner)
      .call();

    const price = listings.pricePerItem;
    await marketplaceContract.methods
      .buyItem(hexanftAddress, cardid, owner)
      .send({ from: account, value: price });
  }

  // console.log("cardinfo",cardinfo.image)
  return (
    <Page>
      <div className="nft-market-wrapper">
        <Container>
          <div className="nft-heading-top">
            <p className="nft-heading">NFT Marketplace</p>
            <img src="/images/right-arrow-nft.svg" alt="img" />
            <p className="listings">Listings</p>
          </div>
          <p className="nft-sub-heading-detail">
            Discover, collect, and sell extraordinary NFTs
          </p>
          <div className="nft-detail-all-market">
            <div className="detail-market-wrapper">
              {data.map((d, index) => (
                <div
                  className={
                    isSelected === index
                      ? "market-list"
                      : "market-list-unSelected"
                  }
                  onClick={() => setIsSelected(index)}
                >
                  {d}
                </div>
              ))}
            </div>
            <div className="nft-filter"></div>
          </div>
          <div className="product-detail-wrapper">
            <Row>
              <Col lg="6">
                <div className="video">
                  <div className="detail-play-button">
                    <img src={cardinfo.image} alt="img" />
                  </div>
                </div>
              </Col>
              <Col lg="6">
                <div className="detail-wrapper">
                  <div className="detail-top">
                    <div className="detail-top-heading">
                      <p>{cardinfo.name}</p>
                      <img src="/images/save.svg" alt="save" />
                    </div>
                    <div className="detail-second-heading">
                      <span className="detail-heading-by">TokenId:</span>
                      <span className="detail-heading-alanwalk">
                        {String(cardinfo.tokenId).padStart(5, "0")}
                      </span>
                      <img src="/images/tick.svg" alt="tick" />
                    </div>
                  </div>
                  <div className="detail-mid-block">
                    <div className="detail-third-heading">
                      <p>Price</p>
                      <p>Owned By</p>
                    </div>
                    <div className="detail-mid-top">
                      <div className="detail-mid-left">
                        <img src="/images/ethereum.svg" alt="ethereum" />
                        <span className="detail-eth-price">
                          {cardinfo.price}
                        </span>
                      </div>
                      <div className="detail-mid-right">
                        <button
                          onClick={() => {
                            navigate("/user-profile", {
                              state: cardinfo.owner,
                            });
                            dispatch(setOwnerAddress(cardinfo.owner));
                          }}
                        >
                          {cardinfo.owner
                            ? cardinfo.owner.slice(0, 8) +
                              "..." +
                              cardinfo.owner.slice(-4)
                            : ""}
                        </button>
                      </div>
                    </div>
                    <div className="placebid-button-wrap">
                      <button
                        className="placebid-button"
                        onClick={() => Buynft()}
                      >
                        BuyNow
                      </button>
                    </div>
                  </div>
                  <div className="offers">
                    <Offers />
                  </div>
                </div>
                <div className="detail-wrapper-mobile">
                  <div className="detail-top">
                    <div className="detail-top-heading">
                      <p>theWeeknd x Ariana G.</p>
                      <img src="/images/save.svg" alt="save" />
                    </div>
                    <div className="detail-second-heading">
                      <span className="detail-heading-by">by</span>
                      <span className="detail-heading-alanwalk">
                        alanwalkermusic
                      </span>
                      <img src="/images/tick.svg" alt="tick" />
                    </div>
                  </div>
                  <Auctions
                    heading={"Current Bid"}
                    img={"/images/ethereum.svg"}
                    price={"1,545,123"}
                  />
                  <Auctions
                    heading={"Auction Ends in"}
                    img={"/images/ethereum.svg"}
                    D={"2"}
                    d={"d"}
                    H={"14"}
                    h={"h"}
                    M={"5"}
                    m={"m"}
                    S={"11"}
                    s={"s"}
                  />
                  <div className="placebid-button-wrap">
                    <button className="placebid-button">BuyNow</button>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg="6">
                <div className="description">
                  <div className="description-heading">
                    <img src="/images/desc-img.svg" alt="desc" />
                    <p>DESCRIPTION</p>
                  </div>
                  <p>{cardinfo.description}</p>
                </div>
              </Col>

              <Col lg="6">
                <div className="description">
                  <div className="description-heading">
                    <img src="/images/history.svg" alt="history" />
                    <p>HISTORY</p>
                  </div>
                  <div className="history-graph">
                    <div className="graph-content">
                      <Chart />
                    </div>
                  </div>
                </div>
              </Col>
              <Col lg="6">
                <div className="offers-parnt">
                  <div className="offers-parent">
                    <Offers />
                  </div>
                </div>
              </Col>
            </Row>
          </div>

          <div className="sugested-nfts">
            <p className="sugested-nfts-first">
              Suggested<span className="sugested-nfts-second">NFT'S</span>
            </p>
            <p className="extraordinary-nfts">
              Discover, collect, and sell extraordinary NFTs
            </p>
          </div>
          <div className="nft-market-cards">
            {/* {[...Array(4)].map((i, index) => (
              <div className="detail-card-prod col-lg-3 col-md-4 col-sm-12">
                <BrowseCard images={images[index]} />
              </div>
            ))} */}
            <DetailPageCards />
          </div>
        </Container>
        <div>
          <Footer />
        </div>
      </div>
    </Page>
  );
};

export default ProductDetail;
