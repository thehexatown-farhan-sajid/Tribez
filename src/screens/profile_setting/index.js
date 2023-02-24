import React from "react";
import { Row, Col } from "reactstrap";
import "./style.scss";
import Page from "../../components/page";
import ProfileDetail from "./form";

const ProfileSetting = () => {
  return (
    <Page>
      <div className="profile-settings-wrapper">
        <Row className="g-0">
          <Col lg="3">
            <div className="settings">SETTINGS</div>
          </Col>
          <Col lg="9">
            <div className="profile-settings">
              <p className="profile-setting-text">Profile Settings</p>
              <Row>
                <Col lg="3">
                  <div className="profile-image-wrapper">
                    <img src="/images/profile-image.svg" alt="img" />
                    <div className="profile-image-text-wrapper">
                      <p>Profile Image</p>
                      <img src="/images/icon-i.svg" alt="icon" />
                    </div>
                  </div>
                </Col>
                <Col lg="9">
                  <div className="cover-image-wrapper w-100">
                    <div className="cover-img-wrap"> </div>
                    <div className="cover-image-text-wrapper">
                      <p>Cover Image</p>
                      <img src="/images/icon-i.svg" alt="icon" />
                    </div>
                  </div>
                </Col>
              </Row>
              <div className="profile-form">
                <ProfileDetail />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Page>
  );
};

export default ProfileSetting;
