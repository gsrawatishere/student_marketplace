import React from 'react'
import Navbar from '../Components/Navbar'
import ImageSlider from '../Components/ImageSlider'
import Categories from '../Components/Categories'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <Categories/>
        <ImageSlider/>
    </div>
  )
}

export default Home