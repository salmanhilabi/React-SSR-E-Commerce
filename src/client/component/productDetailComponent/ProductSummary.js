import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { AddProductToCart } from "../../actions/index";

class ProductSummary extends React.Component {
  state = {
    title: "",
    beforePrice: "",
    price: "",
    inStock: "",
    colors: [],
    size: [],
    offer: "",
    description: "",
    category: "",
    sku: "N/A",
  };
  componentDidMount() {
    const {
      stockQty,
      regularPrice,
      mainPrice,
      colors,
      size,
      title,
      offer,
      description,
      category,
    } = this.props.state;

    this.setState({
      inStock: stockQty,
      offer: offer,
      beforePrice: regularPrice,
      price: mainPrice,
      colors: colors,
      size: size,
      title: title,
      category: category,
      description: description,
    });
  }

  addToCart = () => {
    let carts = this.props.products.carts;
    let item = this.props.state;

    if (carts.length !== 0) {
      let elem = carts.filter((cart) => cart._id === item._id);
      if (elem.length !== 0) {
        alert("This Product is already on on the cart");
        return;
      }
      this.props.AddProductToCart(item);
      return;
    }
    this.props.AddProductToCart(item);
  };

  render() {
    return (
      <div className="product-summary-container">
        <h3 className="title">{this.state.title}</h3>
        <div className="offer-wrapper">
          {this.state.offer !== null ? (
            <h5>{this.state.offer + " OFF"}</h5>
          ) : null}
        </div>
        <div className="price-wrapper">
          <h5 className="sale-price">{"$" + this.state.price}</h5>
          <h5 className="regular-price">{"$" + this.state.beforePrice}</h5>
        </div>
        <p className="sku">
          <strong>SKU: </strong>
          {this.state.sku}
        </p>
        <p className="category">
          <strong>Category: </strong>
          {this.state.category}
        </p>
        <div className="size-color-wrapper">
          <div className="size-color-keys">
            <h6 className="size">Size: </h6>
            <h6>Colors: </h6>
          </div>
          <div className="size-color-values">
            <div className="size-values">
              {this.state.size.map((size, index) => {
                return <span key={index}>{size}</span>;
              })}
            </div>
            <div className="color-values">
              {this.state.colors.map((color, index) => {
                return (
                  <span
                    key={index}
                    style={{
                      background: color,
                    }}
                  ></span>
                );
              })}
            </div>
          </div>
        </div>
        <div className="in-stock-wrapper">
          <p>
            {this.state.inStock ? (
              <span style={{ color: "green" }}>In-Stock</span>
            ) : (
              <span style={{ color: "red" }}>Out of Stock</span>
            )}
          </p>
        </div>
        <p className="product-description">{this.state.description}</p>
        <div className="btns-wrapper">
          <button onClick={this.addToCart} className="add-to-cart">
            Add To Cart
          </button>
          <Link to="/" className="back-to-home">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateFromProps = (state) => {
  return {
    products: state.products,
  };
};

export default connect(mapStateFromProps, { AddProductToCart })(ProductSummary);
