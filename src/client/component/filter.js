import React, { Component } from "react";
import { connect } from "react-redux";
import { AddFilteredList } from "../actions/index";

class Filter extends Component {
  handleClick = (e) => {
    this.props.AddFilteredList(e.target.id);
  };

  render() {
    return (
      <div className="filter-wrapper">
        <ul className="row">
          <li className="col-lg-5ths" onClick={this.handleClick} id="all">
            <h6>All</h6>
          </li>
          <li className="col-lg-5ths" onClick={this.handleClick} id="pants">
            <h6>Pants</h6>
          </li>
          <li className="col-lg-5ths" onClick={this.handleClick} id="jeans">
            <h6>Jeans</h6>
          </li>
          <li className="col-lg-5ths" onClick={this.handleClick} id="shirts">
            <h6>Shirts</h6>
          </li>
          <li className="col-lg-5ths" onClick={this.handleClick} id="t-shirts">
            <h6>T-Shirts</h6>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateFromProps = (state) => {
  return {
    filterdList: state.products,
  };
};

export default connect(mapStateFromProps, { AddFilteredList })(Filter);
