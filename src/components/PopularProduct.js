import React from "react";
import ReactStars from "react-rating-stars-component";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import wish from "../images/wish.svg";
import watch2 from "../images/watch-1.avif";
import { addToWishlist } from "../features/product/productSlice";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import prodcompare from "../images/prodcompare.svg";

const PopularProduct = (props) => {
  const dispatch = useDispatch();
  const addToWish = (prodId) => {
    alert(prodId);
    dispatch(addToWishlist(prodId));
  };
  const {
    index,
    title,
    brand,
    totalrating,
    price,
    sold,
    quantity,
    description,
    images,
    id,
  } = props;
  return (
    <div key={index} className="col-3">
      <Link
        to=""
        //     to={`${location.pathname == "/"
        //   ? "/product/:id"
        //   : location.pathname == "/product/:id"
        //     ? "/product/:id"
        //     : ":id"
        // }`}
        className="product-card position-relative">
        <div className="wishlist-icon position-absolute">
          <button
            className="border-0 bg-transparent"
            onClick={(e) => {
              addToWish(id);
            }}>
            <img src={wish} alt="wishlist" />
          </button>
        </div>
        <div className="product-image">
          <img
            src={images[0]?.url}
            className="img-fluid w-100"
            alt="product-image"
            srcset=""
          />
          <img
            src={watch2}
            className="img-fluid"
            alt="product-image"
            srcset=""
          />
        </div>
        <div className="product-details">
          <h6 className="brand">{brand}</h6>
          <h5 className="product-title">{title}</h5>
          <ReactStars
            edit={false}
            count={5}
            value={totalrating.toString()}
            size={24}
            isHalf={true}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            activeColor="#ffd700"
          />
          <p
            className="d-none"
            dangerouslySetInnerHTML={{ __html: description }}></p>
          <p className="price">$ {price}</p>
        </div>

        <div className="action-bar position-absolute">
          <div className="d-flex flex-column ">
            <button className="border-0 bg-transparent">
              <img src={prodcompare} alt="compare" />
            </button>
          </div>

          <div className="d-flex flex-column">
            <button className="border-0 bg-transparent">
              <img src={view} alt="view" />
            </button>
          </div>

          <div className="d-flex flex-column">
            <button className="border-0 bg-transparent">
              <img src={addcart} alt="addcart" />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default PopularProduct;
