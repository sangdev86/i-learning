import React, { Component } from "react";
import { FaCartPlus } from "react-icons/fa";

export default class AddCart extends Component {
  render() {
    return (
      <div className="shop-cart align-self-center">
        <FaCartPlus className="FaCartPlus" />
      </div>
    );
  }
}
