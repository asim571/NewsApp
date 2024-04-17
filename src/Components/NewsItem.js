import React, { Component } from "react";
export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
    return (
      <div className="my-3">
        <div className="card">
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-secondary" style={{left: '80%', zIndex:'1'}}>
                {source}
              </span>
          <img
            src={
              !imageUrl
                ? "https://scx1.b-cdn.net/csz/news/800a/2024/internet-can-achieve-q.jpg"
                : imageUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">
              {title}...{" "}
            </h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-body-secondary">
                By {!author ? "Unknown" : author} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark">
              Read More ...
            </a>
          </div>
        </div>
      </div>
    );
  }
}
export default NewsItem;
