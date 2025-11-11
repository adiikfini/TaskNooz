import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'
import Culture from './components/Culture'
import AboutHero from './components/AboutHero'
import VisionMission from './components/VisionMission'
import Team from './components/Team'

function About() {
  return (
    <div>
        <Navbar/>
        <div className='pt-20'>
            <AboutHero />
            <Culture />
            <VisionMission />
            <Team />
            <Footer />
        </div>
    </div>
  )
}

export default About