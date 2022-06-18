import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import Faq from "../hero/Faq";
import HowToStart from "../hero/HowToStart";
import OurTeam from "../hero/OurTeam";
import Subscribe from "../hero/Subscribe";
import { getSites } from "../../../functions/site";

const About_Us = () => {
  const [sites, setSites] = useState([]);

  const loadSites = () => {
    getSites().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setSites(data);
      }
    });
  };

  useEffect(() => {
    loadSites();
  }, []);

  return (
    <>
      <Header />
      <div class="page-area">
            <div class="breadcumb-overlay"></div>
            <div class="container">
                <div class="row">
                    <div class="col-md-12 col-sm-12 col-xs-12">
                        <div class="breadcrumb text-center">
                            <div class="section-headline">
                                <h2 style={{color: "#fff"}}>About Us</h2>
                            </div>
                            <ul>
                                <li class="home-bread">Home</li>
                                <li>About us</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="about-area bg-color2 area-padding">
            <div class="container">
                <div class="row">
                    <div class="col-md-6 col-sm-6 col-xs-12">
                        <div class="about-image">
                            <img src="img/about/ab.jpg" alt=""/>
                        </div>
            </div>
            {sites.map((s, i) => (
              <div class="col-md-6 col-sm-6 col-xs-12">
                <div class="about-content">
                    <h3 style={{color:"#000"}}>The most prestigious Investments company in worldwide.</h3>
                    <h6 style={{color:"#000"}} class="hidden-sm">{s.about}</h6>
                </div>
              </div>
              ))}
                </div>
            </div>
      </div>
      <HowToStart />
      <Footer />
    </>
  );
};

export default About_Us;
