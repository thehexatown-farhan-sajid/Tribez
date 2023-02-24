import React from "react";
import {
  // Row,
  // Col,
  // Button,
  Form,
  FormGroup,
  Label,
  Input,
  // FormText,
} from "reactstrap";
import "./style.scss";

const ProfileForm = ({ label, type, placeholder, steric }) => {
  return (
    <div>
      <Form>
        <FormGroup>
          <Label className="label">
            {label}
            <span className="steric"> {steric}</span>
          </Label>
          <Input
            className="input-box shadow-none"
            type={type}
            placeholder={placeholder}
          />
        </FormGroup>
      </Form>
    </div>
  );
};

export default ProfileForm;
