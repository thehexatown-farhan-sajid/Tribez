import React, { useState } from "react";
import axios from "axios";
import "./style.scss";
export const CreateProfile = () => {
  const [username, setUserName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [links, setLinks] = useState("");
  const [walletaddress, setWalletAddress] = useState("");
  const [profileimage, setProfileImage] = useState(null);
  const [coverimage, setCoverImage] = useState(null);

  async function profileCreate() {
    let formData = new FormData();
    formData.append("username", username);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("links", links);
    formData.append("walletAddress", walletaddress);
    formData.append("profileimage", profileimage);
    formData.append("coverimage", coverimage);

    await axios
      .post("http://localhost:8000/api/createprofile", formData)
      .then((res) => {
        // console.log(res);
        // setUserName("")
        // setName("")
        // setEmail("")
        // setLinks("")
        // setWalletAddress("")
        // setProfileImage(null)
        // setCoverImage(null)
      })
      .catch((err) => {
        // console.log(err);
      });
  }
  return (
    <div>
      <div className="flex justify-center formcontainer">
        <div className="w-1/2 flex flex-col pb-12 formwrapper">
          <input
            placeholder="Username"
            className="mt-8 border rounded p-4 inputform"
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            placeholder="Name"
            className="mt-2 border rounded p-4"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            placeholder="Email"
            className="mt-2 border rounded p-4"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Links"
            className="mt-2 border rounded p-4"
            onChange={(e) => setLinks(e.target.value)}
          />
          <input
            placeholder="Wallet Address"
            className="mt-2 border rounded p-4"
            onChange={(e) => setWalletAddress(e.target.value.toLowerCase())}
          />
          <label className="profileimage">Profile Image</label>
          <input
            type="file"
            name="ProfileImage"
            className="mt-4"
            onChange={(e) => setProfileImage(e.target.files[0])}
          />{" "}
          {/* {fileUrl && (
                <img
                  className="rounded mt-4 image"
                  width="350px"
                  src={fileUrl}
                  alt="phto"
                />
              )} */}
          <label className="profileimage">Cover Image</label>
          <input
            type="file"
            name="CoverImage"
            className="mt-4"
            onChange={(e) => setCoverImage(e.target.files[0])}
          />{" "}
          {/* {fileUrl && (
                <img
                  className="rounded mt-4 image"
                  width="350px"
                  src={fileUrl}
                  alt="phto"
                />
              )} */}
          <button
            onClick={profileCreate}
            className="font-bold mt-4 bg-blue-500 text-white rounded p-4 shadow-lg button"
          >
            Create Profile
          </button>
        </div>
      </div>
    </div>
  );
};
