import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from 'react-router-dom';
import { getProductBySlug } from "../../../actions";
import Card from "../../../components/UI/Card";
import { BiRupee } from "react-icons/bi";
import { generateUploadImageUrl } from '../../../urlConfig';
import getParams from '../../../utils/getParams';
import "./style.css";

export default function ClothingAndAccessories(props) {
    let { slug } = useParams();
    const product = useSelector((state) => state.product);
    const dispatch = useDispatch();
  
    useEffect(() => {
        const params = getParams(window.location.search);
        // console.log('ProductPage',params);
        const payload = {
            params
        }
        console.log('ClothingAndAccessories',payload);
        console.log('ClothingAndAccessories',slug);
        // dispatch(getProductBySlug(payload));
        dispatch(getProductBySlug(slug));


    //   const { match } = props;
    //   dispatch(getProductBySlug(match.params.slug));
    }, []);
  
    return (
      <div style={{ padding: "10px" }}>
        <Card
          style={{
            boxSizing: "border-box",
            padding: "10px",
            display: "flex",
            flexFlow: "row",
          }}
        >
          {product.products.map((product) => (
            <div className="caContainer me-3">
              <Link
                className="caImgContainer"
                to={`/${product.slug}/${product._id}/p`}
              >
                <img src={generateUploadImageUrl(product.productPictures[0].img)} />
              </Link>
              <div>
                <div className="caProductName">{product.name}</div>
                <div className="caProductPrice">
                  <BiRupee />
                  {product.price}
                </div>
              </div>
            </div>
          ))}
        </Card>
      </div>
    );
}
