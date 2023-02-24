import React from "react";
import "./style.scss";

const Offers = () => {
  return (
    <div className="detail-bottom-block">
      <div className="offers-wrap">
        <p>OFFERS</p>
      </div>
      <table width="100%" className="table-detail">
        <tr className="table-heading">
          <td className="price">Price</td>
          <td className="usd">USD</td>
          <td className="expir">Expiration</td>
          <td className="from">From</td>
        </tr>
        {[...Array(7)].map((i) => (
          <tr className="table-rows">
            <td className="img-price">
              <img src="/images/ethereum.svg" alt="img" />
              <span className="eth-price">4,554</span>
            </td>
            <td className="price-usd">$ 2,456,120</td>
            <td className="expiration">
              <p>
                2<span>d</span>14<span>h</span>5<span>m</span>11
                <span>s</span>
              </p>
            </td>
            <td className="from-name">zeeshui.ux</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Offers;
