import React from 'react'
import Hero from '../components/Hero'
import Services from '../components/Services';
import FeaturedRooms from '../components/FeaturedRooms';

export default function Home() {
  return (
    <>
    {/* // Render default hero banner */}
    <Hero
      title="luxurious rooms"
      subtitle="deluxe rooms starting at $299"
      btn_label="our rooms"
      btn_link="/rooms"
    />
    <Services/>
    <FeaturedRooms/>
    </>
  )
}