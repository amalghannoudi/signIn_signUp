import React from 'react'
import { Container,Row,Col } from 'react-bootstrap'
import './Footer.css'
import fb from '../../images/fb.png'
import twitter from '../../images/twitter.png'
import gmail from '../../images/mail.png'
import linkedin from '../../images/linkedin.png'

const Footer = () => {
  return (
    <div>
       <section className="info_section ">
    <div className="container ">
      <Row  mb={3} pb={4}>
        <Col md={3} >
            <div className='info_logo'>
          <div className="logo-box">
            <img src="images/logo-white.png" alt=""/>
            <span>
              Transportz
            </span>
         
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sedconsectetur
          </p>
          </div>
          <div className="info_social">
            <div>
              <a href="">
                <img src={fb} alt=""/>
              </a>
            </div>
            <div>
              <a href="">
                <img src={twitter} alt=""/>
              </a>
            </div>
            <div>
              <a href="">
                <img src={gmail} alt=""/>
              </a>
            </div>
            <div>
              <a href="">
                <img src={linkedin} alt=""/>
              </a>
            </div>
          </div>
          </div>
        </Col>
        <Col md={3} >
           
          <h5>
            Address
          </h5>
          <div className='info_address'>
          <p>
            Healing Center, 176 W Street name,
            New York, NY 10014, US
          </p>
          <p>
            (+71) 8522369417
          </p>
          <p>
            (+71) 8522369417
          </p>
          <p>
            <a href="">
              transportz@gmail.com
            </a>
          </p>
          </div>
        </Col>
        <Col md={3} >
                <div className='info_links'>
          <div className="info_nav ">
            <nav className="">
              <ul>
                <h5>
                  Links
                </h5>
                <li>
                  <a href="index.html"> Home</a>
                </li>
                <li>
                  <a href="about.html">About</a>
                </li>
                <li>
                  <a href="service.html"> Service</a>
                </li>
                <li>
                  <a href="shop.html"> Shop</a>
                </li>
                <li>
                  <a href="company.html"> Company</a>
                </li>
                <li>
                  <a href="contact.html">Contact us</a>
                </li>

              </ul>
            </nav>
          </div>
          </div>
        </Col>
        <Col md={3}>
            <div className='info_news'>
          <h5>
            Newsletter
          </h5>
          <form action="">
            <div>
              <input type="text" placeholder="Your Name"/>
            </div>
            <div>
              <input type="email" placeholder="Email"/>
            </div>
            <div className="d-flex justify-content-end">
              <button type="submit">
                Subscribe
              </button>
            </div>
          </form>
          </div>
        </Col>
      </Row>


    </div>
  </section>
    </div>
  )
}

export default Footer
