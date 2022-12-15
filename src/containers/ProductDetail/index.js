import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/Layout';
import { IoIosArrowForward, IoIosStar, IoMdCart } from "react-icons/io";
import { BiRupee } from "react-icons/bi";
import { AiFillThunderbolt } from "react-icons/ai";
import { useParams, useNavigate } from 'react-router-dom';
import { MaterialButton } from "../../components/MaterialUI";
import './style.css';
import { getProductById, addToCart } from '../../actions';
import { generateUploadImageUrl } from '../../urlConfig';


export default function ProductDetail(props) {
  const {productSlug, productId} = useParams();
  const navigate = useNavigate();
  const product = useSelector(state => state.product);
  const dispatch = useDispatch();
  
  useEffect(() => {
    console.log('ProductDetail',product);
  },[product]);

  useEffect(() => {
    // console.log(productSlug);
    // console.log(productId);
    const payload = {
        params: {
            productId: productId
        }
    }
    dispatch(getProductById(payload));
  }, []);

  if(Object.keys(product.productDetail).length === 0) {
    return null;
  }



  return (
    <Layout>
        {/* <h1>ProductDetail</h1> */}
        {/* {JSON.stringify(product)} */}
        <div className="productDescriptionContainer">
          <div className="flexRow">
            <div className="verticalImageStack">
              {product.productDetail.productPictures.map((thumb, index) => (
                <div key={index} className="thumbnail">
                  <img src={generateUploadImageUrl(thumb.img)} alt={thumb.img} />
                </div>
              ))}
            </div>
            <div className="productDescContainer">
              <div className="productDescImgContainer">
                <img
                  src={generateUploadImageUrl(product.productDetail.productPictures[0].img)}
                  alt={`${product.productDetail.productPictures[0].img}`}
                />
              </div>

              {/* action buttons */}
              <div className="flexRow">
                <MaterialButton
                  title="ADD TO CART"
                  bgColor="#ff9f00"
                  textColor="#ffffff"
                  style={{
                    marginRight: "5px",
                  }}
                  icon={<IoMdCart />}
                  onclick={() => {
                    const { _id, name, price } = product.productDetail;
                    const img = product.productDetail.productPictures[0].img;
                    const productData = {_id, name, price, img};
                    // console.log('productdetail',productData);
                    dispatch(addToCart(productData));
                    // props.history.push(`/cart`);
                    navigate('/cart');
                  }}
                />
                <MaterialButton
                  title="BUY NOW"
                  bgColor="#fb641b"
                  textColor="#ffffff"
                  style={{
                    marginLeft: "5px",
                  }}
                  icon={<AiFillThunderbolt />}
                />
              </div>
            </div>
          </div>
          <div>
            {/* home > category > subCategory > productName */}
            <div className="breed">
              <ul>
                <li>
                  <a href="#">Home</a>
                  <IoIosArrowForward />
                </li>
                <li>
                  <a href="#">Mobiles</a>
                  <IoIosArrowForward />
                </li>
                <li>
                  <a href="#">Samsung</a>
                  <IoIosArrowForward />
                </li>
                <li>
                  <a href="#">{product.productDetail.name}</a>
                </li>
              </ul>
            </div>
            {/* product description */}
            <div className="productDetails">
              <p className="productTitle">{product.productDetail.name}</p>
              <div>
                <span className="ratingCount">
                  4.3 <IoIosStar />
                </span>
                <span className="ratingNumbersReviews">
                  72,234 Ratings & 8,140 Reviews
                </span>
              </div>
              <div className="extraOffer">
                Extra <BiRupee />
                4500 off{" "}
              </div>
              <div className="flexRow priceContainer">
                <span className="price">
                  <BiRupee />
                  {product.productDetail.price}
                </span>
                <span className="discount" style={{ margin: "0 10px" }}>
                  22% off
                </span>
                {/* <span>i</span> */}
              </div>
              <div>
                <p
                  style={{
                    color: "#212121",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  Available Offers
                </p>
                <p style={{ display: "flex" }}>
                  <span
                    style={{
                      width: "100px",
                      fontSize: "12px",
                      color: "#878787",
                      fontWeight: "600",
                      marginRight: "20px",
                    }}
                  >
                    Description
                  </span>
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#212121",
                    }}
                  >
                    {product.productDetail.description}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
    </Layout>
    
  )
}
