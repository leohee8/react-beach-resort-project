import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import DynamicHero from '../components/DynamicHero'
import {RoomContext} from '../Context'

export default class SingleRoom extends Component {
  // Access to props passing by the router
  // The output should be same with componentDidMount()
  constructor(props){
    super(props)  
    // console.log(this.props)
    this.state={
      slug:this.props.match.params.slug
    }
  }
  
  // componentDidMount(){}

  // Access to context. First, setup the context type
  static contextType=RoomContext

  render() {
    const {getRoom}=this.context
    const this_room=getRoom(this.state.slug)
    // console.log(this_room)

    if(!this_room){
      return (
        <div className="error">
          <h3>Opps! No such room could be found</h3>
          <Link to="/rooms" className="btn-primary">see other rooms</Link>
        </div>
      )
    }

    // Construct the data
    const {
      name,
      excerpt,
      description,
      capacity,
      size,
      price,
      extras,
      breakfast,
      pets,
      images
    }=this_room

    // Get the first image to become main image, and the rest
    const [CoverImage,...OtherImages]=images

    return (
      <>
        <DynamicHero
          img={CoverImage}
          title={name}
          subtitle={excerpt}
          btn_label="back to rooms"
          btn_link="/rooms"
        />
        <section className="single-room">
          <div className="single-room-images">
            {OtherImages.map((item,index)=>{return <img key={index} src={item} alt={name}/>})}
          </div>
          <div className="single-room-info">
            <article className="desc">
              <h3>details</h3>
              <p>{description}</p>
            </article>
            <article className="info">
              <h3>info</h3>
              <h6>price: ${price}</h6>
              <h6>size: ${size} sqft</h6>
              <h6>max capacity: {capacity>1?`${capacity} people`:`${capacity} person`}</h6>
              <h6>{pets?'':'no'} pets allowed</h6>
              <h6>{breakfast && 'free breakfast included'}</h6>
            </article>
          </div>
        </section>
        <section className="room-extras">
          <h6>extras</h6>
          <ul className="extras">
            {extras.map((item,index)=>{return <li key={index}>- {item}</li>})}
          </ul>
        </section>
      </>
    )
  }
}
