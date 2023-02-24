import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import Web3 from "web3";
import BrowseCard from "../../components/browse-nft-card";
import Footer from "../../components/footer";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
} from "reactstrap";
import "./style.scss";
import Page from "../../components/page";
import { ethers } from "ethers";
// import Web3 from "web3"
import axios from "axios";
import { hexanftAddress, hexaMarketplaceAddress } from "../../utils/options";
import connect from "../../utils/auth";
import HexaNFTs from "../../Abis/contracts/HexaNFTs.sol/HexaNFTs.json";
import HexaMarketplace from "../../Abis/contracts/HexaMarketplace.sol/HexaMarketplace.json";

const data = ["All", "Music", "Sound", "Elect.", "Jazz", "Rock"];

const NFTMarketPlace = () => {
  const [nfts, setNFts] = useState([]);
  const [isSelected, setIsSelected] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [newestIsOpen, setNewestIsOpen] = useState(false);
  // const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    loadNFTs();
  }, []);
  async function loadNFTs() {
    // const {web3 } = await connect();
    const web3 = new Web3(
      new Web3.providers.HttpProvider(
        "https://goerli.infura.io/v3/a40778806c9e4d0f962550277a5babed"
      )
    );
    const nftContract = new web3.eth.Contract(HexaNFTs.abi, hexanftAddress);
    const marketplaceContract = new web3.eth.Contract(
      HexaMarketplace.abi,
      hexaMarketplaceAddress
    );
    const pointer = await nftContract.methods.tokenIdPointer().call();
    const ids = [];
    for (let i = 1; i <= pointer; i++) {
      ids.push(i);
    }
    const items = await Promise.all(
      ids.map(async (i) => {
        //grt token uri
        const tokenUri = await nftContract.methods.tokenURI(i).call();
        // owner of id
        const owner = await nftContract.methods.ownerOf(i).call();
        // market listing price
        const listings = await marketplaceContract.methods
          .listings(hexanftAddress, i, owner)
          .call();
        // we want get the token metadata - json
        const meta = await axios.get(tokenUri);
        // convert price into ether from wei
        const price = ethers.utils.formatUnits(
          listings.pricePerItem.toString(),
          "ether"
        );
        const item = {
          owner,
          price,
          tokenId: i,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
        };
        return item;
      })
    );
    setNFts(items);
  }

  // console.log("nfts", nfts)

  const toggleHandler = () => {
    setIsOpen(!isOpen);
  };
  const newestToggler = () => {
    setNewestIsOpen(!newestIsOpen);
  };

  return (
    <Page>
      <div className="nft-market-wrapper">
        <Container>
          <p className="nft-heading">NFT Marketplace</p>
          <p className="nft-sub-heading">
            Discover, collect, and sell extraordinary NFTs
          </p>
          <Row className="nft-all-market">
            <Col className="market-wrapper" lg="6" md="12">
              <div className="market-wrapper">
                {data.map((d, index) => (
                  <div
                    key={index}
                    className={
                      isSelected === index
                        ? "market-list"
                        : "market-list-unSelected"
                    }
                    onClick={() => setIsSelected(index)}
                  >
                    {d}
                  </div>
                ))}
              </div>
            </Col>
            <Col lg="6" md="12">
              <div className="nft-filter">
                <Dropdown isOpen={isOpen} toggle={toggleHandler}>
                  <DropdownToggle caret className="filter-button shadow-none">
                    <img src="/images/filter.svg" alt="filter" />
                    Filter
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>Header</DropdownItem>
                    <DropdownItem>Another Action</DropdownItem>
                    <DropdownItem>Another Action</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <Dropdown isOpen={newestIsOpen} toggle={newestToggler}>
                  <DropdownToggle caret className="newest-button shadow-none">
                    <img src="/images/newest.svg" alt="newest" />
                    Newest
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>Header</DropdownItem>
                    <DropdownItem>Another Action</DropdownItem>
                    <DropdownItem>Another Action</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </Col>
          </Row>

          <div className="nft-market-cards">
            {nfts.map((nft, i) => (
              <div key={i} className="card-nft col-lg-3 col-md-4 col-sm-12">
                <BrowseCard
                  images={nfts[i]?.image}
                  names={nfts[i]?.name}
                  prices={nfts[i]?.price}
                  owners={nfts[i]?.owner}
                  tokenIds={nfts[i]?.tokenId}
                />
              </div>
            ))}
          </div>
          <div className="nft-market-button-wrapper">
            <button className="nft-market-button">Show More</button>
          </div>
        </Container>
        <div className="mobile-menu-footer">
          <Footer />
        </div>
      </div>
    </Page>
  );
};

export default NFTMarketPlace;
