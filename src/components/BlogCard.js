import React from "react";
import { Link } from "react-router-dom";

const BlogCard = () => {
  return (
    <div className="blog-card">
      <div className="card-image">
        <img src="images/blog-1.jpg" className="img-fluid  w-100" alt="blog" />
      </div>
      <div className="blog-content">
        <p className="date"> 1 Jan, 2023</p>
        <h5 className="title">A beautiful sunday morning renaissance</h5>
        <p className="desc">
          Còn gì tốt hơn là khởi động một ngày mới bằng tựa game kinh dị Animal
          Crossing phiên bản creepypasta. Animal Crossing phiên bản creepypasta
          có tên Harvest Festival 64,...
        </p>
        <Link className="button " to="/blogs/:id">
          Read more
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
