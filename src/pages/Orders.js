import React, { useState } from "react";
import Container from "../components/Container";
import BreadCrumb from "../components/BreadCrumb";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { cancelAOrder, getOrders } from "../features/user/userSlice";
import { quantityCancelOrder } from "../features/product/productSlice";
import { Link } from "react-router-dom";
import CustomInput from "./../components/CustomInput";

const Orders = () => {
  const dispatch = useDispatch();
  const orderState = useSelector((state) => state?.auth?.getorderedProduct);
  const [status, setStatus] = useState("All Order");
  const filteredOrders = orderState?.filter(
    (order) => order.orderStatus === status
  );
  const handleChange = (event) => {
    setStatus(event.target.value);
  };
  useEffect(() => {
    dispatch(getOrders());
  }, []);
  const upateOrderStatus = (a, b) => {
    dispatch(cancelAOrder({ id: a, status: b }));
    setTimeout(() => {
      dispatch(getOrders());
    }, 400);
  };

  return (
    <>
      <BreadCrumb title="My Orders" />
      <Container class1="checkout-wrapper py-5 home-wrapper-2 px-5">
        <div className="status-bar mb-3">
          <select value={status} onChange={handleChange}>
            <option value="All Order">All Order</option>
            <option value="Ordered">Ordered</option>
            <option value="Processed">Processed</option>
            <option value="Shipped">Shipped</option>
            <option value="Out For Delievery">Out For Delievery</option>
            <option value="Delivered">Delivered</option>
            <option value="Success Shipped"> Success Shipped</option>
            <option value="cancel">Cancel</option>
            <option value="Delivery failed">Delivery failed</option>
          </select>
        </div>
        <div className="row ">
          <div className="col-12 ">
            <div className="row">
              <div className="col-2">
                <h5>Order Id </h5>
              </div>
              <div className="col-2">
                <h5>Total Amount </h5>
              </div>
              <div className="col-2 ">
                <h5>Type Checkout </h5>
              </div>
              <div className="col-2">
                <h5>Address </h5>
              </div>
              <div className="col-2">
                <h5>Status </h5>
              </div>
            </div>
          </div>
          <div className="col-12 mt-3">
            {status === "All Order"
              ? orderState?.map((item, index) => {
                  return (
                    <div
                      style={{ backgroundColor: "#febd69" }}
                      className="row pt-3 my-3"
                      key={index}
                    >
                      <div className="col-2">
                        <p>{item?._id}</p>
                      </div>
                      <div className="col-2">
                        <p>{item?.totalPrice} </p>
                      </div>
                      <div className="col-2">
                        <p>{item?.typecheckout}</p>
                      </div>
                      <div className="col-2">
                        <p>{item?.address}</p>
                      </div>
                      <div className="col-2">
                        <p>{item?.orderStatus}</p>
                      </div>
                      {item?.orderStatus == "Ordered" && (
                        <div className="col-2">
                          <button
                            className="p-1"
                            type="button"
                            onClick={(e) => {
                              upateOrderStatus(item?._id, "cancel");
                              for (
                                let i = 0;
                                i < item?.orderItems?.length;
                                i++
                              ) {
                                dispatch(
                                  quantityCancelOrder({
                                    id: item?.orderItems[i]?.product._id,
                                    quantity: item?.orderItems[i]?.quantity,
                                  })
                                );
                              }
                            }}
                          >
                            Cancel order
                          </button>
                        </div>
                      )}
                      {item?.orderStatus == "cancel" && (
                        <div className="col-2">
                          <Link to={`/order/${item._id}`}>Comment order</Link>
                        </div>
                      )}
                      {item?.orderStatus == "Delivered" && (
                        <div className="col-2">
                          <Link to={`/order/${item._id}`}>Comment order</Link>
                        </div>
                      )}
                      <div className="col-12">
                        <div
                          className="row  py-3"
                          style={{ backgroundColor: "#2b4663" }}
                        >
                          <div className="col-2">
                            <h6 className="text-white">Product Name </h6>
                          </div>
                          <div className="col-2">
                            <h6 className="text-white">Quantity</h6>
                          </div>
                          <div className="col-2">
                            <h6 className="text-white">Price </h6>
                          </div>
                          <div className="col-2">
                            <h6 className="text-white">Color </h6>
                          </div>
                          <div></div>
                        </div>
                        {item?.orderItems?.map((i, index) => {
                          return (
                            <div
                              className="row  p-3"
                              style={{ backgroundColor: "#192e45" }}
                              key={index}
                            >
                              <div className="col-2">
                                <p className="text-white">
                                  {i?.product?.title}{" "}
                                </p>
                              </div>
                              <div className="col-2">
                                <p className="text-white ">{i?.quantity} </p>
                              </div>
                              <div className="col-2">
                                <p className="text-white">{i?.price} </p>
                              </div>
                              <div className="col-2">
                                <ul className="colors ps-0 mx-3">
                                  <li
                                    style={{ backgroundColor: i?.color?.title }}
                                  ></li>
                                </ul>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })
              : filteredOrders?.map((item, index) => {
                  return (
                    <div
                      style={{ backgroundColor: "#febd69" }}
                      className="row pt-3 my-3"
                      key={index}
                    >
                      <div className="col-2">
                        <p>{item?._id}</p>
                      </div>
                      <div className="col-2">
                        <p>{item?.totalPrice} </p>
                      </div>
                      <div className="col-2">
                        <p>{item?.typecheckout}</p>
                      </div>
                      <div className="col-2">
                        <p>{item?.address}</p>
                      </div>
                      <div className="col-2">
                        <p>{item?.orderStatus}</p>
                      </div>
                      {item?.orderStatus == "Ordered" && (
                        <div className="col-2">
                          <button
                            className="p-1"
                            type="button"
                            onClick={(e) => {
                              upateOrderStatus(item?._id, "cancel");
                              for (
                                let i = 0;
                                i < item?.orderItems?.length;
                                i++
                              ) {
                                dispatch(
                                  quantityCancelOrder({
                                    id: item?.orderItems[i]?.product._id,
                                    quantity: item?.orderItems[i]?.quantity,
                                  })
                                );
                              }
                            }}
                          >
                            Cancel order
                          </button>
                        </div>
                      )}
                      <div className="col-12">
                        <div
                          className="row  py-3"
                          style={{ backgroundColor: "#2b4663" }}
                        >
                          <div className="col-2">
                            <h6 className="text-white">Product Name </h6>
                          </div>
                          <div className="col-2">
                            <h6 className="text-white">Quantity</h6>
                          </div>
                          <div className="col-2">
                            <h6 className="text-white">Price </h6>
                          </div>
                          <div className="col-2">
                            <h6 className="text-white">Color </h6>
                          </div>
                          <div></div>
                        </div>
                        {item?.orderItems?.map((i, index) => {
                          return (
                            <div
                              className="row  p-3"
                              style={{ backgroundColor: "#192e45" }}
                              key={index}
                            >
                              <div className="col-2">
                                <p className="text-white">
                                  {i?.product?.title}{" "}
                                </p>
                              </div>
                              <div className="col-2">
                                <p className="text-white ">{i?.quantity} </p>
                              </div>
                              <div className="col-2">
                                <p className="text-white">{i?.price} </p>
                              </div>
                              <div className="col-2">
                                <ul className="colors ps-0 mx-3">
                                  <li
                                    style={{ backgroundColor: i?.color?.title }}
                                  ></li>
                                </ul>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Orders;
