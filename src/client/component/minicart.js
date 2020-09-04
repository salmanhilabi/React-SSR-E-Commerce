import React from "react";
import { Link } from "react-router-dom";

const totalAmount = (carts) => {
  let arr = [];
  carts.map((cart) => {
    arr.push(cart.salePrice);
  });
  let total = arr.reduce((sum, num) => sum + num);
  return total.toFixed(2);
};

const MiniCart = (props) => {
  return (
    <div className="showcart">
      <Link to="/shopping-cart">
        <img alt="shopping cart" src="./assets/images/shopping-cart.png" />
        <div>
          <h6>
            Total:
            {props.state.carts.length === 0 ? (
              <span>$0.00</span>
            ) : (
              <span>${totalAmount(props.state.carts)}</span>
            )}
          </h6>
          <h6>
            Item: <span>{props.state.carts.length}</span>
          </h6>
        </div>
      </Link>
    </div>
  );
};

export default MiniCart;
