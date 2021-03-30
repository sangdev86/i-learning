import React, { Component } from "react";
import { FaJoomla, FaAsymmetrik, FaVimeo } from "react-icons/fa";
import { connect } from "react-redux";
class GetStart extends Component {
  render() {
    let { rWith } = this.props;
    return (
      <div>
        {rWith > 1200 ? (
          <div className="row banner-cover text-center mr-0">
            <div className="text-cover col-4">
              <span className="icon-cover-container">
                <FaJoomla className="icon-cover" />
              </span>

              <div className="title-cover">Go at your own pace</div>
              <span className="text">
                Enjoy lifetime access to courses on Udemy’s website and app
              </span>
            </div>
            <div className="text-cover col-4">
              <span className="icon-cover-container">
                <FaAsymmetrik className="icon-cover" />
              </span>
              <div className="title-cover">Learn from industry experts</div>
              <span className="text">
                Select from top instructors around the world
              </span>
            </div>
            <div className="text-cover col-4">
              <span className="icon-cover-container">
                <FaVimeo className="icon-cover" />
              </span>
              <div className="title-cover">
                Find video courses on almost any topic
              </div>
              <span className="text">
                Build your library for your career and personal growth
              </span>
            </div>
          </div>
        ) : (
          ""
        )}

        <div className="get-start">
          <h4>Get personal learning recommendations</h4>
          <p>Answer a few questions for your top picks</p>
          <span className="btn button_1">Get Start</span>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    rWith: state.myResponsive.rWith,
  };
};
export default connect(mapStateToProps, null)(GetStart);
