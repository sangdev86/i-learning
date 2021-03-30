import React, { useState, useEffect } from "react";
import dataDev from "./dataDev.json";
import Category from "../../Components/Category";
import Course from "../../Components/Course";
import { courseService } from "../../Services";

const TopCategories = () => {
  const [listCategories, setListCategories] = useState([]);
  const [indexActive, setIndexActive] = useState(0);

  const [listCourses, setListCourses] = useState([]);
  const [maDanhMuc, setMaDanhMuc] = useState("Backend");

  // List Categories
  useEffect(() => {
    courseService
      .categoriesAxios()
      .then((res) => {
        setListCategories(res.data);
      })
      .catch((err) => console.log(err.response.data));
  }, []);

  const renderListCategories = () => {
    return listCategories.map((category, index) => (
      <Category
        key={index}
        category={category}
        id={index}
        indexActive={indexActive}
        onChangeIndex={onChangeIndex}
      />
    ));
  };
  // List coures
  useEffect(() => {
    courseService
      .coursesCategoriesAxios(maDanhMuc)
      .then((res) => {
        setListCourses(res.data);
      })
      .catch((err) => console.log(err.response.data));
  }, [maDanhMuc]);

  const renderListCoures = () => {
    const listCouresUpdate = [...listCourses];
    listCouresUpdate.sort((a, b) => b.luotXem - a.luotXem).splice(8);

    return listCouresUpdate.map((course, index) => (
      <Course key={index} course={course} />
    ));
  };

  function onChangeIndex(id, maDanhMuc) {
    setIndexActive(id);
    setMaDanhMuc(maDanhMuc);
  }

  return (
    <div className="container top-categories">
      <div className="top-categories-title">
        <h4>Top categories</h4>
        <p className="text">
          Choose from 130,000 online video courses with new additions published
          every month
        </p>
      </div>
      <div className="row dev-container m-4 align-self-center">
        <div className="col-12 col-sm-9 dev-left">
          <div className="dev-title">{dataDev[indexActive].tille}</div>
          <span className="dev-comment">{dataDev[indexActive].text}</span>
          <div className="explore">Explore ></div>
        </div>
        <div className="col-12 col-sm-3 dev-right text-center">
          <img src={dataDev[indexActive].img} alt="dev" />
        </div>
      </div>
      <ul className="d-flex flex-wrap">{renderListCategories()}</ul>
      <div className="row">{renderListCoures()}</div>
    </div>
  );
};

export default TopCategories;
