import React, { useEffect } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import BlogCard from "../components/BlogCard";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../features/blog/blogSlice";
import moment from "moment/moment";
const Blog = () => {
  const blogState = useSelector((state) => state?.blog?.blog);
  const dispatch = useDispatch();
  useEffect(() => {
    getBlogs();
  }, []);
  const getBlogs = () => {
    dispatch(getAllBlogs());
  };
  return (
    <>
      <Meta title={"Blogs"} />
      <BreadCrumb title="Blogs" />
      <Container class1="blog-wrapper home-wrapper-2 py-5">
        <div className="row set-padding ">
          <div className="col-2 ">
            <div className="filter-card mb-3 ">
              <h3 className="filter-title">Shop By Catergories</h3>
              <div>
                <ul className="ps-0">
                  <li>Home</li>
                  <li>Our Store</li>
                  <li>Blogs</li>
                  <li>Contact</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-10">
            <div className="row">
              {blogState
                ? blogState?.map((item, index) => {
                    return (
                      <div className="col-6 mb-3 blog-page" key={index}>
                        <BlogCard
                          id={item?._id}
                          title={item?.title}
                          description={item?.description}
                          image={item?.images[0]?.url}
                          date={moment(item?.createdAt).format(
                            "MMMM Do YYYY, h:mm a"
                          )}
                        />
                      </div>
                    );
                  })
                : []}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Blog;
