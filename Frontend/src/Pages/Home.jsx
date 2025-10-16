import React from 'react'
import Navbar from '../Components/Navbar'
import ImageSlider from '../Components/ImageSlider'
import Categories from '../Components/Categories'
import Recommandations from '../Components/Recommandations'
import Footer from '../Components/Footer'

const Home = () => {
  return (
    <div>
       
        <Categories/>
        <ImageSlider/>
        <Recommandations/>
       
    </div>
  )
}

export default Home