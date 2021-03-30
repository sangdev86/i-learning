import React, { Component } from "react";

export default class Button extends Component {
  render() {
    const {
      name,
      padding,
      margin,
      fontSize,
      borderRadius,
      color,
      backgroundColor,
      colorHover,
      backgroundColorHover,
    } = this.props;
    return (
      <div
        className="cp-button"
        style={{
          padding: `${padding}`,
          margin: `${margin}`,
          fontSize: `${fontSize}`,
          borderRadius: `${borderRadius}`,
          color: `${color}`,
          backgroundColor: `${backgroundColor}`,
          hover: {
            color: `${colorHover}`,
            backgroundColor: `${backgroundColorHover}`,
          },
        }}
      >
        {name}
      </div>
    );
  }
}
