import React,{Component} from 'react'
import {RoomContext} from '../Context'
import Loading from './Loading'
import Room from './Room'
import Title from './Title'

export default class FeaturedRooms extends Component {
    static contextType=RoomContext

    render() {
        // Sample of calling context API
        // let {username,greeting}=this.context
        let {loading,featuredRooms:fRooms}=this.context

        fRooms=fRooms.map(room=>{
            return <Room key={room.id} roomObj={room}/>
        })

        return (
        <section className="featured-rooms">
            <Title title="featured rooms"/>
            <div className="featured-rooms-center">
                {/* {greeting}, from {username} */}
                {loading?<Loading/>:fRooms}
            </div>
        </section>
        )
    }
}