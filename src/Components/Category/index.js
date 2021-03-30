import React from "react";
const Category = ({ category, onChangeIndex, id, indexActive}) => {
 
  let { maDanhMuc } = category;
  let nameCategory = "";
  switch (maDanhMuc) {
      case "BackEnd":
          nameCategory = "Backend";

          break;
      case "Design":
          nameCategory = "Design";

          break;
      case "DiDong":
          nameCategory = "Mobile";

          break;
      case "FrontEnd":
          nameCategory = "Frontend";

          break;
      case "FullStack":
          nameCategory = "Fullstack";

          break;
      case "TuDuy":
          nameCategory = "Algorithms";

          break;
      default:
          break;
  }
 
  return (
    <>
      <li
        className={id === indexActive ? "category a-category" : "category"}
        onClick={() => onChangeIndex(id, maDanhMuc)}
      >
        <span>{nameCategory}</span>
      </li>
    </>
  );
};
export default Category;
