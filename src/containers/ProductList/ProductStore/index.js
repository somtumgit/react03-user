import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../../components/Layout';
import { getProductBySlug } from '../../../actions';
import { useParams } from 'react-router-dom';
import './style.css';
import { generateUploadImageUrl } from '../../../urlConfig';
import { Link } from 'react-router-dom';
import Card from '../../../components/UI/Card';

export default function ProductStore() {
  let { slug } = useParams();
  // console.log(slug);
  const [priceRange, setPriceRange] = useState({
    under5k: 'Under 5000฿',
    under10k: 'Under 10000฿',
    under15k: 'Under 15000฿',
    under20k: 'Under 20000฿',
    upper20k: 'Upper 20000฿'
  });
  const product = useSelector(state => state.product);
  // const category = useSelector(state => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log(product);
    dispatch(getProductBySlug(slug));
  }, []);

  return (
    <>
        { Object.keys(product.productsByPrice).map((key, index) => {
          return (
            <Card 
              key={index} 
              className="card" 
              headerleft={<div>{slug} {priceRange[key]}</div>}
              headerright={<button>view all</button>}
              style={{width: 'calc(100% - 40px)',margin: '20px'}}
            >
              {/* <div className="cardHeader">
                <div>{slug} {priceRange[key]}</div>
                <button>view all</button>
              </div> */}
              <div style={{display: 'flex'}}>
                {
                  product.productsByPrice[key].map((product,_index) => 
                    <Link key={_index} to={`/${product.slug}/${product._id}/p`} className="productContainer" style={{display: 'block'}} >
                      <div className="productImgContainer">
                        <img src={generateUploadImageUrl(product.productPictures[0].img)} alt="product picture" />
                      </div>
                      <div className="productInfo ">
                        <div className="productName">{product.name}</div>
                        <div>
                          <span>4.3</span>&nbsp;
                          <span>3353</span>
                        </div>
                        <div className="productPrice">{product.price}฿</div>
                      </div>
                    </Link>
                  )
                }
              </div>
            </Card>
          )
        }) }
    </>
  )
}
