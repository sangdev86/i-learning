import React, { Component } from "react";

export default class ButtonTransparent extends Component {
  render() {
    const {
      name,
      padding,
      margin,
      color,
      border,
      fontSize,
      borderRadius,
    } = this.props;
    return (
      <div
        className="cp-buttonTransparent"
        style={{
          padding: `${padding}`,
          margin: `${margin}`,
          color: `${color}`,
          border: `${border}`,
          fontSize: `${fontSize}`,
          borderRadius: `${borderRadius}`,
        }}
      >
        {name}
      </div>
    );
  }
}
