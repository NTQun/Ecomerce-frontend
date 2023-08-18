import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { base_url, config } from "../utils/axiosConfig";
import { createAnOrder } from "../features/user/userSlice";
const shippingSchema = yup.object({
  firstName: yup.string().required("First Name is Required"),
  lastName: yup.string().required("Last Name is Required"),
  address: yup.string().required("Address Detail are Required"),
  state: yup.string().required("State is Required"),
  city: yup.string().required("City is Required"),
  country: yup.string().required("Country is Required"),
  pincode: yup.number().required("Pincode is Required"),
  other: yup.string().required("Other is Required"),
});

const Checkout = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state?.auth?.user);
  const cartState = useSelector((state) => state?.auth?.cartProducts);
  const [totalAmount, setTotalAmount] = useState(null);
  const [shippingIndfo, setShippingInfo] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState({
    razorpayPaymentId: "",
    razorpayOrderId: "",
  });
  const [cartProductState, setCartProductState] = useState([]);

  useEffect(() => {
    let sum = 0;
    for (let i = 0; i < cartState?.length; i++) {
      sum = sum + Number(cartState[i].quantity) * cartState[i].price;
    }
    setTotalAmount(sum);
  }, [cartState]);

  // console.log(paymentInfo, shippingIndfo);
  const formik = useFormik({
    initialValues: {
      firstName: authState.firstname || "",
      lastName: authState.lastname || "",
      address: "",
      state: "",
      city: "",
      country: "",
      pincode: "",
      other: "",
    },
    validationSchema: shippingSchema,
    onSubmit: (values) => {
      setShippingInfo(values);
      setTimeout(() => {
        checkOuteHandler();
      }, 500);
    },
  });

  useEffect(() => {
    let items = [];
    for (let index = 0; index < cartState.length; index++) {
      items.push({
        product: cartState[index].productId._id,
        quantity: cartState[index].quantity,
        color: cartState[index].color._id,
        price: cartState[index].price,
      });
    }
    setCartProductState(items);
  }, []);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const checkOuteHandler = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay SDK failed to Load");
      return;
    }
    const result = await axios.post(
      `${base_url}user/order/checkout`,
      { amount: totalAmount + 3 },
      config
    );
    if (!result) {
      alert("Something went Wrong");
      return;
    }
    const { amount, id: order_id, currency } = result.data.order;

    const options = {
      key: "rzp_test_3iJMbjmvX1IVGL", // Enter the Key ID generated from the Dashboard
      amount: amount,
      currency: currency,
      name: "Trung Quan.",
      description: "Test Transaction",
      // image: { logo },
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
        };

        const result = await axios.post(
          `${base_url}user/order/paymentVerification`,
          data,
          config
        );

        setPaymentInfo({
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
        });

        dispatch(
          createAnOrder({
            totalPrice: totalAmount,
            totalPriceAfterDiscount: totalAmount,
            orderItems: cartProductState,
            paymentInfo,
            shippingIndfo,
          })
        );
      },
      prefill: {
        name: "Trung Quan",
        email: "nguyenquan07112001@gmail.com",
        contact: "+84 345384130",
      },
      notes: {
        address: "CTU",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <>
      <Container class1="checkout-wrapper py-5 home-wrapper-2 px-5">
        <div className="row">
          <div className="col-7">
            <div className="checkout-left-data">
              <h3 className="website-name">Digitic</h3>
              <nav
                style={{ "--bs-breadcrumb-divider": ">" }}
                aria-label="breadcrumb"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link className="text-dark total-price" to="/cart">
                      Cart
                    </Link>
                  </li>
                  &nbsp; /&nbsp;
                  <li
                    className="breadcrumb-ite total-price active"
                    aria-current="page"
                  >
                    Information
                  </li>
                  &nbsp; /
                  <li className="breadcrumb-item total-price active">
                    Shipping
                  </li>
                  &nbsp; /
                  <li
                    className="breadcrumb-item total-price active"
                    aria-current="page"
                  >
                    Payment
                  </li>
                </ol>
              </nav>
              <h4 className="title total">Contact Information</h4>
              <p className="user-details total">
                Trung Quan (nguyenquan07112001@gmail.com)
              </p>
              <h4 className="mb-3">Shipping Address</h4>
              <form
                onSubmit={formik.handleSubmit}
                action=""
                className="d-flex gap-15 flex-wrap justify-content-between"
              >
                <div className="w-100">
                  <select
                    name="country"
                    className="form-control form-select"
                    onChange={formik.handleChange("country")}
                    onBlur={formik.handleBlur("country")}
                    values={formik.values.country}
                    id=""
                  >
                    <option value="select" selected>
                      Selected Contry
                    </option>
                    <option value="Viet Name">Viet Name</option>
                  </select>
                  <div className="error ms-2 my-1">
                    {formik.touched.country && formik.errors.country}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    onChange={formik.handleChange("firstName")}
                    onBlur={formik.handleBlur("firstName")}
                    values={formik.values.firstName}
                    className="form-control"
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.firstName && formik.errors.firstName}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    onChange={formik.handleChange("lastName")}
                    onBlur={formik.handleBlur("lastName")}
                    values={formik.values.lastName}
                    className="form-control"
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.lastName && formik.errors.lastName}
                  </div>
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Address"
                    name="address"
                    onChange={formik.handleChange("address")}
                    onBlur={formik.handleBlur("address")}
                    values={formik.values.address}
                    className="form-control"
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.address && formik.errors.address}
                  </div>
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Apartment, Suite ,etc"
                    name="other"
                    onChange={formik.handleChange("other")}
                    onBlur={formik.handleBlur("other")}
                    values={formik.values.other}
                    className="form-control"
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.other && formik.errors.other}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="City"
                    name="city"
                    onChange={formik.handleChange("city")}
                    onBlur={formik.handleBlur("city")}
                    values={formik.values.city}
                    className="form-control"
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.city && formik.errors.city}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <select
                    name="state"
                    onChange={formik.handleChange("state")}
                    onBlur={formik.handleBlur("state")}
                    values={formik.values.state}
                    className="form-control form-select"
                    id=""
                  >
                    <option value="" selected disabled>
                      Select State
                    </option>
                    <option value="haryana">Haryana</option>
                  </select>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Zipcode"
                    name="pincode"
                    onChange={formik.handleChange("pincode")}
                    onBlur={formik.handleBlur("pincode")}
                    values={formik.values.pincode}
                    className="form-control"
                  />
                </div>
                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <Link to="/cart" className="text-dark">
                      <BiArrowBack className="me-2" />
                      Return to Cart
                    </Link>
                    <Link to="/cart" className="button">
                      Continue to Shipping
                    </Link>
                    <button
                      className="button"
                      type="submit"
                      onClick={checkOuteHandler}
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-5">
            <div className="border-bottom py-4">
              {cartState &&
                cartState?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="d-flex gap-10 mb-2 align-align-items-center"
                    >
                      <div className="w-75 d-flex gap-10">
                        <div className="w-25 position-relative">
                          <span
                            style={{ top: "-10px", right: "2px" }}
                            className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                          >
                            {item?.quantity}
                          </span>
                          <img
                            width={100}
                            src={item?.productId?.images[0]?.url}
                            alt="product"
                          />
                        </div>
                        <div>
                          <h5 className="total-price">
                            {item?.productId?.title}
                          </h5>
                          <p className="total-price"> {item?.color?.title} </p>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="total">
                          $ {item.price * item?.quantity}
                        </h5>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="border-bottom py-4">
              <div className="d-flex justify-content-between align-items-center">
                <p className="total">Subtotal</p>
                <p className="total-price">${totalAmount ? totalAmount : 0}</p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0 total">Shipping</p>
                <p className="mb-0 total-price">$ 3</p>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center border-bootom py-4">
              <h4 className="total">Total</h4>
              <h5 className="total-price">
                ${totalAmount ? totalAmount + 3 : 0}
              </h5>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Checkout;
