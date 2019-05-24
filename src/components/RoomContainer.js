import React from 'react'
import {withRoomConsumer} from '../Context'
// import {RoomConsumer} from '../Context' // Alternatives method
import Loading from './Loading'
import RoomFilter from './RoomFilter'
import RoomList from './RoomList'

function RoomContainer({context}){
  const {loading,sortedRooms,rooms}=context
  if(loading){return <Loading/>}
  return (
    <>
      <RoomFilter get_room={rooms}/>
      <RoomList get_room={sortedRooms}/>
    </>
  )
}

export default withRoomConsumer(RoomContainer)

// Alternatives method
// export default function RoomContainer() {
//   return (    
//     <RoomConsumer>
//       {
//         value=>{
//           const {loading,sortedRooms,rooms}=value
//           // Show loading component
//           if(loading){return <Loading/>}
//           return (
//             <>
//               <RoomFilter room={rooms}/>
//               <RoomList room={sortedRooms}/>
//             </>
//           )
//         }
//       }
//     </RoomConsumer>
//   )
// }