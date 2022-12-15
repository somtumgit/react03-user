/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrders } from "../../actions";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import { BiRupee } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import { generateUploadImageUrl } from '../../urlConfig';

import "./style.css";
import { Breed } from "../../components/MaterialUI";

export default function Order() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  console.log(user);
  return (
    <Layout>
      <div style={{ maxWidth: "1160px", margin: "5px auto" }}>
        <Breed
          breed={[
            { name: "Home", href: "/" },
            { name: "My Account", href: "/account" },
            { name: "My Orders", href: "/account/orders" },
          ]}
          breedIcon={<IoIosArrowForward />}
        />
        {/* <div>
            {JSON.stringify(user.orders)}
        </div> */}
        {user.orders.map((order,index) => {
          return ( 
            <Card
                key={index}
                headerleft={<div>ORDER: {order._id}</div>}
                headerright={<div>ITEM: {order.items.length}&nbsp;&nbsp;&nbsp;AMOUNT: {order.totalAmount}</div>}
            >

                {
                    order.items.map((item,_index) => {
                        return (
                          <Card
                            key={_index} 
                            style={{ display: "block", margin: "5px 0" }} noheader={"true"}
                          >
                            <Link
                                to={`/order_details/${order._id}`}
                                className="orderItemContainer"
                            >
                                <div className="orderImgContainer">
                                <img
                                    className="orderImg"
                                    src={generateUploadImageUrl(item.productId.productPictures[0].img)}
                                />
                                </div>
                                <div className="orderRow">
                                <div className="orderName">{item.productId.name}</div>
                                <div className="orderPrice">
                                    <BiRupee />
                                    {item.payablePrice}
                                </div>
                                <div>{order.paymentStatus}</div>
                                </div>
                            </Link>
                          </Card>
                        );
                    })
                }   
            </Card>
          );
            
        })}
      </div>
    </Layout>
  )
}
