import React, { Component } from "react";
import { createAction } from "../../Redux/Actions";
import { AVATAR_LIST, SET_AVATAR } from "../../Redux/Actions/type";
import { connect } from "react-redux";

class Avatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    };
  }
  handleChoose = (index) => {
    localStorage.setItem("avatar", index);
    this.props.chooseAvatar(index);
    this.props.dispatch(createAction(AVATAR_LIST, false));
    this.props.dispatch(
      createAction(SET_AVATAR, localStorage.getItem("avatar"))
    );
  };
  renderBlog = () => {
    return this.state.img.map((item, index) => {
      return (
        <img
          onClick={() => this.handleChoose(index)}
          key={index}
          src={`./img/Avatar/User-${item}.png`}
          alt="avatar"
        />
      );
    });
  };
  render() {
    return <div className="avatar">{this.renderBlog()}</div>;
  }
}
export default connect()(Avatar);
