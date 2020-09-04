import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import MiniCart from "./minicart";

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="login-wrapper">
          <Link to="/">Login</Link>
        </div>
        <div>
          <h5>React E-Commerce Web App</h5>
        </div>
        <div className="minicart-wrapper">
          <MiniCart state={this.props.carts} />
        </div>
      </div>
    );
  }
}

const mapStateFromProps = (state) => {
  return {
    carts: state.products,
  };
};

export default connect(mapStateFromProps)(Header);
