import { connect } from "react-redux";
import React, { Component } from "react";
// import Carousel from "../Carousel";
import { AiFillPlaySquare, AiFillBug, AiFillDatabase } from "react-icons/ai";

class Banner extends Component {
  render() {
    const { rWith } = this.props;
    return (
      <div className="banner-container">
        <div className="banner">{/* <img src={"./img/banner.jpg"} /> */}</div>

        {/* <div className="carousel-container "><Carousel />
        
        </div> */}
        {rWith >= 1200 ? (
          <>
            <div className="banner-SEO">
              <div className="text">
                <h3>The reviews are in</h3>

                <span>
                  We specialize in learning that gets results. Courses from
                  $11.99 ends April 1.
                </span>
                <div>
                  <input
                    type="text"
                    placeholder="What do you want to learn ?"
                  />
                </div>
              </div>
            </div>
            <div className="row banner-cover text-center mr-0">
              <div className="text-cover col-4">
                <span className="icon-cover-container">
                  <AiFillPlaySquare className="icon-cover" />
                </span>
                <div className="title-cover">130,000 online courses</div>
                <span className="text">Enjoy a variety of fresh topics</span>
              </div>
              <div className="text-cover col-4">
                <span className="icon-cover-container">
                  <AiFillBug className="icon-cover" />
                </span>
                <div className="title-cover">Expert instruction</div>
                <span className="text">
                  Find the right instructor for you Lifetime access
                </span>
              </div>
              <div className="text-cover col-4">
                <span className="icon-cover-container">
                  <AiFillDatabase className="icon-cover" />
                </span>
                <div className="title-cover">Lifetime access</div>
                <span className="text">Learn on your schedule</span>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    rWith: state.myResponsive.rWith,
  };
};
export default connect(mapStateToProps, null)(Banner);
