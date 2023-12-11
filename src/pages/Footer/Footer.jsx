import React from 'react'
import { Container,Row,Col } from 'react-bootstrap'
import './Footer.css'
import fb from '../../images/fb.png'
import twitter from '../../images/twitter.png'
import gmail from '../../images/mail.png'
import linkedin from '../../images/linkedin.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faLinkedin, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <div>
       <section class="info_section layout_padding">
      <div class="container5">
        <div class="row">
          <div class="col-md-4">
            <div class="info-logo">
              <h2>
                GEO TOPO
              </h2>
              <p>
              Découvrez le monde sous un nouvel angle avec notre site de topographie, 
              où vous pouvez convertir vos fichiers, cartographier les détails du terrain et
               comprendre les dimensions et
               les caractéristiques de notre environnement géographique
              
              </p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="info-nav">
              <h4>
                Navigation
              </h4>
              <ul>
                <li>
                  <a href="/">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/#about">
                    A propos
                  </a>
                </li>
                <li>
                  <a href="/#about-us">
                    Mobile
                  </a>
                </li>
                <li>
                  <a href="/#pack">
                    Packs
                  </a>
                </li>
                <li>
                    <a href="/signin">
                      Se connecter
                    </a>
                </li>
                
              </ul>
            </div>
          </div>
          
            
          <div class="col-md-4">
            <div class="contact">
              <h4>
                Nous contacter
              </h4>
              <ul>
                <li>
                 <p>Email : WeActInfo@gmail.com</p>
                </li>
                <li>
                 <p>Phone : 54 312 461</p>
                </li>
                <li>
                 <p>Adresse : Rue du Palestine, Denden, Manouba </p>
                </li>
               
              </ul>
              <div className="social-icons-container">
      <FontAwesomeIcon icon={faFacebook} size="2x" className="social-icon" />
      <FontAwesomeIcon icon={faLinkedin} size="2x" className="social-icon" />
      <FontAwesomeIcon icon={faInstagram} size="2x" className="social-icon" />
      <FontAwesomeIcon icon={faTwitter} size="2x" className="social-icon" />
    </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}

export default Footer