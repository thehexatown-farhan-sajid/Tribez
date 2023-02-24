import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import BrowseCard from "../../components/browse-nft-card";
import {
  hexanftAddress,
  hexaMarketplaceAddress,
  // hexanAuctionAddress,
} from "../../utils/options";
import connect from "../../utils/auth";
import HexaNFTs from "../../Abis/contracts/HexaNFTs.sol/HexaNFTs.json";
import HexaMarketplace from "../../Abis/contracts/HexaMarketplace.sol/HexaMarketplace.json";

const DetailPageCards = () => {
  const [nfts, setNFts] = useState([]);


  useEffect(()=>{ 
    loadNFTs();
  },[])


  async function loadNFTs() {
    const {web3 } = await connect();
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
  // console.log("nfts", nfts.length)
  // const randomIndex = Math.floor(Math.random() * nfts.length);
  // console.log("randomIndex",randomIndex)
  const getRandomNFT = (array, count) => {
    const result = [];
    const source = array.slice(); // create a copy of the original array to avoid modifying it
  
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * source.length);
      result.push(source[randomIndex]);
      source.splice(randomIndex, 1);
    }
  
    return result;
  };
  const randomNFT = getRandomNFT(nfts, 7);  
  console.log("randomIndex",randomNFT)





  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
    },
    smallTablet: {
      breakpoint: { max: 768, min: 425 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 425, min: 0 },
      items: 2,
    },
  };

  // const images = [
  //   "/browse-nft/browse-nft-1.png",
  //   "/browse-nft/browse-nft-2.png",
  //   "/browse-nft/browse-nft-3.png",
  //   "/browse-nft/browse-nft-4.png",
  // ];
  return (
    <div className="w-100">
      <Carousel
        responsive={responsive}
        draggable={true}
        swipeable={true}
        showDots={true}
        dotListClass="dotClass"
        slidesToSlide={1}
        autoPlay={true}
        renderButtonGroupOutside={true}
        ssr={true}
        infinite={true}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        transitionDuration={500}
        sliderClass="innerSlider"
        itemClass="itemClass"
        containerClass="containerClass"
      >
        {randomNFT.map((nft, i) => (
          <div key={i} className="">
            <BrowseCard images={randomNFT[i]?.image}   names={randomNFT[i]?.name} prices={randomNFT[i]?.price} tokenIds={randomNFT[i]?.tokenId} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default DetailPageCards;
