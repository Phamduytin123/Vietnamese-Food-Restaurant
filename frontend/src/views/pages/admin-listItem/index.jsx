import React from 'react';
import { useState } from 'react';
import './index.scss';
import Form from 'react-bootstrap/Form';
import { IoIosSearch } from 'react-icons/io';
import { FiArrowRight } from 'react-icons/fi';
import { FiArrowLeft } from 'react-icons/fi';
import ProductCardGrid from '../../../components/product-card-grid';
import productAPI from '../../../api/productAPI';
import categoryAPI from '../../../api/categoryAPI';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ProductCardAdmin from '../../../components/product-card-admin';

const AdminListItem = () => {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [isFood, setIsFood] = useState(true);
  const [txtSearch, setTxtSearch] = useState('');
  const [limit, setLimit] = useState(6);
  const [showBy, setShowBy] = useState('name');

  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setCurrentPage(1);
    setTxtSearch(event.target.value);
  };
  const handleLimitChange = (event) => {
    setCurrentPage(1);
    setLimit(Number(event.target.value));
  };
  const handleShowByChange = (event) => {
    setCurrentPage(1);
    setShowBy(event.target.value);
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const productList = await productAPI.getListItems(currentPage, limit, null, null, txtSearch, isFood, showBy);
      setProducts(productList.data.items);
      setTotalPages(productList.data.totalPages);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [isFood, txtSearch, limit, showBy, currentPage]);

  return (
    <div className="shop-page">
      <div className="product-filter">
        <div className="search-filter-components">
          <div className="search-bar">
            <IoIosSearch />
            <input type="text" placeholder="Search" value={txtSearch} onChange={handleInputChange} />
          </div>

          <nav className="navbar-product">
            <Link to="/admin/products" className={`nav-item ${isFood ? 'active' : ''}`} onClick={() => setIsFood(true)}>
              FOOD
            </Link>
            <Link
              to="/admin/products"
              className={`nav-item ${!isFood ? 'active' : ''}`}
              onClick={() => setIsFood(false)}
            >
              DRINK
            </Link>
          </nav>
        </div>

        <div className="filter-container">
          <div className="filter-left">
            <div className="items-text">{products.length} items</div>
            <div className="show-container">
              <span>Show</span>
              <Form.Select
                aria-label="Default select example"
                className="select-box"
                value={limit}
                onChange={handleLimitChange}
              >
                <option value="6">6</option>
                <option value="9">9</option>
                <option value="12">12</option>
                <option value="15">15</option>
                <option value="18">18</option>
              </Form.Select>
            </div>
          </div>
          <div className="filter-right">
            <div className="sort-container">
              <span>Sort By</span>
              <Form.Select
                aria-label="Default select example"
                className="select-box"
                value={showBy}
                onChange={handleShowByChange}
              >
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="rating">Rating</option>
                <option value="discount">Discount</option>
              </Form.Select>
            </div>
          </div>
        </div>
        {loading ? (
          <div className="loading-spinner"></div>
        ) : (
          <>
            {products.length === 0 ? (
              <div className="no-products">
                <p>Không có sản phẩm hợp lệ</p>
              </div>
            ) : (
              <>
                <div className="product-grid">
                  {products.map((product) => (
                    <ProductCardAdmin key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                <div className="pagination">
                  <div className="arrow-button" onClick={handlePrevPage}>
                    <FiArrowLeft className="arrow-paging" />
                  </div>
                  <div className="pages">
                    {Array.from({ length: totalPages }, (_, index) => (
                      <div
                        className={`page ${currentPage === index + 1 ? 'active' : ''}`}
                        key={index}
                        onClick={() => handlePageClick(index + 1)}
                      >
                        {index + 1 < 10 ? `0${index + 1}` : index + 1}
                      </div>
                    ))}
                  </div>
                  <div className="arrow-button" onClick={handleNextPage}>
                    <FiArrowRight className="arrow-paging" />
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminListItem;
