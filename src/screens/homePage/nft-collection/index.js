import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import NFTCollectionCard from "../../../components/nft-collection-card";
import "./style.scss";

const NFTCollection = () => {
  // useEffect(() => {
  //   document
  //     .querySelectorAll(".react-multiple-carousel__arrow--left")
  //     .forEach((i) => {
  //       i.style.background = "blue !important";
  //     });
  // }, []);

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
  const data = [
    { img: "/images/carousel-2.svg", color: "#035F22" },
    { img: "/images/carousel-3.svg", color: "#48017A" },
    { img: "/images/carousel-4.svg", color: "#7C005F" },
    { img: "/images/nft-card.svg", color: "#090141" },
    { img: "/images/carousel-2.svg", color: "#035F22" },
    { img: "/images/carousel-3.svg", color: "#7C005F" },
  ];
  return (
    <div className="nftCollectionWrapper">
      <h3 className="collectionNFT">Top Collection NFT’s</h3>
      <p className="discoverNFT">
        Discover, collect, and sell extraordinary NFTs
      </p>
      <div className="carouselWrapper mt-5">
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
          {[...Array(6)].map((i, index) => (
            <div className="carouselItem">
              <NFTCollectionCard
                image={data[index].img}
                bg={data[index].color}
              />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default NFTCollection;
