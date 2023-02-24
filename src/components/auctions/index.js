import React from "react";
import "./style.scss";

const Auctions = ({ heading, img, price, D, d, H, h, M, m, S, s }) => {
  return (
    <div className="auc-wrapper">
      <div className="auc-heading">{heading}</div>
      <div className="auc-detail">
        <img src={img} alt="img" />
        <p>
          {price}
          {D}
          <span>{d}</span>
          {H}
          <span>{h}</span>
          {M}
          <span>{m}</span>
          {S}
          <span>{s}</span>
        </p>
      </div>
    </div>
  );
};

export default Auctions;
