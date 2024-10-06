import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import { ICONS } from "../../constants/icons";
import { IMAGES } from "../../constants/images";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { IoMail } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { FaGooglePlay } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import "./index.scss";

const Footer = () => {
  return (
    <>
      <div className="cta-container">
        <img
          src={IMAGES.image_bgr_footer}
          alt="Background"
          className="background-image"
        />
        <div className="cta-text-button">
          <h1>
            Bạn đã sẵn sàng để đặt hàng những món ăn đầy hương vị truyền thống
            tại cửa hàng của chúng tôi ?
          </h1>
          <button className="cta-button">
            Hãy đặt hàng ngay <span className="chevron">▶</span>
          </button>
        </div>
      </div>
      <MDBFooter className="text-center text-lg-start text-muted footer">
        <section
          className="d-flex justify-content-center justify-content-lg-between py-4 border-bottom"
          style={{
            paddingLeft: "140px",
            paddingRight: "105px",
          }}
        >
          <div className="me-5 d-none d-lg-block">
            <span>Get connected with us on social networks:</span>
          </div>

          <div>
            <a href="" className="me-4 text-reset">
              <FaFacebook className="icon-footer" />
            </a>
            <a href="" className="me-4 text-reset">
              <FaTwitter className="icon-footer" />
            </a>
            <a href="" className="me-4 text-reset">
              <FaInstagram className="icon-footer" />
            </a>
          </div>
        </section>

        <section className="">
          <MDBContainer className="text-center text-md-start mt-5">
            <MDBRow className="mt-3">
              <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4 logo-footer">
                  <img src={ICONS.logo} className="logo-footer-icon"></img>
                  VN Food
                </h6>
                <p className="pb-3">
                  <IoMdHome className="me-2 icon-footer" />
                  172/3 Nguyen Luong Bang/ Lien Chieu/ Da Nang
                </p>
                <p className="pb-3">
                  <IoMail className="me-3 icon-footer" />
                  4anhemsieunhan@gmail.com
                </p>
                <p className="pb-3">
                  <FaPhoneAlt className="me-3 icon-footer" />+ 01 234 567 88
                </p>
              </MDBCol>

              <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4 col-footer">
                <h6 className="text-uppercase fw-bold mb-4 title-footer">
                  Top category
                </h6>
                <p className="pb-3">
                  <a href="#!" className="text-reset">
                    Các loại bánh đặc sản
                  </a>
                </p>
                <p className="pb-3">
                  <a href="#!" className="text-reset">
                    Các loại bún đặc sản
                  </a>
                </p>
                <p className="pb-3">
                  <a href="#!" className="text-reset">
                    Các loại mỳ đặc sản
                  </a>
                </p>
                <p className="pb-3">
                  <a href="#!" className="text-reset">
                    Các món ăn kèm truyền thống
                  </a>
                </p>
              </MDBCol>

              <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4 col-footer">
                <h6 className="text-uppercase fw-bold mb-4 title-footer">
                  Quick links
                </h6>
                <p className="pb-3">
                  <a href="#!" className="text-reset">
                    Những món ăn phổ biến
                  </a>
                </p>
                <p className="pb-3">
                  <a href="#!" className="text-reset">
                    Giỏ hàng của bạn
                  </a>
                </p>
                <p className="pb-3">
                  <a href="#!" className="text-reset">
                    Đơn hàng của bạn
                  </a>
                </p>
                <p className="pb-3">
                  <a href="#!" className="text-reset">
                    Help
                  </a>
                </p>
              </MDBCol>

              <MDBCol
                md="4"
                lg="3"
                xl="3"
                className="mx-auto mb-md-0 mb-4 col-footer download-app"
              >
                <h6 className="text-uppercase fw-bold mb-4 title-footer">
                  Download app
                </h6>
                <div className="app-links">
                  <div className="google-play">
                    <FaGooglePlay className="icon-download" />
                    <div className="download-content">
                      <span className="get-it">Get it now</span>
                      <span className="app">Google Play</span>
                    </div>
                  </div>
                  <div className="app-store">
                    <FaApple className="icon-download" />
                    <div className="download-content">
                      <span className="get-it">Get it now</span>
                      <span className="app">App Store</span>
                    </div>
                  </div>
                </div>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>

        <div
          className="text-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          © 2024 Copyright:
          <a
            className="text-reset fw-bold"
            href="https://react-bootstrap.netlify.app/"
          >
            VietnameseCusine.com
          </a>
        </div>
      </MDBFooter>
    </>
  );
};

export default Footer;
