import React from 'react';
import '../../App.css';
import IntroSection from '../IntroSection';
import Cards from "../Cards";
import Footer from "../Footer";

function Home() {
  return (
    <>
      <IntroSection />
      <Cards />
      <Footer />
    </>
  );
}

export default Home;