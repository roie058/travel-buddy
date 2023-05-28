import { IPlace } from '@/dummyData'
import { Box, Button, Card, CardContent, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { Pin } from '../svgComponents'



 type Props = { 
    listItem?:IPlace,
}

const HotelCard = (props: Props) => {
  const{query}=useRouter()
    
  return (
    <>
    
   {props.listItem? <Card sx={{width:'100%',overflow:'visible',height:'120px',background:"rgba(96, 131, 255, 0.16)",backdropFilter:'blur(12.5px)'}}     >
 
       <Box sx={{borderRadius:0 , fontFamily: "Heebo, sans-serif",display:'flex',padding:'10px 10px',alignItems:'center'}}>
        <Image style={{objectFit:"cover",borderRadius:'10px'}} width={100} height={100}  src={props.listItem?.photo ? props.listItem.photo.images.small.url:'/images/placeholder.png'} alt={""}/>
        <CardContent sx={{margin: '3%', marginRight:'0',padding:'0', paddingBottom:'0 !important',display:'flex',flexDirection:'column',gap:'10px'}}>
            <Typography variant='h4' fontSize={"1rem"} fontWeight="bold">{props.listItem.name} </Typography>
           {props.listItem.address&& <p className={"styles.address"}><Pin  height={10} width={10} />{props.listItem.address}</p>}
           <Link href={`/plans/${query.planId}/hotels`}><Button sx={{px:"12%",backgroundColor:'white',border:'1px solid #341099',borderRadius:'25px'}} ><Typography color={'#341099'} textTransform={"capitalize"} fontWeight={'bold'} >Booking Details</Typography></Button> </Link>
        </CardContent>
        </Box>
          </Card>:<div></div>}
          </>
  )
}

export default HotelCard