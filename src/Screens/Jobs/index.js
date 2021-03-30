import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { IoLocationSharp } from "react-icons/io5";
import { BsCalendar } from "react-icons/bs";
import { jobsData } from "./jobsData";
import Button from "../../Components/Button/index";

const Job = () => {
  const [indexID, setindexID] = useState(0);
  const location = useSelector((state) => state.jobs.location);
  const keywords = useSelector((state) => state.jobs.keywords);
  const credentials = useSelector((state) => state.user.credentials);

  // const myfilter = (arry) => {
  //   arry.filter((item) => {
  //     return (
  //       item.name
  //         .trim()
  //         .toLowerCase()
  //         .normalize("NFD")
  //         .replace(/[\u0300-\u036f]/g, "")
  //         .replace(/[đĐ]/g, "d")
  //         .indexOf(
  //           keywords
  //             .trim()
  //             .toLowerCase()
  //             .normalize("NFD")
  //             .replace(/[\u0300-\u036f]/g, "")
  //             .replace(/[đĐ]/g, "d")
  //         ) !== -1
  //     );
  //   });
  // }
  let arrfilter = [];
  if (location === "All") {
    if (keywords === "") {
      arrfilter = jobsData;
    } else if (keywords.length > 0) {
      arrfilter = jobsData.filter((item) => {
        return (
          item.name
            .trim()
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[đĐ]/g, "d")
            .indexOf(
              keywords
                .trim()
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/[đĐ]/g, "d")
            ) !== -1
        );
      });
    }
  } else if (location !== "All") {
    arrfilter = jobsData
      .filter((item) => {
        return item.location === location;
      })
      .filter((item) => {
        return (
          item.name
            .trim()
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[đĐ]/g, "d")
            .indexOf(
              keywords
                .trim()
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/[đĐ]/g, "d")
            ) !== -1
        );
      });
  }

  // console.log(arrfilter);
  // console.log(jobsData[0].location);
  // console.log(location);
  // console.log(jobsData[0].location === location);

  return (
    <div className="jobs row container-fluid">
      <div className="list-jobs col-6">
        {keywords.length > 0 || location !== "All" ? (
          <div className="search-keywords">
            {arrfilter.length}
            {arrfilter.length > 1 ? " IT jobs" : " IT job"}
          </div>
        ) : (
          <div className="search-keywords">1,350 IT jobs</div>
        )}

        {arrfilter.map((item, index) => (
          <div
            key={index}
            className={`jobs-item row ${
              indexID === index ? "active-tick" : ""
            }`}
            onClick={() => setindexID(index)}
          >
            <div className="left-item col-2">
              <div className="img-company">
                <img src={item.img} alt={item.name} />
              </div>
            </div>
            <div className="center-item col-7">
              <h5>{item.name}</h5>
              {credentials ? (
                <span className="sign-in-item">
                  <RiMoneyDollarCircleLine className="money-icon" />
                  You'll Love
                </span>
              ) : (
                <span className="sign-in-item">
                  <RiMoneyDollarCircleLine className="money-icon" />
                  Sign in to views
                </span>
              )}

              <ul className="reasons">
                {item.reasons.map((reason, index) => (
                  <li key={index} className="reason-item">
                    {reason}
                  </li>
                ))}
              </ul>
              <div className="techs d-flex">
                {item.tech.map((tech, index) => (
                  <div key={index} className="tech-item">
                    {tech}
                  </div>
                ))}
              </div>
            </div>
            <div className="right-item col-3 d-flex flex-column justify-content-between">
              <span className="status">Hot</span>
              <span className="location">{item.location}</span>
              <span className="time">{item.time}</span>
            </div>
          </div>
        ))}
      </div>
      {arrfilter.length > 0 ? (
        <div className="job-detail col-6">
          <div className="job-title">
            <h5>{arrfilter[indexID].name}</h5>
            <span className="company">{arrfilter[indexID].company}</span>
            <div className="apply">
              <Button
                name={"Apply Now"}
                padding={"10px"}
                margin={"0px"}
                fontSize={"19px"}
                borderRadius={"3px"}
              />
            </div>
          </div>

          <div className="techs d-flex">
            {arrfilter[indexID].tech.map((tech, index) => (
              <div key={index} className="tech-item">
                {tech}
              </div>
            ))}
          </div>
          <span className="sign-in-item">
            <RiMoneyDollarCircleLine className="money-icon" />
            Sign in to views
          </span>
          <div className="address">
            <IoLocationSharp />
            {arrfilter[indexID].address}
          </div>
          <div className="time-ago">
            <BsCalendar className="calendar-icon" /> {arrfilter[indexID].time}
          </div>
          <div className="top-reasons">
            Top 3 Reasons To Join Us
            <ul className="reasons-list">
              {arrfilter[indexID].reasons.map((reason, index) => (
                <li key={index} className="reason-item">
                  {reason}
                </li>
              ))}
            </ul>
          </div>
          <div className="job-description">
            <span className="description-title">Job Description</span>
            <div className="description-content">
              - {arrfilter[indexID].description}
            </div>
          </div>
          <div className="Why">
            <span className="Why-title">Your Skills and Experience</span>
            <div className="Why-content">
              <ul className="Why-list">
                {arrfilter[indexID].why.map((why, index) => (
                  <li key={index} className="Why-item">
                    {why}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="experience">
            <span className="experience-title">Your Skills and Experience</span>
            <div className="experience-content">
              <ul className="experience-list">
                {arrfilter[indexID].experience.map((experience, index) => (
                  <li key={index} className="experience-item">
                    {experience}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="company-footer d-flex">
            <div className="company-left">
              <img src={arrfilter[indexID].img} alt="company" />
            </div>
            <div className="company-right">
              <div className="name-company">
                {arrfilter[indexID].nameCompany}
              </div>
              <div className="text-company">
                {arrfilter[indexID].textCompany}
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Job;
