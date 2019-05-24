import React,{Component} from 'react'
// import data from './data'
import Client from './Contenful'

// Create react context
const RoomContext=React.createContext()

class RoomProvider extends Component {
    // Sample state
    // state={
    //     greeting:'Hello!',
    //     username:'Leo Hee Fook Yew'
    // }

    // Default state
    state={
        rooms:[],
        sortedRooms:[],
        featuredRooms:[],
        loading:true,
        type:'all',
        capacity:0,
        price:0,
        minPrice:0,
        maxPrice:0,
        minSize:0,
        maxSize:0,
        breakfast:false,
        pets:false
    }

    // Get Data
    getData=async()=>{
        try {
            let response=await Client.getEntries({
                content_type:"beachResort", // Content Model ID on contentful
                order:"fields.price" // Add '-' for reverse order
            })
            let rooms=this.formatData(response.items) // Get remote data from contentful
            let featuredRooms=rooms.filter(fRoom=>fRoom.featured===true)
            let maxPrice=Math.max(...rooms.map(item=>item.price))
            let maxSize=Math.max(...rooms.map(item=>item.size))
            
            this.setState({
                rooms, // (rooms:rooms) ES6 simplifed
                featuredRooms,
                sortedRooms:rooms,
                loading:false,
                price:maxPrice,
                maxPrice,
                maxSize
            })
            // console.log(rooms)
        } catch (error) {
            console.log(error)            
        }
    }

    // Get data from local data.js
    componentDidMount(){
        this.getData()   
    }

    formatData(items){
        let tmpItems=items.map(item=>{
            let id=item.sys.id
            let images=item.fields.images.map(img=>img.fields.file.url)
            // Construct the object "room" {everything in fields, images:images (can be written single 'images' in ES6), id}
            let room={id,...item.fields,images}
            return room
        })
        return tmpItems
    }

    getRoom=(slug)=>{
        let tmpRooms=[...this.state.rooms]
        const thisRoom=tmpRooms.find(room=>room.slug===slug)
        return thisRoom
    }

    // Event handle
    handleChange=event=>{
        // const type=event.target.type
        // const name=event.target.name
        // const value=event.target.value
        // console.log(`User clicked on ${type}, the name is ${name} and the value is ${value}`);
        
        const target=event.target
        // Check is checked for a checkbox, else get it's value
        const value=target.type==='checkbox'?target.checked:target.value
        const name=event.target.name
        // Update the state
        this.setState({
            [name]:value // Update the clicked target name with target value. E.g: [type]:double, [capacity]:2
        },this.filterRooms) // Call filter room function
    }

    // Filter rooms
    filterRooms=()=>{
        // Constructor
        let{
            rooms,
            type,
            capacity,
            price,
            minSize,
            maxSize,
            breakfast,
            pets
        }=this.state
        // Get all from rooms into filtered rooms variables
        let filteredRooms=[...rooms]
        // Transform value of capacity to integer
        capacity=parseInt(capacity)
        // Transform value of price to integer
        price=parseInt(price)
        // Transform value of sizes to integer
        minSize=parseInt(minSize)
        maxSize=parseInt(maxSize)

        // Filter if only type is not 'all'
        if(type!=='all'){
            filteredRooms=filteredRooms.filter(room=>room.type===type)
        }
        // Filter if capacity is not '-'
        if(capacity!==0){
            filteredRooms=filteredRooms.filter(room=>room.capacity===capacity)
        }
        // Filter by price
        filteredRooms=filteredRooms.filter(room=>room.price<=price)
        // Filter by room size
        filteredRooms=filteredRooms.filter(room=>room.size>=minSize && room.size<=maxSize)
        // Filter by breakfast
        if(breakfast){
            filteredRooms=filteredRooms.filter(room=>room.breakfast===true)
        }
        // Filter by pets allowed
        if(pets){
            filteredRooms=filteredRooms.filter(room=>room.pets===true)
        }

        // Update the state
        this.setState({
            sortedRooms:filteredRooms,
            capacity,
            price,
            minSize,
            maxSize,
            breakfast,
            pets
        })
    }

    render() {
        return (    
            // Passing single value: <RoomContext.Provider value={'hello!'}/>
            <RoomContext.Provider
                value={{
                    ...this.state,
                    getRoom:this.getRoom,
                    handleChange:this.handleChange
                }}
            >
                {this.props.children}
            </RoomContext.Provider>
        )
    }
}

// Create react consumer
const RoomConsumer=RoomContext.Consumer

// Export provider, consumer and context
export {RoomProvider,RoomConsumer,RoomContext}

// Reusable consumer component
export function withRoomConsumer(Component){
    return function ConsumerWrapper(props){
        return (
            <RoomConsumer>
                {value=><Component {...props} context={value}/>}
            </RoomConsumer>
        )
    }
}