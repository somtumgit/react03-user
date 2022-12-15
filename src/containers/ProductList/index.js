import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/Layout';
import { getProductBySlug } from '../../actions';
import { useParams  } from 'react-router-dom';
import './style.css';
import { generateUploadImageUrl } from '../../urlConfig';
import getParams from '../../utils/getParams';
import ProductStore from './ProductStore';
import ProductPage from './ProductPage';
import ClothingAndAccessories from './ClothingAndAccessories';


export default function ProductList(props) {
  const renderProduct = function() {
    // const queryParams = new URLSearchParams(window.location.search);
    // const cid = queryParams.get('cid');
    // console.log('props',cid);
    const params = getParams(window.location.search);
    // console.log('props',params);
    let content = '';
    switch(params.type) {
      case 'store':
        content = <ProductStore {...props}/>;
        break;
      case 'page':
        content = <ProductPage {...props}/>;
        break;
      default:
        content = <ClothingAndAccessories {...props} />;
    }

    return content;
  }

  return (
    <Layout>
        {renderProduct()}
    </Layout>
  )
}
