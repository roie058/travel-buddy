import { Pin } from '@/components/svgComponents'
import { IPlace } from '@/dummyData'
import { Button, Card, CardActions, CardContent, CardMedia, Chip, Rating, Typography } from '@mui/material'
import { Box } from '@mui/system'
import Image from 'next/image'
import React from 'react'

type Props = {place:IPlace}

const PlaceItemDetailCard = (props: Props) => {
  return (
    <Card elevation={6} sx={{display:'flex'}}  >
      <CardMedia  sx={{width:'150px',cursor:'pointer'}} title={props.place.name}  image={props.place.photo? props.place.photo.images.large.url: "/images/placeholder.png"}  />
    <CardContent sx={{width:'60%'}}  >
      <Box  sx={{cursor:'pointer'}} display={"flex"} justifyContent="space-between">
      <Typography  fontSize={'1.3rem'} fontWeight={'bold'}>{props.place.name} </Typography>
      </Box>

{props.place?.rating&&<Box  display={'flex'}><Rating value={Number(props.place?.rating)} precision={0.1} readOnly size="small"/> <Typography color={'primary'}   variant='body2' sx={{marginLeft:'5px'}}>{props.place?.num_reviews} reviews</Typography></Box> }
<Typography gutterBottom variant="subtitle2" color="GrayText">{props.place.price_level}</Typography>
{props.place?.address && (<Typography gutterBottom variant='subtitle2' color="InfoText">
<Pin width={12} height={10} /> {props.place.address}
</Typography>)}
{props.place?.phone && (<Typography gutterBottom variant='subtitle2' color="InfoText">
{props.place.phone}
</Typography>)}

<Typography variant="subtitle2">{props.place.ranking}</Typography>
{props.place?.awards[0] &&
<Box display={"flex"} my={1}>
<Image width={12} height={10} src={props.place.awards[0].images.small} alt={props.place.awards[0].display_name}  />
<Typography color={"GrayText"} variant="subtitle2">{props.place.awards[0].display_name}</Typography>
</Box>
}
<Box my={1}>
{props.place?.cuisine?.filter((cusine:any,i:number)=> (i<3)).map((cuisine:any)=>(<Chip key={cuisine.name} size='small' label={cuisine.name} />))}
</Box>

<CardActions > <Button size='small' sx={{color:'#33e0a1cc',textTransform:'capitalize',border:'2px solid #33e0a1cc'}} onClick={()=> window.open(props.place.web_url,'_blank')} >Trip Adviser</Button>
<Button sx={{color:'#923CF8cc',textTransform:'capitalize',border:'2px solid #923CF8cc'}}   size='small' onClick={()=> window.open(props.place.website,'_blank')} >Website</Button>

</CardActions>
    </CardContent>
    </Card>
  )
}

export default PlaceItemDetailCard