import { IPlace } from '@/dummyData'
import { Box, Card, CardContent, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'



 type Props = { 
    listItem?:IPlace,
}

const HotelCard = (props: Props) => {
  const{query}=useRouter()
    
  return (
    <>
    
   {props.listItem? <Card sx={{width:'100%'}}     >
 
       <Box sx={{margin:'20px 0',borderRadius:0 , fontFamily: "Heebo, sans-serif",display:'flex',padding:'1% 1%',justifyContent:'space-evenly',alignItems:'center'}}>
        <Image style={{objectFit:"cover",borderRadius:'10px'}} width={100} height={100}  src={props.listItem?.photo ? props.listItem.photo.images.small.url:'/images/placeholder.png'} alt={""}/>
        <CardContent sx={{margin: '3%', marginRight:'0',padding:'0', paddingBottom:'0 !important'}}>
            <Typography variant='h5' fontSize={"1rem"} fontWeight="bold">{props.listItem.name} </Typography>
           {props.listItem.address&& <p className={"styles.address"}><Image alt='pin' height={10} width={6} src={'/images/pin.svg'}></Image> {props.listItem.address}</p>}
           <Link href={`/plans/${query.planId}/hotels`}><Typography color={'blue'}  >Booking Details</Typography> </Link>
        </CardContent>
        </Box>
          </Card>:<div></div>}
          </>
  )
}

export default HotelCard