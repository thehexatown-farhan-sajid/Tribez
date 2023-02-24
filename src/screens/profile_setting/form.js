import React from "react";
import { Row, Col, Label } from "reactstrap";
import ProfileForm from "../../components/profile_form";
const ProfileDetail = () => {
  return (
    <div>
      <Row className="d-flex justify-content-between">
        <Col lg="5">
          <ProfileForm label={"Username"} type={"text"} steric={"*"} />
          <ProfileForm label={"Name"} type={"text"} steric={"*"} />
          <ProfileForm label={"Email"} type={"email"} steric={"*"} />
          <ProfileForm label={"Password"} type={"text"} steric={"*"} />
        </Col>
        <Col lg="5">
          <Label className="label">
            Links
            <span className="steric" style={{ marginLeft: "5px" }}>
              *
            </span>
          </Label>
          <div className="links-wrapper">
            <li className="form-links">
              <img src="/images/twiter.svg" alt="twiter" />
              <span>www.twitter.com/tribez</span>
            </li>
            <li className="form-links-mid">
              <img src="/images/wchat.svg" alt="wchat" />
              <span>www.twitter.com/tribez</span>
            </li>
            <li className="form-links">
              <img src="/images/binance.svg" alt="binance" />
              <span>www.twitter.com/tribez</span>
            </li>
          </div>
          <ProfileForm
            label={"Wallet Address"}
            type={"text"}
            placeholder={"023022swsnjanjn12213412n1wwwl21213"}
          />
          <button className="profile-save-button">Save</button>
        </Col>
      </Row>
    </div>
  );
};

export default ProfileDetail;
