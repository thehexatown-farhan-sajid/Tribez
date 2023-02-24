import React, { useState, useEffect } from "react";
import "./style.scss";
import photo from "../../assets/browse-nft-1.png";
import axios from "axios";
import { ethers } from "ethers";
import {
  hexanftAddress,
  hexaMarketplaceAddress,
  hexanAuctionAddress,
} from "../../utils/options";
import connect from "../../utils/auth";
import HexaNFTs from "../../Abis/contracts/HexaNFTs.sol/HexaNFTs.json";
import HexaMarketplace from "../../Abis/contracts/HexaMarketplace.sol/HexaMarketplace.json";
import HexamAuction from "../../Abis/contracts/HexaAuction.sol/HexamAuction.json";
import { useSelector } from "react-redux";

export const ItemList = () => {
  const { cardid } = useSelector((state) => state.counter);
  const [price, setPrice] = useState(0);
  const [show, setShow] = useState(false);
  const [listingprice, setListingPrice] = useState(0);
  const [time, setTime] = useState(null);
  const [endtime, setEndTime] = useState(null);
  const [cardinfo, setCardInfo] = useState([]);

  let Price = ethers.utils.formatUnits((price ? price : 0).toString(), "ether");
  let finalProfit;
  let potentialPrice;
  if (price > 1000) {
    potentialPrice = (price / 100) * cardinfo.royalty;
  }
  finalProfit = price - potentialPrice;
  // const finalProfitt = ethers.utils.formatUnits((finalProfit ? finalProfit : 0).toString(), "ether");
  useEffect(() => {
    async function loadImage() {
      const { web3 } = await connect();
      const nftContract = new web3.eth.Contract(HexaNFTs.abi, hexanftAddress);
      const marketplaceContract = new web3.eth.Contract(
        HexaMarketplace.abi,
        hexaMarketplaceAddress
      );
      let Fee = await marketplaceContract.methods.platformFee().call();
      Fee = Fee.toString();
      setListingPrice(Fee);
      const owner = await nftContract.methods.ownerOf(cardid).call();
      const listings = await marketplaceContract.methods
        .listings(hexanftAddress, cardid, owner)
        .call();
      const price = ethers.utils.formatUnits(
        listings.pricePerItem.toString(),
        "ether"
      );

      const tokenUri = await nftContract.methods.tokenURI(cardid).call();
      const meta = await axios.get(tokenUri);
      const item = {
        price,
        tokenId: cardid,
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description,
        royalty: meta.data.royalty,
      };

      setCardInfo(item);
    }
    if (cardid && cardid !== 0) {
      loadImage();
    }
  }, [cardid]);
  async function createAuction() {
    const { account, web3 } = await connect();
    const nftContract = new web3.eth.Contract(HexaNFTs.abi, hexanftAddress);
    const auctionContract = new web3.eth.Contract(
      HexamAuction.abi,
      hexanAuctionAddress
    );
    // console.log("auctionContract", auctionContract)
    const approved = await nftContract.methods
      .isApprovedForAll(account, hexanAuctionAddress)
      .call();
    if (approved === false) {
      await nftContract.methods
        .setApprovalForAll(hexanAuctionAddress, true)
        .send({ from: account });
    }
    let Fee = await auctionContract.methods.platformFee().call();
    Fee = Fee.toString();
    const cardPrice = ethers.utils.parseUnits(price.toString(), "wei");
    const starttimestamp = new Date(time).getTime() / 1000.0;
    const endtimestamp = new Date(endtime).getTime() / 1000.0;
    await auctionContract.methods
      .createAuction(
        hexanftAddress,
        cardid,
        cardPrice,
        starttimestamp,
        false,
        endtimestamp
      )
      .send({ from: account, value: Fee });
  }

  async function updateListing() {
    const { account, web3 } = await connect();
    const marketplaceContract = new web3.eth.Contract(
      HexaMarketplace.abi,
      hexaMarketplaceAddress
    );
    let cardPrice = ethers.utils.parseUnits(price.toString(), "wei");
    await marketplaceContract.methods
      .updateListing(hexanftAddress, cardid, cardPrice)
      .send({ from: account });
  }

  async function listing() {
    const { account, web3 } = await connect();
    const nftContract = new web3.eth.Contract(HexaNFTs.abi, hexanftAddress);
    const marketplaceContract = new web3.eth.Contract(
      HexaMarketplace.abi,
      hexaMarketplaceAddress
    );
    const approved = await nftContract.methods
      .isApprovedForAll(account, hexaMarketplaceAddress)
      .call();
    if (approved === false) {
      await nftContract.methods
        .setApprovalForAll(hexaMarketplaceAddress, true)
        .send({ from: account });
    }
    // await nftContract.methods.setApprovalForAll(hexaMarketplaceAddress, true).send({ from: account})
    // await nftContract.methods.approve(hexaMarketplaceAddress, cardid).send({ from: account})

    let Fee = await marketplaceContract.methods.platformFee().call();
    Fee = Fee.toString();
    const cardPrice = ethers.utils.parseUnits(price.toString(), "wei");
    const tokenUri = await nftContract.methods.tokenURI(cardid).call();
    const meta = await axios.get(tokenUri);
    const royalty = meta.data.royalty;
    const starttimestamp = new Date(time).getTime() / 1000.0;
    await marketplaceContract.methods
      .listItem(hexanftAddress, cardid, 1, cardPrice, starttimestamp)
      .send({ from: account, value: Fee });
    await marketplaceContract.methods
      .registerRoyalty(hexanftAddress, cardid, royalty)
      .send({ from: account });
  }

  return (
    <div className="flex flex-col w-full h-full mt-8 maindiv">
      <div className="flex flex-row items-center justify-center maindiv2">
        <p className="font-bold text-[25px] Sale">Listing for Sale </p>
      </div>
      <div className="flex flex-row mt-4 justify-center gap-48 container chose">
        <div className="flex flex-col w-[450px] chose2">
          {cardinfo.price > 0 ? null : (
            <div>
              <p className="flex-row ml-32 text-[20px] font-bold chose3">
                Chose a type of sale
              </p>
            </div>
          )}
          {cardinfo.price > 0 ? null : (
            <div className="flex w-full h-[60px] mt-4 ml-8 border-2 rounded-md items-center justify-between fixed">
              <p className="flex items-center font-bold text-[18px] ml-8 pfixed">
                Fixed
              </p>
              <input
                value={"Fixed Price"}
                type={"radio"}
                name={"Price"}
                className="mt-2 w-full h-[20px] border-2 rounded-md items-center pl-4 pr-4 inputfix"
                onClick={() => setShow(false)}
              />
              <p className="flex items-center font-bold text-[18px] inputauc">
                Auction
              </p>
              <input
                value={"Time Auction"}
                type={"radio"}
                name={"Price"}
                className="mt-2 w-full h-[20px] border-2 rounded-md items-center pl-4 pr-4 tauctio"
                onClick={() => setShow(true)}
              />
            </div>
          )}

          {show ? (
            <div>
              <p className="flex-row ml-16 mt-4 text-[17px] font-bold reserve">
                Set Reserve Price in Wei
              </p>
              <input
                placeholder="Item Price"
                type={"number"}
                className="mt-2 ml-8 w-full h-[60px] border-2 rounded-md items-center pl-4 pr-4 inputprice"
                onChange={(e) => setPrice(e.target.value)}
              />
              <p className="flex-row ml-16 mt-4 text-[17px] font-bold timestemp">
                Set a Start Time Stemp
              </p>
              <input
                placeholder="Time Stemp"
                type={"datetime-local"}
                className="mt-2 ml-8 w-full h-[60px] border-2 rounded-md items-center pl-4 pr-4 inputtimestemp"
                onChange={(e) => setTime(e.target.value)}
              />
              <p className="flex-row ml-16 mt-4 text-[17px] font-bold timestempend">
                Set a End Time Stemp
              </p>
              <input
                placeholder="Time Stemp"
                type={"datetime-local"}
                className="mt-2 ml-8 w-full h-[60px] border-2 rounded-md items-center pl-4 pr-4 inputtimestempend"
                onChange={(e) => setEndTime(e.target.value)}
              />
              <div
                className="flex flex-row h-full w-full justify-center mt-4 ml-8 btclass"
                onClick={createAuction}
              >
                <button className="flex items-center h-[60px] w-full bg-blue-500 font-bold text-white border-2 rounded-md justify-center hover:bg-white hover:text-black create">
                  Create Auction
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p className="flex-row ml-16 mt-4 text-[17px] font-bold reserve">
                Set a Price in Wei
              </p>
              <input
                placeholder="Item Price"
                type={"number"}
                className="mt-2 ml-8 w-full h-[60px] border-2 rounded-md items-center pl-4 pr-4 inputprice"
                onChange={(e) => setPrice(e.target.value)}
              />
              {cardinfo.price > 0 ? null : (
                <div>
                  <p className="flex-row ml-16 mt-4 text-[17px] font-bold timestempend">
                    Set a Start Time Stemp
                  </p>
                  <input
                    placeholder="Time Stemp"
                    type={"datetime-local"}
                    className="mt-2 ml-8 w-full h-[60px] border-2 rounded-md items-center pl-4 pr-4 inputtimestempend"
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
              )}
              <p className="flex-row ml-16 mt-4 text-[17px] font-bold moreoption">
                More Options
              </p>
              <p className="flex-row ml-16 mt-4 text-[17px] font-bold moreoption">
                Summery
              </p>
              <div className="flex flex-col ml-8 mt-4 listing">
                <div className="flex flex-row justify-between listings">
                  <p className="text-[20px] text-black listingprice">
                    Listing Price
                  </p>
                  <p className="text-[20px] text-black listingprice">
                    {listingprice} WEI
                  </p>
                </div>
                <div className="flex flex-row mt-2 justify-between listings">
                  <p className="text-[20px] text-black listingprice">
                    Service Fee
                  </p>
                  <p className="text-[20px] text-black listingprice">0.0%</p>
                </div>
                <div className="flex flex-row mt-2 justify-between listings">
                  <p className="text-[20px] text-black listingprice">
                    Creator Fee
                  </p>
                  <p className="text-[20px] text-black listingprice">
                    {cardinfo.royalty}%
                  </p>
                </div>
                <div className="flex flex-row mt-4 border-t-2 pt-4 justify-between earning">
                  <p className="text-[25px] text-black pearning">
                    Potential Earning
                  </p>
                  <p className="text-[15px]  text-black ppearnig">
                    {finalProfit ? finalProfit : 0} WEI
                  </p>
                </div>
                {cardinfo.price > 0 ? (
                  <div className="flex flex-row h-full w-full justify-center mt-4 btclass">
                    <button
                      className="flex items-center h-[60px] w-full bg-blue-500 font-bold text-white border-2 rounded-md justify-center hover:bg-white hover:text-black create"
                      onClick={updateListing}
                    >
                      Update Price
                    </button>
                  </div>
                ) : (
                  <div
                    className="flex flex-row h-full w-full justify-center mt-4 btclass"
                    onClick={listing}
                  >
                    <button className="flex items-center h-[60px] w-full bg-blue-500 font-bold text-white border-2 rounded-md justify-center hover:bg-white hover:text-black create">
                      Complete Listing
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col imgdiv">
          <img className="w-[350px] image" src={cardinfo.image} alt="nft" />
          <div className="flex flex-col bg-white border-2  tid">
            <span className="text-gray-500 text-20px pt-4 ml-8 font-bold spantag">
              {cardinfo.name}: #{String(cardinfo.tokenId).padStart(5, "0")}
            </span>
            <span className="text-gray-800 text-20px pt-2 font-bold ml-8 ethprice">
              {Price} ETH
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
