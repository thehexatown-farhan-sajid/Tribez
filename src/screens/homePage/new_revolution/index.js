import React from "react";
import { Button } from "react-bootstrap";
import { Row, Col } from "reactstrap";
import "./style.scss";
// import { useNavigate } from "react-router-dom";
import RevolutionCard from "../../../components/revolution-card";

export const NewRevolution = () => {
  // const navigate = useNavigate();

  return (
    <div className="revolutionWrapper">
      <Row>
        <Col lg="6">
          <div className="leftback"></div>
          <div className="revolutionLeft">
            <h3 className="newRevolution">
              A new revolution in music & world <br /> of NFTS...
            </h3>
            <div className="revolutionRightLeft">
              <div className="right-back"></div>
              <RevolutionCard />
            </div>
            <p className="nftDetail">
              Music NFTs are changing the way fans connect with their
              <br /> favorite artists. All kinds of creators are innovating on
              the blockchain, and <br /> the appetite for change in an industry
              that
              <br /> so often underserves independent makers is clear.
            </p>
            <p className="nftDetailMobile">
              Music NFTs are changing the way fans connect with their favorite
              artists. All kinds of creators are innovating on the blockchain,
              and the appetite for change in an industry that so often
              underserves independent makers is clear.
            </p>
            <Button className="revolutionButton shadow-none">
              WANT TO BECOME A CREATOR ?
            </Button>
          </div>
        </Col>
        <Col lg="6">
          <div className="revolutionRight">
            <div className="right-back"></div>
            <RevolutionCard />
          </div>
        </Col>
      </Row>
    </div>
  );
};
