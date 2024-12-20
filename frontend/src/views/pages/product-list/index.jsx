import React, { useState, useEffect } from 'react';
import './index.scss';
import { IMAGES } from '../../../constants/images';
import { BsGrid3X3Gap, BsList } from 'react-icons/bs';
import Form from 'react-bootstrap/Form';
import { IoIosSearch } from 'react-icons/io';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import ProductCardList from '../../../components/product-card-list';
import ProductCardGrid from '../../../components/product-card-grid';
import productAPI from '../../../api/productAPI';
import UploadModal from '../../../components/detect_modal/UploadModal';
import RecommendModal from '../../../components/recommend_modal/RecommendModal';
import categoryAPI from '../../../api/categoryAPI';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import wishlistAPI from '../../../api/wishlistAPI';

const ProductList = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const minPriceParam = searchParams.get('minPrice');
  const maxPriceParam = searchParams.get('maxPrice');
  const hotDealParam = searchParams.get('hotDeal');
  const isFoodParam = searchParams.get('isFood');

  const [viewMode, setViewMode] = useState('grid');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [hotdeals, setHotdeals] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [isFood, setIsFood] = useState(isFoodParam);
  const [txtSearch, setTxtSearch] = useState('');
  const [limit, setLimit] = useState(6);
  const [showBy, setShowBy] = useState('name');
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [isDiscount, setIsDiscount] = useState(false);
  const [categoryId, setCategoryId] = useState(categoryParam);
  const [loading, setLoading] = useState(false);

  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    if (categoryParam) {
      setCategoryId(categoryParam);
    } else {
      setCategoryId(null);
    }

    if (minPriceParam) {
      setMinPrice(Number(minPriceParam));
    } else {
      setMinPrice(null);
    }

    if (maxPriceParam) {
      setMaxPrice(Number(maxPriceParam));
    } else {
      setMaxPrice(null);
    }

    if (hotDealParam) {
      setIsDiscount(true);
    }

    if (isFoodParam) {
      setIsFood(isFoodParam === 'true');
    } else {
      setIsFood(false);
    }
  }, [categoryParam, minPriceParam, maxPriceParam, hotDealParam, isFoodParam]);

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
        searchParams.delete('minPrice');
        searchParams.delete('maxPrice');
        setSearchParams(searchParams);
        break;
      case 'under30':
        setMinPrice(0);
        setMaxPrice(30000);
        searchParams.set('minPrice', 0);
        searchParams.set('maxPrice', 30000);
        setSearchParams(searchParams);
        break;
      case '30to60':
        setMinPrice(30000);
        setMaxPrice(60000);
        searchParams.set('minPrice', 30000);
        searchParams.set('maxPrice', 60000);
        setSearchParams(searchParams);
        break;
      case '60to90':
        setMinPrice(60000);
        setMaxPrice(90000);
        searchParams.set('minPrice', 60000);
        searchParams.set('maxPrice', 90000);
        setSearchParams(searchParams);
        break;
      case '90to120':
        setMinPrice(90000);
        setMaxPrice(120000);
        searchParams.set('minPrice', 90000);
        searchParams.set('maxPrice', 120000);
        setSearchParams(searchParams);
        break;
      case '120to150':
        setMinPrice(120000);
        setMaxPrice(150000);
        searchParams.set('minPrice', 120000);
        searchParams.set('maxPrice', 150000);
        setSearchParams(searchParams);
        break;
      case 'over150':
        setMinPrice(150000);
        setMaxPrice(null);
        searchParams.set('minPrice', 150000);
        searchParams.delete('maxPrice');
        setSearchParams(searchParams);
        break;
      default:
        setMinPrice(null);
        setMaxPrice(null);
        searchParams.delete('minPrice');
        searchParams.delete('maxPrice');
        setSearchParams(searchParams);
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

  const totalNumberOfFood = categories.reduce((total, categorie) => total + categorie.numberOfFood, 0);
  const totalNumberOfHotDeal = hotdeals.reduce((total, hotdeal) => total + hotdeal.numberOfFood, 0);

  const handleAllHotDealClick = (event) => {
    setCurrentPage(1);
    setCategoryId(null);
    searchParams.delete('hotDeal');
    setSearchParams(searchParams);
    setIsDiscount(true);
  };

  const handleAllCategoryClick = (event) => {
    setCurrentPage(1);
    setCategoryId(null);
    setIsDiscount(null);
    searchParams.delete('category');
    setSearchParams(searchParams);
  };

  const handleCategoryClick = (event, categoryId) => {
    setCurrentPage(1);
    setCategoryId(categoryId);
    setIsDiscount(false);
    searchParams.delete('hotDeal');
    searchParams.set('category', categoryId);
    searchParams.set('isFood', isFood);
    setSearchParams(searchParams);
  };

  const handleHotDealClick = (event, hotDealId) => {
    setCurrentPage(1);
    setCategoryId(hotDealId);
    setIsDiscount(true);
    searchParams.delete('category');
    searchParams.set('hotDeal', hotDealId);
    searchParams.set('isFood', isFood);
    setSearchParams(searchParams);
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

  useEffect(() => {
    const initialFavorites = {};
    products.forEach((product) => {
      initialFavorites[product.id] = product.isLike || false; // Sử dụng giá trị ban đầu từ `isLike`
    });
    setFavorites(initialFavorites);
  }, [products]);

  const toggleFavorite = async (productId) => {
    // Cập nhật trạng thái cục bộ ngay lập tức
    setFavorites((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));

    // Gửi yêu cầu đến API
    try {
      await wishlistAPI.setWish(productId);
      console.log('Wishlist updated successfully!');
    } catch (error) {
      console.error('Failed to update wishlist: ', error);

      // Hoàn tác nếu có lỗi
      setFavorites((prev) => ({
        ...prev,
        [productId]: !prev[productId],
      }));
    }
  };
  return (
    <div className="shop-page">
      <div className="sidebar">
        <div className="box">
          <h3>Ưu đãi giảm giá</h3>
          <ul>
            <li onClick={handleAllHotDealClick}>
              <span className={`${hotDealParam === null ? 'hot-deals-item-li-active' : ''}`}>Tất cả</span>
              <span className="count special">{totalNumberOfHotDeal}</span>
            </li>
            {hotdeals.map((hotdeal) => (
              <li key={hotdeal.id} onClick={(event) => handleHotDealClick(event, hotdeal.id)}>
                <span
                  className={`${hotDealParam && hotDealParam === hotdeal.id + '' ? 'hot-deals-item-li-active' : ''}`}
                >
                  {hotdeal.name}
                </span>
                <span className={hotdeal.numberOfFood > 0 ? 'count special' : 'count'}>{hotdeal.numberOfFood}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="box">
          <h3>Phân loại đồ ăn</h3>
          <ul>
            <li onClick={handleAllCategoryClick}>
              <span className={`${categoryParam === null ? 'category-item-li-active' : ''}`}>Tất cả</span>
              <span className="count special">{totalNumberOfFood}</span>
            </li>
            {categories.map((categorie) => (
              <li key={categorie.id} onClick={(event) => handleCategoryClick(event, categorie.id)}>
                <span
                  className={`${categoryParam && categoryParam === categorie.id + '' ? 'category-item-li-active' : ''}`}
                >
                  {categorie.name}
                </span>
                <span className={categorie.numberOfFood > 0 ? 'count special' : 'count'}>{categorie.numberOfFood}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="box">
          <h3>Mức giá</h3>
          <div className="radio-options">
            <label className="radio-label">
              <input type="radio" name="price" value="all" onChange={handlePriceChange} />
              <span className="radio-text">Mọi giá</span>
            </label>

            <label className="radio-label">
              <input type="radio" name="price" value="under30" onChange={handlePriceChange} />
              <span className="radio-text">Dưới 30.000 VND</span>
            </label>

            <label className="radio-label">
              <input type="radio" name="price" value="30to60" onChange={handlePriceChange} />
              <span className="radio-text">Từ 30.000 đến 60.000 VND</span>
            </label>

            <label className="radio-label">
              <input type="radio" name="price" value="60to90" onChange={handlePriceChange} />
              <span className="radio-text">Từ 60.000 đến 90.000 VND</span>
            </label>

            <label className="radio-label">
              <input type="radio" name="price" value="90to120" onChange={handlePriceChange} />
              <span className="radio-text">Từ 90.000 đến 120.000 VND</span>
            </label>

            <label className="radio-label">
              <input type="radio" name="price" value="120to150" onChange={handlePriceChange} />
              <span className="radio-text">Từ 120.000 đến 150.000 VND</span>
            </label>

            <label className="radio-label">
              <input type="radio" name="price" value="over150" onChange={handlePriceChange} />
              <span className="radio-text">Trên 150.000 VND</span>
            </label>
          </div>
        </div>
      </div>
      <div className="product-filter">
        <nav className="navbar-product">
          <Link to="/homepage" className="nav-item">
            TRANG CHỦ
          </Link>
          <Link to="/items?isFood=true" className={`nav-item ${isFoodParam === 'true' ? 'active' : ''}`}>
            ĐỒ ĂN
          </Link>
          <Link to="/items?isFood=false" className={`nav-item ${!(isFoodParam === 'true') ? 'active' : ''}`}>
            ĐỒ UỐNG
          </Link>
          <Link to="/" className="nav-item">
            LIÊN LẠC
          </Link>
        </nav>
        <div className="search-filter-components">
          <div className="search-bar">
            <IoIosSearch />
            <input type="text" placeholder="Nhập vào tên sản phẩm" value={txtSearch} onChange={handleInputChange} />
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
            <div className="items-text">{products.length} sản phẩm</div>
            <div className="show-container">
              <span style={{ width: '80px' }}>Hiển thị</span>
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
              <span style={{ width: '100px' }}>Sắp xếp theo</span>
              <Form.Select
                aria-label="Default select example"
                className="select-box"
                value={showBy}
                onChange={handleShowByChange}
              >
                <option value="name">Tên</option>
                <option value="price">Giá</option>
                <option value="rating">Đánh giá</option>
                <option value="discount">Giảm giá</option>
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
                      <ProductCardGrid
                        key={product.id}
                        product={product}
                        isFavorite={favorites[product.id]}
                        toggleFavorite={() => toggleFavorite(product.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="product-list">
                    {products.map((product) => (
                      <ProductCardList
                        key={product.id}
                        product={product}
                        isFavorite={favorites[product.id]}
                        toggleFavorite={() => toggleFavorite(product.id)}
                      />
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
