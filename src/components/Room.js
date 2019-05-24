import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import defaultImg from '../images/default.jpg'

export default function Room({roomObj}) {
  const {name,slug,images,price} = roomObj
  
  return (
    <article className="room">
      <div className="img-container">
        <img src={images[0] || defaultImg} alt="Single Room"/>
        <div className="price-top">
          <h6>${price}</h6>
          per night
        </div>
        <Link to={`/rooms/${slug}`} className="btn-primary room-link">features</Link>
      </div>
      <p className="room-info">{name}</p>
    </article>
  )
}

// Check prop types
Room.propTypes={
  roomObj:PropTypes.shape({
    name:PropTypes.string.isRequired,
    slug:PropTypes.string.isRequired,
    images:PropTypes.arrayOf(PropTypes.string).isRequired,
    price:PropTypes.number.isRequired
  })
}