import React, { Component } from "react";
import { IoLocationSharp } from "react-icons/io5";

export default class Event extends Component {
  render() {
    return (
      <div className="event">
        <div>
          <img src="/img/Event/banner-event.jpg" alt="event" />
        </div>
        <div className="event-content d-flex  ">
          <div className="event-left">
            <div className="event-inner d-flex flex-column text-center align-items-center">
              <span className="event-date">25</span>
              <span className="event-month">September</span>
              <span className="event-re">BUY TICKET</span>
            </div>
          </div>
          <div className="event-right d-flex flex-column">
            <span className="event-learn">Learn Anything</span>
            <span className="event-meet">
              CONFERENCE MEET <span className="c1">2</span>
              <span className="c2">0</span>
              <span className="c3">2</span>
              <span className="c4">1</span>
            </span>
            <span className="event-location">
              <IoLocationSharp className="location-icon" /> 21 King Street,
              Dhaka, Bangladesh
            </span>
          </div>
        </div>
      </div>
    );
  }
}
