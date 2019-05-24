import React from 'react'
import Hero from '../components/Hero'

export default function Error() {
  return (
    <Hero
      title="404"
      subtitle="page not found"
      btn_label="return home"
      btn_link="/"
    />
  )
}