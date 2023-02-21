
import React from 'react'
import './Home.css'
import About from '../../images/about.png'
import service_icon_01 from '../../images/service-icon-01.png'
import service_icon_02 from '../../images/service-icon-02.png'
import service_icon_03 from '../../images/service-icon-03.png'
import service_icon_04 from '../../images/service-icon-04.png'
import { Container,Row,Col } from 'react-bootstrap'
import whiteTick from '../../images/whiteTick.png'
import mobile from '../../images/mobile1.png'

 

const Home = () => {
  return (
    <div>
     <div id="about"  class="about ">
            <div className="container-fluid">
               <Row d_flex>
                  <Col lg={5}>
                     <div className="about_img">
                        <figure><img src={About} alt="#"/></figure>
                     </div>
                  </Col>
                  <Col lg={7}>
                     <div className="titlepage">
                        <h2>About <span class="blu">Software</span></h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit </p>
                     </div>
                  </Col>
               </Row>
            </div>
         </div>
   
<div id="about-us" class="about-us ">
  <div class="container">
  <Row>
    <Col lg={4} >
    <div class="leftimage">
        <img src={mobile} alt="" width={550}/>
    </div>
    </Col>
    <Col lg={8} align-self-center>
      <div class="services">
        <Row>
          <Col lg={6}>
            <div class="item wow fadeIn" data-wow-duration="1s" data-wow-delay="0.5s">
              <div class="icon">
                <img src={service_icon_01} alt="reporting"/>
              </div>
              <div class="right-text">
                <h4>Data Analysis</h4>
                <p>Lorem ipsum dolor sit amet, ctetur aoi adipiscing eliter</p>
              </div>
            </div>
          </Col>
          <Col lg={6}>
            <div class="item wow fadeIn" data-wow-duration="1s" data-wow-delay="0.7s">
              <div class="icon">
                <img src={service_icon_02} alt=""/>
              </div>
              <div class="right-text">
                <h4>Data Reporting</h4>
                <p>Lorem ipsum dolor sit amet, ctetur aoi adipiscing eliter</p>
              </div>
            </div>
          </Col>
          <Col lg={6}>
            <div class="item wow fadeIn" data-wow-duration="1s" data-wow-delay="0.9s">
              <div class="icon">
                <img src={service_icon_03} alt=""/>
              </div>
              <div class="right-text">
                <h4>Web Analytics</h4>
                <p>Lorem ipsum dolor sit amet, ctetur aoi adipiscing eliter</p>
              </div>
            </div>
          </Col>
          <Col lg={6}>
            <div class="item wow fadeIn" data-wow-duration="1s" data-wow-delay="1.1s">
              <div class="icon">
                <img src={service_icon_04} alt=""/>
              </div>
              <div class="right-text">
                <h4>SEO Suggestions</h4>
                <p>Lorem ipsum dolor sit amet, ctetur aoi adipiscing eliter</p>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Col>
  </Row>
</div>
</div>












<div id="contact" class="contact-us section">
        <div class="container">
          <Row>
            <Col lg={6} align-self-center wow fadeInLeft data-wow-duration="0.5s" data-wow-delay="0.25s">
              <div class="section-heading">
                <h2>Feel Free To Send Us a Message About Your Website Needs</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doer ket eismod tempor incididunt ut labore et dolores</p>
                <div class="phone-info">
                  <h4>For any enquiry, Call Us: <span><i class="fa fa-phone"></i> <a href="#">010-020-0340</a></span></h4>
                </div>
              </div>
            </Col>
            <Col lg={6} wow fadeInRight data-wow-duration="0.5s" data-wow-delay="0.25s">
              <form id="contact" action="" method="post">
                <Row>
                  <Col lg={6}>
                    <fieldset>
                      <input type="name" name="name" id="name" placeholder="Name" autocomplete="on" required/>
                    </fieldset>
                  </Col>
                  <Col lg={6}>
                    <fieldset>
                      <input type="surname" name="surname" id="surname" placeholder="Surname" autocomplete="on" required/>
                    </fieldset>
                  </Col>
                  <Col lg={12}>
                    <fieldset>
                      <input type="text" name="email" id="email" pattern="[^ @]*@[^ @]*" placeholder="Your Email" required=""/>
                    </fieldset>
                  </Col>
                  <Col lg={12}>
                    <fieldset>
                      <textarea name="message" type="text" class="form-control" id="message" placeholder="Message" required=""></textarea>  
                    </fieldset>
                  </Col>
                  <Col lg={12}>
                    <fieldset>
                      <button type="submit" id="form-submit" class="main-button ">Send Message</button>
                    </fieldset>
                  </Col>
                </Row>
                <div class="contact-dec">
                  <img src="assets/images/contact-decoration.png" alt=""/>
                </div>
              </form>
            </Col>
          </Row>
        </div>
      </div>
      
    </div>
  )
}

export default Home