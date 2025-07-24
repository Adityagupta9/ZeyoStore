import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../style/productcategory.css';
import { useNavigate } from 'react-router-dom';
import Spinner2 from './Spinner2';
const ProductCategory = () => {
  const navigate = useNavigate()  
  const params = useParams();
  const [productcategory, setProductcategory] = useState([]);
  const [category, setCategory] = useState();
  const [loading, setLoading] = useState(false);

useEffect(() => {
  const getCategoryProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`);
      setProductcategory(data?.product);
      setCategory(data?.category);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  if (params?.slug) getCategoryProduct();
}, [params?.slug]); // ✅ No warning now


  return (
    <Layout>
      {loading ? (
        <Spinner2 />
      ) : (
        <>
          <div className="category-header">
            <h2>{category?.name}</h2>
          </div>
          <div className="productcategory-container">
            {productcategory?.map((p) => (
              <div className="product-category-card" key={p._id}>
                <div className="product-category-img">
                  <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} alt={p.name} />
                </div>
                <div className="product-category-details">
                  <div className="product-category-name">{p.name}</div>
                  <div className="product-category-description">{p.description}</div>
                  <div className="product-category-price">₹{p.price}</div>
                  <div className="product-category-quantity">Available: {p.quantity}</div>
                  <button onClick={() => navigate(`/product/${p.slug}`)} className="product-category-see">See More</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </Layout>
  );
};

export default ProductCategory;
