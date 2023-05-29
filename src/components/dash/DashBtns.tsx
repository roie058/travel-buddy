

import { Box, Button, Card, CardContent, Modal, Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, {  ReactElement, useState } from 'react'
import EditPlan from '../form/EditPlan'
import { Plan } from '../pageCompnents/Schedule'
import styles from './DashBtns.module.css'
import { AddedIcon, EditIcon, FlightIcon, HotelIcon, ScheduleIcon, WeatherIcon } from '../svgComponents'
import SnackBar from '../ui/SnackBar'
import useSnackBar from '@/hooks/useSnackBar'
import ToolTip from '../ui/ToolTip'


type Props = {plan:Plan}

const DashBtn:React.FC<{image:ReactElement,title:string,link:string}>=({image,title,link})=>{

 return <Link href={link} style={{textDecoration:'none'}}>
  <Card className={styles.btn} elevation={5}    sx={{flexGrow:'3',minHeight:'10vh',display:'flex',alignItems:'center',backgroundColor:'#fefefe'}} >
  
  <CardContent   sx={{display:'flex',alignItems:'center',gap:'15px',marginLeft:'10%'}}>
  {image}

  <Typography  variant="h2" fontSize={'2rem'}  textTransform={"capitalize"} sx={{textDecorationLine:'none'}}>{ title}</Typography>
  </CardContent>
 
  </Card>
  </Link>
}


const DashBtns = (props: Props) => {
    const{ query}=useRouter()
    const [isModal, setIsModal] = useState<boolean>(false);
const {setSnackBar,snackBarProps}=useSnackBar()
  
    const handleClickModal = (event: React.MouseEvent<HTMLElement>) => {
        setIsModal(true);
      };
      const handleCloseModal = () => {
        setIsModal(false);
      };

      



  return (
    <>
     <ToolTip title='the schedule page where you handle the trip itinerary' top='-15%'  >
    <DashBtn title='Schedule' link={`/plans/${query.planId}/schedule`} image={ <ScheduleIcon width={40} height={40} />}/>
    </ToolTip>
    
    <Button
    className={styles.btn}
        id="button"
        aria-controls={isModal ? 'menu' : undefined}
        aria-haspopup="true"
        aria-expanded={isModal ? 'true' : undefined}
        onClick={handleClickModal}
        sx={{padding:'0'}}
      >
        
    <Card elevation={5}    sx={{flexGrow:'3',minHeight:'10vh',display:'flex',alignItems:'center',backgroundColor:'#fefefe'}} >
    <CardContent sx={{display:'flex',alignItems:'center',gap:'15px',marginLeft:'10%'}}>
  <EditIcon width={40} height={40}/>
  <Typography variant="h2" fontSize={'2rem'} textTransform={"capitalize"} >Edit Plan</Typography>

  </CardContent>
    </Card>
   
    </Button> 
    <ToolTip title='here you can view all the places you added and search for new ones' top='-15%'  >
    <DashBtn title='All Places' link={`/plans/${query.planId}/likedPlaces`} image={<AddedIcon width={40} height={40}/>}/>
    </ToolTip>
    <ToolTip title='add your flight tickets and manage existing flights' top='-15%'  >
    <DashBtn title='flights' link={`/plans/${query.planId}/flights`} image={<FlightIcon width={40} height={40}/>}/>
    </ToolTip>
    <ToolTip title='add your hotel reservations and manage existing ones' top='-15%'  >
    <DashBtn title='Hotels' link={`/plans/${query.planId}/hotels`} image={<HotelIcon width={40} height={40}/>}/>
    </ToolTip>
    <ToolTip title='check the weather anywhere' top='-15%'  >
    <DashBtn title='weather' link={`/weather`} image={<WeatherIcon width={40} height={40}/>}/>
    </ToolTip>
   
    <Modal  open={isModal} sx={{zIndex:'10'}} onClose={handleCloseModal}><Box sx={ {position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  maxWidth:'500px',
  bgcolor: 'white',
 borderRadius:'30px',
  boxShadow: 24,
  p: 4,}}>
    <Typography id="modal-modal-title" variant="h6" component="h2">
      Change Date
    </Typography>
  
      <EditPlan openSnackBar={setSnackBar} setOpen={setIsModal} plan={props.plan} />
    
  </Box></Modal>
  <SnackBar {...snackBarProps}/>
    </>
  )
}

export default DashBtns