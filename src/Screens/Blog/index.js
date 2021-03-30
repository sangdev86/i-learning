import React, { Component } from "react";
import { bData } from "./blogData";
export default class Blog extends Component {
  renderBlog = () => {
    return bData.map((item, index) => {
      return (
        <div className="blog-item row" key={index}>
          <div className="col-md-4 col-12 ">
            <div className="img-inner">
              <img className="blog-img" src={item.img} alt="img" />
            </div>
          </div>
          <div className="blog-right col-md-7 col-12">
            <span className="blog-hashtag">{item.hashtag}</span>
            <h4 className="blog-title">{item.title}</h4>
            <div className="blog-right-bottom">
              <img className="blog-avatar" src={item.avatar} alt="avatar" />
              <span className="blog-name">{item.name}</span>
              <span className="blog-time">{item.time}</span>
            </div>
          </div>
        </div>
      );
    });
  };
  render() {
    return (
      <div className="container blog">
        <h3 className="display-5 text-center">#BLOG</h3>
        <p className="text-center">A collection of 4 posts</p>
        {this.renderBlog()}
      </div>
    );
  }
}
