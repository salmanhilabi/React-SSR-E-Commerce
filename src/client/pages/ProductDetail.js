import React, { Component } from "react";
import ImageGallery from "../component/productDetailComponent/ImageGallery";
import ProductSummary from "../component/productDetailComponent/ProductSummary";
import Header from "../component/header";

class ProductDetail extends Component {
  componentDidMount() {
    if (!this.props.location.state) {
      window.location.href = "/";
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <Header />
        <div className="product-detail-wrapper">
          <div className="row">
            <div className="left-element col-lg-5">
              <ImageGallery
                state={{
                  imgSrc: this.props.location.state.frontImg,
                  otherImg: this.props.location.state.otherImg,
                }}
              />
            </div>
            <div className="right-element col-lg-7">
              <ProductSummary state={this.props.location.state} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default { component: ProductDetail };
