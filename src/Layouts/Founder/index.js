import React, { Component } from "react";
import { GrFacebook, GrTwitter, GrGoogle } from "react-icons/gr";
import { teams } from "./teams";

export default class Founder extends Component {
  renderTeam = () => {
    return teams.map((item, index) => {
      return (
        <div key={index} className="col-12 col-lg-4 ourfounderbottom__inner">
          <div className="ourfounderbottom__item">
            <img className="img-fluid" src={item.img} alt="founder" />
            <div className="namefounder text-right">
              <h5>{item.name}</h5>
              <span>{item.hr}</span>
            </div>
            <div className="ourfounderbottom__hover">
              <div className="ourfounderbottom__text">
                <h4>{item.hr}</h4>
                <p>{item.text}</p>
              </div>
              <div className="ourfounderbottom__link">
                <span >
                  <GrFacebook />
                </span>
                <span>
                  <GrTwitter />
                </span>
                <span>
                  <GrGoogle />
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };
  render() {
    return (
      <section id="founder" className="ourfounder">
        <div className="container">
          <div className="row">
            <div className="ourfoundertop__inner ">
              <h4>Our Founder</h4>
              <p>
                People don’t join Udemy to do a job; they come to build a
                career. We all benefit when every employee is supported in
                developing their skills. Starting with robust onboarding, we
                offer lots of homegrown workshops and trainings so people can
                reach their professional goals, including Feedback is Fuel,
                Career Navigators, and Learn to Lead.
              </p>
            </div>
            {this.renderTeam()}
          </div>
        </div>
      </section>
    );
  }
}
