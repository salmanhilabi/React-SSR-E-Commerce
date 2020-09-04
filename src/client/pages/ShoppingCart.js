import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import InjectedCheckoutForm from "../component/paymentComponent/checkoutForm";
import { ToggleModal } from "../../client/actions/index";
import config from "../../../config.json";

import {
  IncrementQty,
  DecrementQty,
  RemoveFromCart,
  RemoveAllFromCart,
  AddCouponToState,
} from "../actions/index";

class ShoppingCart extends React.Component {
  state = {
    carts: [],
    subTotal: 0.0,
    tax: 0.0,
    total: 0.0,
    discount: 0,
    coupon: "",
  };

  componentDidMount() {
    this.setState({ carts: this.props.carts });
    this.getSubTotal();
  }

  static getDerivedStateFromProps(props, state) {
    if (props.carts.length !== state.carts.length) {
      return { carts: props.carts };
    }
  }

  getSubTotal = () => {
    setTimeout(() => {
      let arr = [];
      if (document.querySelectorAll(".sale-price").length == 0) {
        this.setState({ subTotal: 0.0, tax: 0.0, total: 0.0, discount: 0 });
        return;
      }
      document.querySelectorAll(".sale-price").forEach((elem) => {
        const price = elem.textContent.replace("$", "");
        arr.push(parseFloat(price));
      });
      let subTotal = arr.reduce((sum, num) => sum + num).toFixed(2);
      this.setState({ subTotal });
      this.calculatTax(subTotal);
    }, 80);
  };

  calculatTax = (subTotal) => {
    let tax = subTotal * 0.12;
    tax = tax.toFixed(2);
    this.setState({ tax });
    this.totalPrice(subTotal, tax);
  };

  totalPrice = (subTotal, tax) => {
    let discount = this.state.discount;
    let total = parseFloat(subTotal) + parseFloat(tax) - discount;
    total = total.toFixed(2);
    this.setState({ total });
  };

  decrementQty = (id) => {
    this.props.DecrementQty(id);
    this.getSubTotal();
  };

  incrementQty = (id) => {
    this.props.IncrementQty(id);
    this.getSubTotal();
  };

  removeCart = (id) => {
    this.props.RemoveFromCart(id);
    this.getSubTotal();
  };

  clearAllList = () => {
    this.props.RemoveAllFromCart();
    this.getSubTotal();
  };

  openModal = () => {
    this.props.ToggleModal();
  };

  handleCoupon = (e) => {
    this.setState({ coupon: e.target.value });
  };

  handleChange = (e) => {
    return;
  };

  handleSubmit = () => {
    if (document.querySelectorAll(".sale-price").length == 0) {
      return;
    } else {
      if (this.state.coupon === config.COUPON_CODE) {
        this.setState({ discount: 40 });
        this.props.AddCouponToState(this.state.coupon);
        this.getSubTotal();
      } else {
        alert("Your Coupon is not valid");
      }
    }
  };

  render() {
    return (
      <div className="checkout-page-wrapper">
        <h2>Shopping Cart</h2>
        <div className="checkout-wrapper">
          <div className="cart-table">
            <div className="cart-page-btns-wrapper">
              <Link to="/" className="btn btn-alt back-to-home">
                <span>Back To Home</span>
              </Link>
              <button
                onClick={this.clearAllList}
                className="btn btn-alt clear-shopping"
              >
                Clear All Carts
              </button>
            </div>
            <div className="table-header">
              <div className="photo">Product Image</div>
              <div className="name">Product Name</div>
              <div className="price">Unit Price</div>
              <div className="qty">Qty</div>
              <div className="subtotal">Subtotal</div>
              <div className="remove">Remove</div>
            </div>
            {this.state.carts.map((cart) => {
              return (
                <div className="table-row" id={cart._id} key={cart._id}>
                  <div className="photo">
                    <img alt="product-img" src={cart.frontImg} />
                  </div>
                  <div className="name">{cart.title}</div>
                  <div className="price">${cart.mainPrice}</div>
                  <div className="qty qty-changer">
                    <input
                      type="button"
                      value="‒"
                      className="decrement"
                      onClick={() => this.decrementQty(cart._id)}
                    />
                    <input
                      type="text"
                      className="qty-input"
                      readOnly
                      data-min="0"
                      data-max="5"
                      onChange={this.handleChange}
                      value={cart.stockQty}
                    />
                    <input
                      type="button"
                      value="+"
                      className="increment"
                      onClick={() => this.incrementQty(cart._id)}
                    />
                  </div>
                  <div className="sale-price">${cart.salePrice.toFixed(2)}</div>
                  <div className="remove">
                    <i
                      onClick={() => this.removeCart(cart._id)}
                      className="fas fa-trash"
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="total-amount-wrapper">
            <div className="coupon-wrapper">
              <label for="coupon">Your Coupon Code is "cart40"</label>
              <input
                type="text"
                id="coupon"
                value={this.state.coupon}
                onChange={this.handleCoupon}
                placeholder="Add Coupon"
              />
              <input
                type="submit"
                id="submit"
                value=">"
                onClick={this.handleSubmit}
              />
            </div>
            <div className="amount-content-wrapper">
              <div className="total-text">
                <div>Sub Total:</div>
                <div>Tax 12%:</div>
                <div>Discount:</div>
                <div
                  style={{
                    color: "#f82e56",
                    fontSize: "18px",
                    fontWeight: "700",
                  }}
                >
                  Total Amount:
                </div>
              </div>
              <div className="total-number">
                <h6>${this.state.subTotal}</h6>
                <h6>${this.state.tax}</h6>
                <h6>${this.state.discount}</h6>
                <h6
                  style={{
                    color: "#f82e56",
                    fontSize: "18px",
                    fontWeight: "700",
                  }}
                >
                  ${this.state.total}
                </h6>
              </div>
            </div>
            <div className="btns-wrapper">
              <button onClick={this.openModal}>Checkout</button>
              {this.props.modal ? (
                <InjectedCheckoutForm state={this.props} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateFromProps = (state) => {
  return {
    carts: state.products.carts,
    modal: state.products.modal,
    coupon: state.products.coupon,
  };
};

export default {
  component: connect(mapStateFromProps, {
    IncrementQty,
    DecrementQty,
    RemoveFromCart,
    RemoveAllFromCart,
    ToggleModal,
    AddCouponToState,
  })(ShoppingCart),
};
