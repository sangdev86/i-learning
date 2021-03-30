import React, { Component } from "react";
import Banner from "../../Layouts/Banner";
import Founder from "../../Layouts/Founder";
import GetStart from "../../Layouts/GetStart";
import TopCategories from "../../Layouts/TopCategories";

export default class Home extends Component {
  render() {
    return (
      <div>
        <Banner />
        <TopCategories />
        <GetStart />
        <Founder />
      </div>
    );
  }
}
