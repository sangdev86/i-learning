import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ObjectActive1 } from "../../helpers/activeCss";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { createAction } from "../../Redux/Actions";
import { SIDEBAR } from "../../Redux/Actions/type";

export default function Sidebar({ data }) {
  const [nav, setNav] = useState(data[0].status);
  const dispatch = useDispatch();
  const onNav = () => {
    setNav(!nav);
    if (data[0].admin) {
      // console.log(nav);
      dispatch(createAction(SIDEBAR, !nav));
    }
  };
  return (
    <nav
      className={`sidebar-menu ${data[0].overplay && nav ? "overplay" : ""}`}
    >
      <div
        className={`${data[0].left ? "btn-menu-left" : "btn-menu-right "}`}
        onClick={() => onNav()}
      >
        <AiOutlineMenu />
      </div>

      {data.map((item, id) => (
        <div
          key={id}
          className={`${
            nav && item.left
              ? "sidebar on-sidebar-left"
              : nav && !item.left
              ? "sidebar on-sidebar-right"
              : `sidebar ${
                  !nav && item.left
                    ? "sidebar-left"
                    : !nav && !item.left
                    ? "sidebar-right"
                    : ""
                }`
          }`}
          style={item.where}
        >
          <div className="name">
            {item.name}
            <div className="btn-close-sidebar" onClick={() => onNav()}>
              <AiOutlineClose />
            </div>
          </div>
          <ul>
            {item.categories.map((categorie, index) => (
              <li key={index}>
                <NavLink
                  to={categorie.to}
                  exact
                  activeStyle={ObjectActive1}
                  className="nav-i"
                >
                  {categorie.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
//#042331; : #021929; #21566e;
