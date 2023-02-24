import React, { useState, useLayoutEffect } from "react";
import { Button } from "reactstrap";
import BrowseCard from "../../../components/browse-nft-card";

import "./style.scss";
const images = [
  "/browse-nft/browse-nft-1.png",
  "/browse-nft/browse-nft-2.png",
  "/browse-nft/browse-nft-3.png",
  "/browse-nft/browse-nft-4.png",
  "/browse-nft/browse-nft-5.png",
  "/browse-nft/browse-nft-6.png",
  "/browse-nft/browse-nft-7.png",
  "/browse-nft/browse-nft-8.png",
];
const BrowseNFT = () => {
  const [show, setShow] = useState(true);
  // const [size, setSize] = useState(0);
  useLayoutEffect(() => {
    function updateSize() {
      // setSize(window.innerWidth);
      if (window.innerWidth <= 425) {
        setShow(false);
      } else {
        setShow(true);
      }
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return (
    <div className="topCollectionWrapper">
      <div className="sellersHeading">
        <span className="topSellers">Browse all </span>
        <span className="sellersYear">NFT's</span>
        <img src="/images/sellers-dropdown.svg" alt="seller" />
        <div className="browse-nft-content">
          <p className="sellersYears">2020</p>
          <p className="sellersYears">2019</p>
          <p className="sellersYears">2028</p>
        </div>
      </div>
      <p className="sellExtraordinary">
        Discover, collect, and sell extraordinary NFTs
      </p>
      <div className="BrowseCardWrapper">
        {[...Array(8)].slice(0, !show ? 3 : 8).map((i, index) => (
          <div className="cardWrap col-lg-3 col-md-4 col-sm-12">
            <BrowseCard images={images[index]} />
          </div>
        ))}
      </div>
      <div
        className={!show ? "expandArrow" : "uparrow"}
        onClick={() => setShow(!show)}
      >
        <img src="/images/expand-arrow.svg" alt="img" />
      </div>
      <div className="browseButton">
        <Button className="nftButton">BROWSE ALL NFT’s</Button>
      </div>
    </div>
  );
};

export default BrowseNFT;
