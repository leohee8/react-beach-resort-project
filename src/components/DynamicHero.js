import React from 'react'
import {Link} from 'react-router-dom'
import Banner from './Banner'
import styled from 'styled-components'
import defaultImg from '../images/room-1.jpeg'

const Hero=styled.header`
    min-height: 60vh;
    background: url(${props=>props.img?props.img:defaultImg}) center/cover no-repeat;
    display: flex;
    align-items: center;
    justify-content: center; 
`

export default function DynamicHero({img,title,subtitle,btn_label,btn_link}){
    return (
        <Hero img={img}>
            <Banner title={`${title} room`} subtitle={subtitle}>
                <Link to={btn_link} className="btn-primary">{btn_label}</Link>
            </Banner>
        </Hero>
    )
}