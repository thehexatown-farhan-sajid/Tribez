import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAddress } from "../../redux/counterSlice";
import { useSelector } from "react-redux";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { initOnboard } from "../../utils/onboard";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { addresswallet } = useSelector((state) => state.counter);
  const [isMobile, setIsMobile] = useState(false);
  const [onboard, setOnboard] = useState({});
  // const [walletAddress, setWalletAddress] = useState('')
  useEffect(() => {
    const onboardData = initOnboard({
      address: (address) => dispatch(setAddress(address ? address : "")),
      wallet: (wallet) => {
        if (wallet.provider) {
          window.localStorage.setItem("selectedWallet", wallet.name);
        } else {
          window.localStorage.removeItem("selectedWallet");
        }
      },
    });

    setOnboard(onboardData);
  }, []);

  useEffect(() => {
    if (window.innerWidth > 1000) {
      // console.log("less");
    } else {
      // console.log("greator");
    }
  }, []);
  const connectWalletHandler = async () => {
    const walletSelected = await onboard.walletSelect();
    if (walletSelected) {
      await onboard.walletCheck();
      //   window.location.reload(true)
    }
  };

  // const previouslySelectedWallet =
  //   typeof window !== "undefined" && window.localStorage.getItem('selectedWallet')

  // useEffect(async() => {
  //   if (previouslySelectedWallet !== null && onboard) {
  //       console.log("onboard",await onboard)
  //     //  await onboard.getState
  //    }
  // }, [onboard, previouslySelectedWallet])

  return (
    <nav className="navbarWrapper">
      <div className="logo-wrapper">
        <img
          src="/images/nft-logo.svg"
          alt="img"
          onClick={() => navigate("/")}
        />
        <span className="tribez-line"></span>
      </div>
      <div className={isMobile ? "navWrapperMobile" : "navWrapper"}>
        <div className="leftNav navbar-nav me-auto mb-2 mb-lg-0">
          <div className="searchBar">
            <input
              className="searchInput"
              type="text"
              placeholder="Search any music artwork"
            />
            <img src="/images/search.svg" alt="search" />
          </div>
        </div>
        <ul className="rightNav me-auto">
          <li className="navLinkBuy" onClick={() => navigate("/create-nft")}>
            Create Asset
          </li>
          <li className="navLinkBuy" onClick={() => navigate("/collections")}>
            Explore
          </li>
          <div className="wallet-wrapper">
            <div className="dropdown-wallet">
              <div className="wallet" onClick={connectWalletHandler}>
                <img src="/images/wallet.svg" alt="wallet" />
                <span className="walletText">
                  {addresswallet ? "Connected" : "Connect"}
                </span>
              </div>
              <div className="wallet-content">
                <div className="contents">
                  <img
                    className="dropdown-icon"
                    src="/images/wallet-icon.svg"
                    alt="wallet-ico"
                  />
                  <span className="wallet-name">zeeshui.ux</span>
                  <span className="wallet-gained"> just gained</span>
                  <span className="wallet-value"> 167.2 ETH</span>
                </div>
                <div className="contents">
                  <img
                    className="dropdown-icon"
                    src="/images/wallet-icon.svg"
                    alt="ico"
                  />
                  <span className="wallet-name">zeeshui.ux</span>
                  <span className="wallet-gained"> just gained</span>
                  <span className="wallet-value"> 167.2 ETH</span>
                </div>
                <div className="contents">
                  <img
                    className="dropdown-icon"
                    src="/images/wallet-icon.svg"
                    alt="wallet"
                  />
                  <span className="wallet-name">zeeshui.ux</span>
                  <span className="wallet-gained"> just gained</span>
                  <span className="wallet-value"> 167.2 ETH</span>
                </div>
                <div className="contents">
                  <img
                    className="dropdown-icon"
                    src="/images/wallet-icon.svg"
                    alt="ico"
                  />
                  <span className="wallet-name">zeeshui.ux</span>
                  <span className="wallet-gained"> just gained</span>
                  <span className="wallet-value"> 167.2 ETH</span>
                </div>
                <div className="contents">
                  <img
                    className="dropdown-icon"
                    src="/images/wallet-icon.svg"
                    alt="icon"
                  />
                  <span className="wallet-name">zeeshui.ux</span>
                  <span className="wallet-gained"> just gained</span>
                  <span className="wallet-value"> 167.2 ETH</span>
                </div>
                <div className="contents">
                  <img
                    className="dropdown-icon"
                    src="/images/wallet-icon.svg"
                    alt="icon"
                  />
                  <span className="wallet-name">zeeshui.ux</span>
                  <span className="wallet-gained"> just gained</span>
                  <span className="wallet-value"> 167.2 ETH</span>
                </div>
              </div>
            </div>
          </div>
          <img className="bell" src="/images/bell.svg" alt="bell" />
          <div className="dropdown">
            <img className="profile" src="/images/profile.svg" alt="profile" />
            <div className="dropdown-content">
              <div className="content" onClick={() => navigate("/my-profile")}>
                <img
                  className="dropdown-icon"
                  src="/images/profile-icon.svg"
                  alt="profile"
                />
                <span className="dropdown-name">My Profile</span>
              </div>
              <div
                className="content"
                onClick={() => navigate("/create-profile")}
              >
                <img
                  className="dropdown-icon"
                  src="/images/profile-icon.svg"
                  alt="profile"
                />
                <span className="dropdown-name">Create Profile</span>
              </div>
              <div className="content" onClick={() => navigate("/collections")}>
                <img
                  className="dropdown-icon"
                  src="/images/collection-icon.svg"
                  alt="colection"
                />
                <span className="dropdown-name">Collections</span>
              </div>
              <div className="content" onClick={() => navigate("/favourites")}>
                <img
                  className="dropdown-icon"
                  src="/images/favourite-icon.svg"
                  alt="favorite"
                />
                <span className="dropdown-name">Favourites</span>
              </div>
              <div
                className="content"
                onClick={() => navigate("/user-settings")}
              >
                <img
                  className="dropdown-icon"
                  src="/images/setting-icon.svg"
                  alt="setting"
                />
                <span className="dropdown-name">Settings</span>
              </div>
            </div>
          </div>
        </ul>
      </div>
      <button className="mobile-menu" onClick={() => setIsMobile(!isMobile)}>
        {!isMobile ? (
          <img src="/images/menu.svg" alt="menu" />
        ) : (
          <img src="/images/cross.svg" alt="cross" />
        )}
      </button>
    </nav>
  );
};
