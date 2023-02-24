import React, { useState, useLayoutEffect } from "react";
import SellersCard from "../../../components/selers_card";
import "./style.scss";

const TopArtists = () => {
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
        <span className="topSellers">Top Sellers of </span>
        <div className="sellersDropdown">
          <span className="sellersYear">2021</span>
          <img src="/images/sellers-dropdown.svg" alt="seller" />
          <div className="sellers-content">
            <p className="sellersYears">2020</p>
            <p className="sellersYears">2019</p>
            <p className="sellersYears">2028</p>
          </div>
        </div>
      </div>
      <p className="sellExtraordinary">
        Discover, collect, and sell extraordinary NFTs
      </p>
      <div className="sellersCardWrapper">
        {[...Array(12)].slice(0, !show ? 4 : 12).map((i, index) => (
          <div className="cardWrapper col-lg-4 col-md-6 col-sm-12">
            <SellersCard count={index + 1} />
          </div>
        ))}
      </div>
      <div
        className={!show ? "expandArrow" : "uparrow"}
        // className="expandArrow"
        onClick={() => setShow(!show)}
      >
        <img src="/images/expand-arrow.svg" alt="img" />
      </div>
    </div>
  );
};

export default TopArtists;
