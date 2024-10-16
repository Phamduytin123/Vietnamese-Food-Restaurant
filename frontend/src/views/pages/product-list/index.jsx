import React from 'react';
import { useState } from 'react';
import './index.scss';
import { IMAGES } from '../../../constants/images';
import { ICONS } from '../../../constants/icons';
import { BsGrid3X3Gap } from 'react-icons/bs';
import { BsList } from 'react-icons/bs';
import Form from 'react-bootstrap/Form';
import { IoIosSearch } from 'react-icons/io';
import { FiArrowRight } from 'react-icons/fi';
import { FiArrowLeft } from 'react-icons/fi';
import ProductCardList from '../../../components/product-card-list';
import ProductCardGrid from '../../../components/product-card-grid';
import productAPI from '../../../api/productAPI';
import UploadModal from '../../../components/detect_modal/UploadModal';
import RecommendModal from '../../../components/recommend_modal/RecommendModal';
import categoryAPI from '../../../api/categoryAPI';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { set } from 'lodash';

const ProductList = () => {
  const location = useLocation();
  const [viewMode, setViewMode] = useState('grid');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [hotdeals, setHotdeals] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [isFood, setIsFood] = useState(true);
  const [txtSearch, setTxtSearch] = useState('');
  const [limit, setLimit] = useState(6);
  const [showBy, setShowBy] = useState('name');
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [isDiscount, setIsDiscount] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setTxtSearch('');
  }, [location]);
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
  const handlePriceChange = (event) => {
    const value = event.target.value;
    switch (value) {
      case 'all':
        setMinPrice(null);
        setMaxPrice(null);
        break;
      case 'under30':
        setMinPrice(0);
        setMaxPrice(30);
        break;
      case '30to60':
        setMinPrice(30);
        setMaxPrice(60);
        break;
      case '60to90':
        setMinPrice(60);
        setMaxPrice(90);
        break;
      case '90to120':
        setMinPrice(90);
        setMaxPrice(120);
        break;
      case '120to150':
        setMinPrice(120);
        setMaxPrice(150);
        break;
      case 'over150':
        setMinPrice(150);
        setMaxPrice(null);
        break;
      default:
        setMinPrice(null);
        setMaxPrice(null);
    }
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
  const handleCategoryClick = (event, categoryId) => {
    setCurrentPage(1);
    setCategoryId(categoryId);
    setIsDiscount(false);
  };

  const handleHotDealClick = (event, hotDealId) => {
    setCurrentPage(1);
    setCategoryId(hotDealId);
    setIsDiscount(true);
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const productList = await productAPI.getListItems(
        currentPage,
        limit,
        minPrice,
        maxPrice,
        txtSearch,
        isFood,
        showBy,
        isDiscount,
        categoryId,
      );
      setProducts(productList.data.items);
      setTotalPages(productList.data.totalPages);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const categories = await categoryAPI.getListCategories(isFood);
      setCategories(categories.data.categories.categories);
      setHotdeals(categories.data.hotDeals.hotDeals);
      console.log('Categories:', categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [isFood, txtSearch, limit, showBy, currentPage, minPrice, maxPrice, isDiscount, categoryId]);

  return (
    <div className="shop-page">
      <div className="sidebar">
        <div className="box">
          <h3>Hot Deals</h3>
          <ul>
            {categories.map((categorie) => (
              <li onClick={(event) => handleCategoryClick(event, categorie.id)}>
                {categorie.name}{' '}
                <span className={categorie.numberOfFood > 0 ? 'count special' : 'count'}>{categorie.numberOfFood}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="box">
          <h3>Category</h3>
          <ul>
            {hotdeals.map((hotdeal) => (
              <li key={hotdeal.id} onClick={(event) => handleHotDealClick(event, hotdeal.id)}>
                {hotdeal.name}
                <span className={hotdeal.numberOfFood > 0 ? 'count special' : 'count'}>{hotdeal.numberOfFood}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="box">
          <h3>Price Range</h3>
          <div className="radio-options">
            <label className="radio-label">
              <input type="radio" name="price" value="all" onChange={handlePriceChange} />
              <span className="radio-text">All Price</span>
            </label>

            <label className="radio-label">
              <input type="radio" name="price" value="under30" onChange={handlePriceChange} />
              <span className="radio-text">Under 30.000 VND</span>
            </label>

            <label className="radio-label">
              <input type="radio" name="price" value="30to60" onChange={handlePriceChange} />
              <span className="radio-text">30.000 to 60.000 VND</span>
            </label>

            <label className="radio-label">
              <input type="radio" name="price" value="60to90" onChange={handlePriceChange} />
              <span className="radio-text">60.000 to 90.000 VND</span>
            </label>

            <label className="radio-label">
              <input type="radio" name="price" value="90to120" onChange={handlePriceChange} />
              <span className="radio-text">90.000 to 120.000 VND</span>
            </label>

            <label className="radio-label">
              <input type="radio" name="price" value="120to150" onChange={handlePriceChange} />
              <span className="radio-text">120.000 to 150.000 VND</span>
            </label>

            <label className="radio-label">
              <input type="radio" name="price" value="over150" onChange={handlePriceChange} />
              <span className="radio-text">Over 150.000 VND</span>
            </label>
          </div>
        </div>
      </div>
      <div className="product-filter">
        <nav className="navbar-product">
          <Link to="/" className="nav-item">
            HOME
          </Link>
          <Link to="/items" className={`nav-item ${isFood ? 'active' : ''}`} onClick={() => setIsFood(true)}>
            FOOD
          </Link>
          <Link to="/items" className={`nav-item ${!isFood ? 'active' : ''}`} onClick={() => setIsFood(false)}>
            DRINK
          </Link>
          <Link to="/" className="nav-item">
            CONTACT
          </Link>
        </nav>
        <div className="search-filter-components">
          <div className="search-bar">
            <IoIosSearch />
            <input type="text" placeholder="Search" value={txtSearch} onChange={handleInputChange} />
          </div>
          <div className="option-button">
            <img src={ICONS.camera} alt="Camera" />
            <span>Tìm kiếm bằng hình ảnh</span>
          </div>
          <div className="option-button">
            <img src={ICONS.lightbulb} alt="Lightbulb" />
            <span>Gợi ý đồ ăn</span>
          </div>
          <UploadModal />
          <RecommendModal />
        </div>
        <div className="product-banner-container">
          <div className="content">
            <h1>Đồ ăn truyền thống Việt Nam</h1>
            <p>Mang đậm bản sắc dân tộc</p>
          </div>
          <div className="image-container">
            <img src={IMAGES.product_banner} alt="Traditional Vietnamese Food" />
          </div>
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
            <div className="switches">
              <BsGrid3X3Gap onClick={() => setViewMode('grid')} className={viewMode === 'grid' ? 'active' : ''} />
              <BsList onClick={() => setViewMode('list')} className={viewMode === 'list' ? 'active' : ''} />
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
                {viewMode === 'grid' ? (
                  <div className="product-grid">
                    {products.map((product) => (
                      <ProductCardGrid key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="product-list">
                    {products.map((product) => (
                      <ProductCardList key={product.id} product={product} />
                    ))}
                  </div>
                )}

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

export default ProductList;
