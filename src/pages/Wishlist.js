import React, { useEffect } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getUserProductWishlist } from "../features/user/userSlice";
import { addToWishlist } from "../features/product/productSlice";

const Wishlist = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getWishlistFromDb();
  }, []);

  const getWishlistFromDb = () => {
    dispatch(getUserProductWishlist());
  };

  const removeFromWishlist = (id) => {
    dispatch(addToWishlist(id));
    setTimeout(() => {
      dispatch(getUserProductWishlist());
    }, 300);
  };
  const wishlistState = useSelector((state) => state.auth?.wishlist?.wishlist);
  return (
    <>
      <Meta title={"Wishlist"} />
      <BreadCrumb title="Wishlist" />
      <Container class1="wishlost-wrapper home-wrapper-2 py-5">
        <div className="row set-padding">
          {wishlistState?.length === 0 && (
            <div className="text-center fs-3">No Product Wishlist</div>
          )}

          {wishlistState?.map((item, index) => {
            return (
              <div className="col-2 " key={index}>
                <div className="wishlist-card position-relative">
                  <img
                    onClick={() => {
                      removeFromWishlist(item?._id);
                    }}
                    src="images/cross.svg"
                    alt="cross"
                    className="position-absolute cross img-fluid"
                  />
                  <div className="wishlist-card-image bg-white  ">
                    <img
                      src={
                        item?.images[0].url
                          ? item?.images[0].url
                          : "images/watch"
                      }
                      className="img-fluid d-block mx-auto"
                      alt="watch"
                      width={160}
                    />
                  </div>
                  <div className="px-3 py-3"></div>
                  <div className="py-3 px-3">
                    <h5 className="title">{item?.title}</h5>
                    <h6 className="price">${item?.price}</h6>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </>
  );
};

export default Wishlist;
