

import { Button, Card, CardActions, CardContent, CardHeader, CircularProgress, Rating, Typography } from '@mui/material'
import { Box } from '@mui/system'
import Image from 'next/image'

import React, { useState }  from 'react'

import styles from './HotelAdd.module.css'
import UiButton from '../ui/buttons/UiButton'

import AddReservationModal from './AddReservationModal'

import { IPlace } from '@/dummyData'

import Link from 'next/link'
import { Plan } from '../pageCompnents/Schedule'
import DeleteIcon from '../../../public/images/delete.svg'
import { Pin } from '../svgComponents'
import useSnackBar from '@/hooks/useSnackBar'
import SnackBar from '../ui/SnackBar'
import { useTranslation } from 'next-i18next'
import { useMutation } from '@tanstack/react-query'
import { removePlace } from '@/util/fetchers'
import { queryClient } from '@/pages/_app'

type Props = {plan:Plan}

const HotelAdd = (props: Props) => {
   const [open, setOpen] = useState<boolean>(false)
   const [openIndex, setOpenIndex] = useState<number>()
   const {t}=useTranslation("hotels")
    const {setSnackBar,snackBarProps}=useSnackBar()

    const {isLoading,mutate}=useMutation(removePlace,{onMutate:({place})=>{
      const dataI=props.plan.liked.hotels.findIndex((places)=>places.location_id==place.location_id)
         props.plan.liked.hotels.splice(dataI,1)

    },onSuccess:()=>{
      setSnackBar(t("snack.deleteHotel"),'error')
queryClient.invalidateQueries(["plan",props.plan._id])
    },onError:()=>{
      setSnackBar(t("snack.serverError"),'error')
      queryClient.invalidateQueries(["plan",props.plan._id])
    }})

   const deletetHandler=async (hotel:IPlace)=>{
    mutate({place:hotel,planId:props.plan._id,category:"hotels"})
     
    }



  return (
    <>
    <Card sx={{width:'100%', height:'100%',borderRadius:'0' }} >
      <CardHeader titleTypographyProps={{textAlign:'center',sx:{textDecoration:'underline'}}}  title={t("header")}/>
        <CardContent  sx={{display:'flex',gap:'12px',flexWrap:'wrap',justifyContent:'center'}}>
        
{props.plan&&props.plan.liked.hotels.map((hotel:IPlace,i)=> <Card key={hotel._id}    elevation={3}    className={styles.paper} >
    <Box width={'100%'} height={'35%'} position={'relative'}>
            <Image priority fill sizes='300px' style={{objectFit:'cover'}} src={hotel.photo?.images.large.url??'/images/placeholder.png'} alt={hotel.name}/>
            </Box>
            <Box alignItems={'center'} height={'65%'} display={'flex'} flexDirection={'column'} justifyContent={'space-evenly'} >
                <Typography sx={{padding:'1%'}} variant="body1" fontWeight={'bold'} className={styles.typography} >
                    {hotel.name}
                    </Typography>
                   
                    {hotel?.rating&&<Box  display={'flex'} gap='15px' ><Rating  value={Number(hotel?.rating)} precision={0.1} readOnly size="small"/> <Typography  variant="subtitle2" color="GrayText">{hotel.price_level}</Typography> </Box> }
                    
                      {hotel?.price&& <Typography  variant="subtitle2" color="GrayText">Price Range: {hotel?.price}</Typography>}
                    {hotel?.ranking&& (<Typography gutterBottom fontSize={"0.7rem"}  variant='subtitle2' color="InfoText">
 {hotel.ranking}
</Typography>)}
{hotel?.address && (<Typography gutterBottom fontSize={"0.8rem"}  variant='subtitle2' color="InfoText">
<Pin  width={10} height={10}  /> {hotel.address}
</Typography>)}
{hotel?.phone && (<Typography gutterBottom variant='subtitle2' fontSize={"0.8rem"} color="InfoText">
{hotel.phone}
</Typography>)}
              
                    
                { hotel.web_url&&hotel.website &&    <CardActions > <Button size='small' sx={{height:'30px',color:'#33e0a1cc',textTransform:'capitalize',border:'2px solid #33e0a1cc'}} onClick={()=> window.open(hotel.web_url,'_blank')} >Trip Adviser</Button>
<Button sx={{height:'30px',color:'#923CF8cc',textTransform:'capitalize',border:'2px solid #923CF8cc'}}   size='small' onClick={()=> window.open(hotel.website,'_blank')} >Website</Button>

</CardActions>}
{hotel.business_listings&& (hotel.business_listings.desktop_contacts.length>0 || hotel.business_listings.mobile_contacts.length>0) &&  <CardActions > {hotel.business_listings.mobile_contacts[0] && <Button sx={{height:'30px',color:'#923CF8cc',textTransform:'capitalize',border:'2px solid #923CF8cc'}}   size='small' onClick={()=> window.open(hotel.business_listings?.mobile_contacts[0].value,'_blank')} >Website</Button>}
{hotel.business_listings&& hotel.business_listings.desktop_contacts[0] && <Button sx={{height:'30px',color:'#923CF8cc',textTransform:'capitalize',border:'2px solid #923CF8cc'}}   size='small' onClick={()=> window.open(hotel.business_listings?.desktop_contacts[0].value,'_blank')} >Website</Button>}

</CardActions>}

<UiButton className={styles.reservationBtn} clickFn={()=>{setOpenIndex(i);setOpen(true); }} >{t("addBtn")}</UiButton>

</Box>

                 <div className={styles.heartBtn}>

                 {isLoading? <CircularProgress size={'1rem'} />  : <Button sx={{width:'30px',height:'30px'}}  onClick={()=>{deletetHandler(hotel)}}   ><Image alt='delete' fill sizes='30px' src={DeleteIcon}/></Button>}
                    </div>
                   {openIndex===i&& <AddReservationModal setSnackBar={setSnackBar} plan={props.plan} hotel={hotel} open={open} onClose={()=>{setOpen(false)}}/>}
                      </Card>)}

         
        </CardContent>
        <CardActions >
          <Typography width={'100%'} fontSize={'1.2rem'} textAlign={'center'} variant="body1">{t("mapref")} <Link style={{color:"blue"}} href={'/map'}>{t("mapLink")}</Link></Typography>
        </CardActions>
    </Card>
    <SnackBar {...snackBarProps}/>
    </>
  )
}

export default HotelAdd