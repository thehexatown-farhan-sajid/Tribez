import React from "react";
import { Container } from "react-bootstrap";

import NFTCollection from "./nft-collection";
import TopArtists from "./top_sellers";
import BrowseNFT from "./browse-nft";
import Footer from "../../components/footer";
import Page from "../../components/page";
import { NewRevolution } from "./new_revolution";

const HomePage = () => {
  return (
    <Page>
      <div style={{ position: "relative" }}>
        <Container>
          <NewRevolution />
          <NFTCollection />
          <TopArtists />
          <BrowseNFT />
        </Container>
      </div>
      <Footer />
    </Page>
  );
};

export default HomePage;
