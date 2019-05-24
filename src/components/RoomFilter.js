import React from 'react'
import {useContext} from 'react'
import {RoomContext} from '../Context'
import Title from '../components/Title'

// Get all unique values
const getUnique=(items,value)=>{
  // Return an array with new set of unique value.
  // 'value' is the unique value we're looking for in the items
  return [...new Set(items.map(i=>i[value]))]
}

export default function RoomFilter({get_room}) {
  // Use hooks. Better solution than alternatives being used in RoomContainer.js
  const context=useContext(RoomContext)
  const {
    handleChange,
    type,
    capacity,
    price,
    minPrice,
    maxPrice,
    minSize,
    maxSize,
    breakfast,
    pets
  }=context

  // Get a unique room type
  let room_types=getUnique(get_room,'type')
  // Add 'all' into the array
  room_types=['all',...room_types]
  // Map to JSX
  room_types=room_types.map((item,index)=>{
    return <option key={index} value={item}>{item}</option>
  })
  // Get a unique room capacity
  let pax=getUnique(get_room,'capacity')
  pax=pax.map((item,index)=>{
    return <option key={index} value={item}>{item}</option>
  })

  return (
    <section className="filter-container">
      <Title title="search rooms"/>
      <form className="filter-form">
        {/* Room type */}
        <div className="form-group">
          <label htmlFor="type">room type</label>
          <select name="type" id="type" value={type} className="form-control" onChange={handleChange}>{room_types}</select>
        </div>
        {/* Room capacity */}
        <div className="form-group">
          <label htmlFor="capacity">guests</label>
          <select name="capacity" id="capacity" value={capacity} className="form-control" onChange={handleChange}>
            <option value="0">-</option>
            {pax}
          </select>
        </div>
        {/* Room price range */}
        <div className="form-group">
          <label htmlFor="price">room price ${price}</label>
          <input type="range" name="price" min={minPrice} max={maxPrice} id="price" value={price} onChange={handleChange} className="form-control"/>
        </div>
        {/* Room size */}
        <div className="form-group">
          <label htmlFor="size">room size</label>
          <div className="size-inputs">
            <input type="number" className="size-input" name="minSize" id="size" value={minSize} onChange={handleChange}/>
            <input type="number" className="size-input" name="maxSize" id="size" value={maxSize} onChange={handleChange}/>
          </div>
        </div>
        {/* Extras */}
        <div className="form-group">
          <div className="single-extra">
            <input type="checkbox" name="breakfast" id="breakfast" checked={breakfast} onChange={handleChange}/>
            <label htmlFor="breakfast">breakfast</label>
          </div>
          <div className="single-extra">
            <input type="checkbox" name="pets" id="pets" checked={pets} onChange={handleChange}/>
            <label htmlFor="pets">pets</label>
          </div>
        </div>
      </form>
    </section>
  )
}