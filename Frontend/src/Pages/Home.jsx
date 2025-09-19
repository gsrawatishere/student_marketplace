import React from 'react'
import Navbar from '../Components/Navbar'
import ImageSlider from '../Components/ImageSlider'
import Categories from '../Components/Categories'
import Recommandations from '../Components/Recommandations'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <Categories/>
        <ImageSlider/>
        <Recommandations/>
    </div>
  )
}

export default Home