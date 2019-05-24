import React from 'react'
import Hero from '../components/Hero'
import RoomContainer from '../components/RoomContainer'

export default function Rooms() {
  return (
    <>
      <Hero
        hero_class="roomsHero"
        title="our rooms"
        btn_label="return home"
        btn_link="/"
      />
      <RoomContainer/>
    </>
  )
}