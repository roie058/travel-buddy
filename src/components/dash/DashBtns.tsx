

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
import { useTranslation } from 'next-i18next'


type Props = {plan:Plan}

const DashBtn:React.FC<{image:ReactElement,title:string,link:string}>=({image,title,link})=>{
  const{locale}=useRouter()

 return <Link href={link} style={{textDecoration:'none'}}>
  <Card className={styles.btn} elevation={5}    sx={{flexGrow:'3',minHeight:'10vh',display:'flex',alignItems:'center',flexDirection:locale=='he'?"row-reverse":"row",backgroundColor:'#fefefe'}} >
  
  <CardContent   sx={{display:'flex',alignItems:'center',flexDirection:locale=='he'?"row-reverse":"row",gap:'15px',marginX:'10%'}}>
  {image}

  <Typography  variant="h2" fontSize={'2rem'}  textTransform={"capitalize"} sx={{textDecorationLine:'none'}}>{ title}</Typography>
  </CardContent>
 
  </Card>
  </Link>
}


const DashBtns = (props: Props) => {
    const{ query,locale}=useRouter()
    const [isModal, setIsModal] = useState<boolean>(false);
    const {t}=useTranslation("plan")
const {setSnackBar,snackBarProps}=useSnackBar()
  
    const handleClickModal = (event: React.MouseEvent<HTMLElement>) => {
        setIsModal(true);
      };
      const handleCloseModal = () => {
        setIsModal(false);
      };

      



  return (
    <>
     <ToolTip title={t("scheduleTooltip")} top='-15%'  >
    <DashBtn title={t("schedule")} link={`/plans/${query.planId}/schedule`} image={ <ScheduleIcon width={40} height={40} />}/>
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
        
    <Card elevation={5}    sx={{flexGrow:'3',minHeight:'10vh',display:'flex',alignItems:'center',flexDirection:locale=='he'?"row-reverse":"row",backgroundColor:'#fefefe'}} >
    <CardContent sx={{display:'flex',alignItems:'center',flexDirection:locale=='he'?"row-reverse":"row",gap:'15px',marginX:'10%'}}>
  <EditIcon width={40} height={40}/>
  <Typography variant="h2" fontSize={'2rem'} textTransform={"capitalize"} >{t("edit")}</Typography>

  </CardContent>
    </Card>
   
    </Button> 
    <ToolTip title={t("allPlacesTooltip")} top='-15%'  >
    <DashBtn title={t("all")} link={`/plans/${query.planId}/likedPlaces`} image={<AddedIcon width={40} height={40}/>}/>
    </ToolTip>
    <ToolTip title={t("flightsTooltip")} top='-15%'  >
    <DashBtn title={t("flights")} link={`/plans/${query.planId}/flights`} image={<FlightIcon width={40} height={40}/>}/>
    </ToolTip>
    <ToolTip title={t("hotelsTooltip")} top='-15%'  >
    <DashBtn title={t("hotels")} link={`/plans/${query.planId}/hotels`} image={<HotelIcon width={40} height={40}/>}/>
    </ToolTip>
    <ToolTip title={t("weatherTooltip")} top='-15%'  >
    <DashBtn title={t("weather")} link={`/weather`} image={<WeatherIcon width={40} height={40}/>}/>
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
      {t("edit")}
    </Typography>
  
      <EditPlan openSnackBar={setSnackBar} setOpen={setIsModal} plan={props.plan} />
    
  </Box></Modal>
  <SnackBar {...snackBarProps}/>
    </>
  )
}

export default DashBtns