import React from "react";

export default function SearchAll({ courses }) {
  const handleSearch = (e) => {
    e.preventDefault();

    let coursesSearch = [];
    coursesSearch = courses.filter((item) => {
      return (
        item.tenKhoaHoc
          .trim()
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[đĐ]/g, "d")
          .indexOf(
            e.target.value
              .trim()
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .replace(/[đĐ]/g, "d")
          ) !== -1
      );
    });
  };
  return (
    <form>
      <input type="text" onChange={handleSearch} />
    </form>
  );
}
