import Image from 'next/image'
import React from 'react'
import styles from './Hero.module.css'

import logo from '../../../public/images/roundlogo.png'
type Props = {}

const Hero = (props: Props) => {
  return (
    <div className={styles.box}>
       <Image  src={logo} alt='logo' className={styles.logo}></Image>
       <div className={styles.content}>
<h1 className={styles.header}>Welcome to Travel Buddy!</h1>
<p className={styles.peragraph}>We are a innovative trip planning company that uses cutting-edge software to make it easy for travelers to plan and organize their trips. We pride ourselves on providing a seamless travel planning experience, and our software makes it easy to keep track of all your reservations, tickets, and itineraries in one place. So you can focus on the fun part of traveling, enjoying your time and creating memories.If you&apos;re ready to start planning your dream vacation, look no further than Travel Buddy. 
Our software is user-friendly, easy to navigate and will help you plan the perfect trip.</p>
<p className={styles.bottom_text}>Whether you&apos;re looking for a romantic getaway, a family vacation, or an adventure-filled trip
our software will help you to find the perfect options for you.</p>

</div>
    </div>
  )
}

export default Hero