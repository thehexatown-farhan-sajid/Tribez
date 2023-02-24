import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import Page from "../../components/page";
import "./style.scss";
import { hexanftAddress, hexaMarketplaceAddress } from "../../utils/options";
import connect from "../../utils/auth";
import HexaNFTs from "../../Abis/contracts/HexaNFTs.sol/HexaNFTs.json";
import HexaMarketplace from "../../Abis/contracts/HexaMarketplace.sol/HexaMarketplace.json";
import ProfileCardUser from "../../components/profileCard - user";
import { useLocation } from "react-router-dom";

const CoverPageUser = () => {
  const list = ["MyNFTs", "Favourites", "Liked"];
  const navigate = useNavigate();
  const [profiles, setProfile] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [newestIsOpen, setNewestIsOpen] = useState(false);
  const [isSelect, setIsSelect] = useState(0);
  // const [nfts, setNFts] = useState([]);
  const [ownernfts, setOwnerNFts] = useState([]);
  // const [id, setId] = useState(null);
  const location = useLocation();

  const data = location.state;
  console.log("datadata", data);

  useEffect(() => {
    loadUserProfile();
  }, []);

  useEffect(() => {
    loadUserNFTs();
  }, []);

  const toggleHandler = () => {
    setIsOpen(!isOpen);
  };
  const newestToggler = () => {
    setNewestIsOpen(!newestIsOpen);
  };
  // console.log("owneraddress",owneraddress)

  async function loadUserNFTs() {
    const { web3 } = await connect();
    const nftContract = new web3.eth.Contract(HexaNFTs.abi, hexanftAddress);
    const marketplaceContract = new web3.eth.Contract(
      HexaMarketplace.abi,
      hexaMarketplaceAddress
    );
    // Live price of the ethereum in usd
    // const value = await getETHPrice();
    // setUsdPrice(value);
    // get the all token of the address that are minted on it
    const walletofowner = await nftContract.methods.walletOfOwner(data).call();
    // map the token id and its metadata
    const items = await Promise.all(
      walletofowner.map(async (i) => {
        const tokenUri = await nftContract.methods.tokenURI(i).call();
        let owner = await nftContract.methods.ownerOf(i).call();
        let listings = await marketplaceContract.methods
          .listings(hexanftAddress, i, owner)
          .call();
        // we want get the token metadata - json
        const meta = await axios.get(tokenUri);
        // peice convert into ether from wei
        let price = ethers.utils.formatUnits(
          listings.pricePerItem.toString(),
          "ether"
        );
        let item = {
          price,
          tokenId: i,
          image: meta.data.image,
          name: meta.data.name,
          royalty: meta.data.royalty,
          description: meta.data.description,
        };
        return item;
      })
    );

    setOwnerNFts(items);
  }

  async function loadUserProfile() {
    const profiledata = await axios.get(
      "https://tribez-nodejs.herokuapp.com/api/profiledata"
    );

    const dataarray = profiledata.data.data;
    let currentUser = dataarray.find(
      (item) => item?.walletAddress === data?.toLowerCase()
    );
    if (!currentUser) {
      navigate("/create-profile");
    } else {
      setProfile(currentUser);
    }
  }
  return (
    <Page>
      <div className="cover-page-wrapper">
        <div className="">
          <img
            className="cover-page-bg-image"
            src={`https://tribez-nodejs.herokuapp.com/uploads/${profiles?.coverimage}`}
            alt="page-profile"
          />
        </div>

        <div className="cover-page-bottom">
          <div className="">
            <div className="cover-page-left">
              <div className="cover-profile-wrap">
                <img
                  className="cover-profile"
                  src={`https://tribez-nodejs.herokuapp.com/uploads/${profiles?.profileimage}`}
                  alt="page-profile"
                />
                <div className="cover-alanwalk-wrap">
                  <p>{profiles?.username}</p>
                  <img src="/images/tick.svg" alt="tick" />
                </div>
                <div className="cover-left-text">
                  <p>Welcome to the home of</p>
                  <p>{profiles?.name} Collection on Tribez.</p>
                  <p> Discover the best items in this collection.</p>
                </div>
                <div className="cover-left-text-mobile">
                  <p>
                    Welcome to the home of {profiles?.name} Collection on
                    Tribez. Discover the best items in this collection.
                  </p>
                </div>
              </div>
              <div className="left-block-wrap">
                <div className="block-inner-wrap">
                  <p className="block-upper-text">106</p>
                  <p className="block-bottom-text">Items</p>{" "}
                </div>
                <div className="block-inner-mid-wrap">
                  {" "}
                  <p className="block-upper-text">125 ETH</p>
                  <p className="block-bottom-text">Price</p>
                </div>
                <div className="block-inner-wrap">
                  <p className="block-upper-text">$300</p>
                  <p className="block-bottom-text">Volume </p>{" "}
                </div>
              </div>
              <p className="left-description">DESCRIPTION</p>
              <div className="left-description-block">
                <p className="left-description-text">
                  On a dark and stormy night, a spirit stalks the forecourts of
                  the Oval Stadium. An age-old legend whispers “the Bopara will
                  haunt you for the rest time.” Keeping you awake at night, the
                  Bopara feasts on your embarrassment. You will never leave your
                  home with your pants safely fastened again!{" "}
                </p>
              </div>
              <div className="left-social-icons-wrapper">
                <img
                  className="facebook-icon"
                  src="/images/facebook.svg"
                  alt="img"
                />
                <img
                  className="instagram-icon"
                  src="/images/instagram.svg"
                  alt="img"
                />
                <img
                  className="twitter-icon"
                  src="/images/twitter.svg"
                  alt="img"
                />
                <img
                  className="youtube-icon"
                  src="/images/youtube.svg"
                  alt="img"
                />
                <img
                  className="wechat-icon"
                  src="/images/wechat.svg"
                  alt="img"
                />
              </div>
            </div>
          </div>
          <div className="">
            <div className="cover-page-right">
              <div className="right-heading">
                {list.map((i, index) => (
                  <div key={index} onClick={() => setIsSelect(index)}>
                    <p>{i}</p>
                    <div
                      className={isSelect === index ? "selected-line" : null}
                    ></div>
                  </div>
                ))}
              </div>
              <div className="right-search-wrap">
                <div className="searchBar">
                  <img src="/images/search.svg" alt="search" />
                  <input className="searchInput" type="text" />
                </div>
                <div className="right-filter">
                  <Dropdown isOpen={isOpen} toggle={toggleHandler}>
                    <DropdownToggle caret className="filter-button shadow-none">
                      <img src="/images/filter.svg" alt="fillter" />
                      <span className="filter-btn-text">Filter</span>
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem header>Header</DropdownItem>
                      <DropdownItem>Another Action</DropdownItem>
                      <DropdownItem>Another Action</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                  <Dropdown isOpen={newestIsOpen} toggle={newestToggler}>
                    <DropdownToggle caret className="newest-button shadow-none">
                      <img src="/images/newest.svg" alt="newest" />
                      <span className="filter-btn-text">Newest</span>
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem header>Header</DropdownItem>
                      <DropdownItem>Another Action</DropdownItem>
                      <DropdownItem>Another Action</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
              <div className="cover-card-parent">
                {ownernfts.map((nft, i) => (
                  <div
                    key={i}
                    className="cover-page-card mb-2 col-lg-3 col-md-4 col-sm-12"
                  >
                    <ProfileCardUser
                      images={ownernfts[i]?.image}
                      names={ownernfts[i]?.name}
                      prices={ownernfts[i]?.price}
                      tokenIds={ownernfts[i]?.tokenId}
                      owners={data}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="des-wrapp">
          <div className="bottom-description-block">
            <div className="des-head">DESCRIPTION</div>
            <p className="bottom-description-text">
              On a dark and stormy night, a spirit stalks the forecourts of the
              Oval Stadium. An age-old legend whispers “the Bopara will haunt
              you for the rest time.” Keeping you awake at night, the Bopara
              feasts on your embarrassment. You will never leave your home with
              your pants safely fastened again!{" "}
            </p>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default CoverPageUser;
