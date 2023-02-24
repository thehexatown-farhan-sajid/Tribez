import React from "react";
import {
  HomePage,
  NFTMarketPlace,
  ProductDetail,
  ProfileSetting,
  CoverPage,
} from "../screens";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "../components/header";
import { MintingForm } from "../components/creates/index";
import { CreateProfile } from "../components/profile-create";
import { ItemList } from "../components/itemlist";
import CoverPageUser from "../screens/cover_page-user";

const TribezRouter = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/collections" element={<NFTMarketPlace />} />
        <Route path="/favourites" element={<CoverPage />} />
        <Route path="/product-detail" element={<ProductDetail />} />
        <Route path="/user-settings" element={<ProfileSetting />} />
        <Route path="/my-profile" element={<CoverPage />} />
        <Route path="/user-profile" element={<CoverPageUser />} />
        <Route path="/create-nft" element={<MintingForm />} />
        <Route path="/create-profile" element={<CreateProfile />} />
        <Route path="/item-list" element={<ItemList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default TribezRouter;
