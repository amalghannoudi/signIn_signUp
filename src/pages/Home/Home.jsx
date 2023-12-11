import React, {useState,useEffect} from 'react'
import './Home.css'
import About from '../../images/about.png'
import Navbar from '../Navbar/Navbar';
import service_icon_01 from '../../images/service-icon-01.png'
import service_icon_02 from '../../images/service-icon-02.png'
import service_icon_03 from '../../images/service-icon-03.png'
import service_icon_04 from '../../images/service-icon-04.png'
import { Container,Row,Col } from 'react-bootstrap'
import { pack } from '../../js/pack'
import whiteTick from '../../images/whiteTick.png'
import mobile from '../../images/mobile1.png'
import Footer from '../Footer/Footer';
import axios from "axios"; 
import { useNavigate } from "react-router-dom";
import { getPacks } from '../../services/packService';
const Home = () => {

  const navigate=useNavigate();

  const [packs, setPacks] = useState(null);
 
 
  const TosignUp=()=>{
    navigate("/signup");
   }
 
  useEffect(() => {
    getPacks()
      .then((packs) => {
        console.log('data', packs);
        setPacks(packs);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    console.log('pack', packs);
  }, [packs]);
  
  if (!packs) {
    return <p>Loading Pack information...</p>;
  }
  return (
    <div>
      <Navbar />
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
                     <div class="section-header text-center">
                            <h2>A propos </h2>
                        </div>
                        <p>
                        La topographie est la science qui permet la mesure puis la représentation sur un plan ou une carte des formes et détails visibles sur le terrain
             . Son objectif est de déterminer la position et l'altitude de n'importe quel point situé dans une zone donnée, 
                          qu'elle soit de la taille d'un continent,
                         d'un pays, d'un champ ou d'un corps de rue.
                         <br></br> A l'aide de notre site web ,vous pouvez profiter de nos divers services topographiques d'une maniére facile et efficace.<br></br> Pour bénéficier de plus d'options vous pouvez choisir le pack qui vous convient à un prix raisonnable </p>
                     </div>
                  </Col>
               </Row>
            </div>
         </div>
         <div className="titlepage">
         <div class="section-header text-center">

                        <h2>Version Mobile</h2>
                        </div>
                     </div>
<div id="about-us" class="about-us ">

  <Row>

    <Col lg={4} >
    <div class="leftimage">
        <img src={mobile} alt="" />
    </div>
    </Col>
    <Col lg={8} align-self-center>
      <div class="services">
        <Row>
          <Col lg={6}>
            <div class="item wow fadeIn" data-wow-duration="1s" data-wow-delay="0.5s">
              <div class="photo">
                <img src={service_icon_01} alt="reporting"/>
              </div>
              <div class="right-text">
                <h4>Convertir KML en TXT</h4>
                <p>Convertir un fichier KML en un fichier TXT pour récuperer les coordonnées d'un emplacement choisi</p>
              </div>
            </div>
          </Col>
          <Col lg={6}>
            <div class="item wow fadeIn" data-wow-duration="1s" data-wow-delay="0.7s">
              <div class="photo">
                <img src={service_icon_02} alt=""/>
              </div>
              <div class="right-text">
                <h4>Convertir KMZ en TXT</h4>
                <p>Convertir un fichier KMZ en un fichier TXT pour récuperer les coordonnées</p>
              </div>
            </div>
          </Col>
          <Col lg={6}>
            <div class="item wow fadeIn" data-wow-duration="1s" data-wow-delay="0.9s">
              <div class="photo">
                <img src={service_icon_03} alt=""/>
              </div>
              <div class="right-text">
                <h4>Convertir TXT en KMZ</h4>
                <p>Importer un fichier TXT pour le convertir en KMZ vue sur Map</p>
              </div>
            </div>
          </Col>
          <Col lg={6}>
            <div class="item wow fadeIn" data-wow-duration="1s" data-wow-delay="1.1s">
              <div class="photo">
                <img src={service_icon_04} alt=""/>
              </div>
              <div class="right-text">
                <h4>Manipuler une Map</h4>
                <p>Inserer des points directement sur Map pour récuperer leurs coordonnées</p>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Col>
  </Row>
</div>




<div id="pack" className="plans-container">
       
        <div className="titlepage">
        <div class="section-header text-center">

            <h2> Nos Packs</h2>
            </div>
        </div>       
        {/* plans card */}
        <div className="plans">
            {packs.map((plan, i)=>(
                <div className="plan" key={plan.id}>
                    <svg
          width="28"
          height="24"
          viewBox="0 0 28 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M3.11111 18L0 1.5L8.55556 9L14 0L19.4444 9L28 1.5L24.8889 18H3.11111ZM24.8889 22.5C24.8889 23.4 24.2667 24 23.3333 24H4.66667C3.73333 24 3.11111 23.4 3.11111 22.5V21H24.8889V22.5Z" />
        </svg>
                    <span>{plan.titre}</span>
                    <span>{plan.montant}DT</span>
                    <div className="information">
        {plan.information.split('/').map((item, index) => (
          <React.Fragment key={index}>
            {item}
            <br />
          </React.Fragment>
        ))}
      </div>
                   

                    <button className="btn" onClick={TosignUp}>Join now</button>
                </div>
            ))}
        </div>
    </div>
    
























 
  


      <Footer />

    </div>
  )
}

export default Home
