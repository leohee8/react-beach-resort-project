import React from 'react'
import {Link} from 'react-router-dom'
import Banner from './Banner'

export default function Hero({children,hero_class,title,subtitle,btn_label,btn_link}) {
  return (
    <header className={hero_class}>
      {children}
      <Banner title={title} subtitle={subtitle}>
        <Link to={btn_link} className="btn-primary">{btn_label}</Link>
      </Banner>
    </header>
  )
}

// Default param for Hero function
Hero.defaultProps={
    hero_class:'defaultHero',
    btn_link:'/'
}