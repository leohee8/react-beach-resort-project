import React from 'react'
import Room from './Room'

export default function RoomList({get_room}) {
  // No rooms matched on search
  if(get_room.length===0){
    return (
      <div className="empty-search">
        <h3>Opps! There's no rooms matched your search parameters</h3>
      </div>
    )
  }
  // Return all rooms matched
  return (
    <section className="roomslist">
      <div className="roomslist-center">
        {get_room.map(item=>{
          return (
            <Room key={item.id} roomObj={item}/>
          )
        })}
      </div>
    </section>
  )
}