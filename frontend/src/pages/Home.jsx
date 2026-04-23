import React from 'react'
import Navbar from '../components/Navbar'
import ImageSlider from '../components/ImageSlider'
import Categories from '../components/Categories'
import Recommandations from '../components/Recommandations'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div >
       
        <Categories/>
        <ImageSlider/>
        <Recommandations/>
       
    </div>
  )
}

export default Home