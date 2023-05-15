import LikedList from '@/components/pageCompnents/LikedList'
import Head from 'next/head'
import React from 'react'

type Props = {}

const likedPlaces = (props: Props) => {
  return (
    <>
     <Head>
        <title>Travel Buddy</title>
        <meta name="description" content="travel buddy view all liked places" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
      </Head>
    <LikedList/>
    
    </>
  )
}

export default likedPlaces