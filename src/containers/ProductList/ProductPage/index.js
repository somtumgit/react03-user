import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../../components/Layout';
import { getProductByPage } from '../../../actions';
import getParams from '../../../utils/getParams';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import Card from '../../../components/UI/Card';


export default function ProductPage() {

  const product = useSelector(state => state.product)
  const dispatch = useDispatch();
  const {page} = product;

  useEffect(() => {
    const params = getParams(window.location.search);
    // console.log('ProductPage',params);
    const payload = {
        params
    }
    console.log('ProductPage',payload);
    dispatch(getProductByPage(payload));
  },[]);

  return (
    <div style={{margin: '0 10px'}}>
        <h3>{page.title}</h3>
        <Carousel
            renderThumbs={()=>{}}
            dynamicHeight="400px"
        >
            {
                page.banners && page.banners.map((banner,index) => 
                    <a 
                        key={index} 
                        href={banner.navigateTo}
                        style={{display:'block',height:'400px'}}
                    >
                        <img src={banner.img} alt="banner image" style={{height:'400px',objectFit:'cover'}}/>
                        {/* <p className="legend">Legend 1</p> */}
                    </a>
                )
            }
        </Carousel>
        <div className='my-4' style={{display:'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
            {
                page.products && page.products.map((product,index) => 
                    <Card key={index} style={{width:'32%',margin:'0 5px'}}>
                        <img src={product.img} alt="product image"  style={{width:'100%'}}/>
                    </Card>
                )
            }
        </div>
        {/* <div>
            {JSON.stringify(product.page)}
        </div> */}
        
    </div>
  )
}
