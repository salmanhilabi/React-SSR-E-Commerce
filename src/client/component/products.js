import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Products extends Component {
  state = {
    items: [],
  };

  static getDerivedStateFromProps(props, state) {
    if (props.products.filteredProducts !== state.items) {
      return { items: props.products.filteredProducts };
    }
    return null;
  }

  render() {
    return (
      <div className="product-wrapper">
        <ul className="row">
          {this.state.items
            ? this.state.items.map((item, index) => {
                return (
                  <li key={index} className="col-lg-3 col-md-6 col-sm-12">
                    <div className="inner">
                      <div className="img-wrapper">
                        <img alt={`product image`} src={item.frontImg} />
                      </div>
                      <div className="content-wrapper">
                        <div>
                          <h6>{item.title}</h6>
                          <span>${item.mainPrice}</span>
                        </div>
                      </div>
                      <Link
                        to={{ pathname: "/product-detail", state: item }}
                        title="Quick View"
                        data-toggle="modal"
                        data-target="#exampleModal"
                        className="btn"
                      >
                        View Detail
                      </Link>
                    </div>
                  </li>
                );
              })
            : null}
        </ul>
      </div>
    );
  }
}

const mapStateFromProps = (state) => {
  return {
    products: state.products,
  };
};

export default connect(mapStateFromProps)(Products);
