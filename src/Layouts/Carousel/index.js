import React, { Component } from "react";
import Slider from "react-slick";
import ReactSale from "./img/react-sale.png";
import NodeSale from "./img/sale-nodejs.jpg";
import FEJob from "./img/job-FE.jpg";
import NodeJob from "./img/job-nodejs.jpg";

export default class Carousel extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 1000,
      slidesToShow: 2,
      slidesToScroll: 1,
      autoplay: true,
      arrows: false,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
          },
        },
      ],
    };
    return (
      <div className="carousel-sale-job">
        <div className="carousel-title">
          Learn <span className="text-spe">And</span> Apply
        </div>
        <span>Continue to grow with us. Courses start at $11.99</span>
        <br />
        <div
          style={{
            width: "400px",
            marginTop: "10px",
          }}
        >
          <Slider {...settings}>
            <div className="img-carousel">
              <div className="text-header text-center">Sale 30%</div>
              <img src={ReactSale} alt="sale" />
            </div>
            <div className="img-carousel">
              <div className="text-header text-center">Hot Job</div>
              <img src={FEJob} alt="sale" />
            </div>
            <div className="img-carousel">
              <div className="text-header text-center">Sale 20%</div>
              <img src={NodeSale} alt="sale" />
            </div>
            <div className="img-carousel">
              <div className="text-header text-center">Hot Job</div>
              <img src={NodeJob} alt="sale" />
            </div>
          </Slider>
        </div>
      </div>
    );
  }
}
