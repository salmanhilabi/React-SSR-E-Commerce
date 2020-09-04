import React from "react";
import { AddProductsToList } from "../actions/index";
import Products from "../component/products";
import Filter from "../component/filter";
import Header from "../component/header";

const Home = () => {
  return (
    <div className="home-container">
      <Header />
      <Filter />
      <Products />
    </div>
  );
};

const loadData = (store, data) => {
  AddProductsToList(store, data);
};

export default { component: Home, loadData };
