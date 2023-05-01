

import { Box, Button, Card, CardHeader, CardMedia, Modal, Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, {  useState } from 'react'
import EditPlan from '../form/EditPlan'
import { Plan } from '../pageCompnents/Schedule'
import Image from 'next/image'

type Props = {plan:Plan}

const DashBtns = (props: Props) => {
    const{ query}=useRouter()
    const [isModal, setIsModal] = useState<boolean>(false);
  
    const handleClickModal = (event: React.MouseEvent<HTMLElement>) => {
        setIsModal(true);
      };
      const handleCloseModal = () => {
        setIsModal(false);
      };



  return (
    <>
    <Link href={`/plans/${query.planId}/schedule`}>
<Card    sx={{flexGrow:'3',minHeight:'20vh',position:'relative'}} >
<Image src={"/images/schedule.webp"} priority fill sizes='800x' alt="" style={{objectFit:'cover',zIndex:'1'}}   />
<CardHeader sx={{position:'absolute',zIndex:'2',width:'100%',padding:'5% 0'}} titleTypographyProps={{textAlign:'center',color:'white',textTransform:'capitalize'}} title="Schedule"></CardHeader>

    </Card>
    </Link>
    <Button
        id="button"
        aria-controls={isModal ? 'menu' : undefined}
        aria-haspopup="true"
        aria-expanded={isModal ? 'true' : undefined}
        onClick={handleClickModal}
        sx={{padding:'0'}}
      >
    <Card sx={{flexGrow:'3',minHeight:'20vh' ,position:'relative'}} >
      <Image src={"/images/editplan.webp"} priority fill sizes='800x' alt="" style={{objectFit:'cover',zIndex:'1'}}   />
<CardHeader sx={{position:'absolute',zIndex:'2',width:'100%',padding:'5% 0'}} titleTypographyProps={{textAlign:'center',color:'white',textTransform:'capitalize'}} title="Edit Plan"></CardHeader>
    </Card>
    </Button> 
    <Link href={`/plans/${query.planId}/flights`}>
    <Card    sx={{flexGrow:'3',minHeight:'20vh',position:'relative'}} >
    <Image src={"/images/flights.webp"}  priority  fill sizes='800x' alt="" style={{objectFit:'cover',zIndex:'1'}}   />
    <CardHeader sx={{position:'absolute',zIndex:'2',width:'100%',padding:'5% 0'}} titleTypographyProps={{textAlign:'center',color:'white',textTransform:'capitalize'}} title="Flights"></CardHeader>
    </Card>
    </Link>
    <Link href={`/plans/${query.planId}/hotels`}>
    <Card sx={{flexGrow:'3',minHeight:'20vh',position:'relative'}}>
    <Image src={"/images/hotels.webp"} priority  fill sizes='1000px' alt="" style={{objectFit:'cover',zIndex:'1'}}   />
<CardHeader sx={{position:'absolute',zIndex:'2',width:'100%',padding:'5% 0'}} titleTypographyProps={{textAlign:'center',color:'white',textTransform:'capitalize'}} title="Hotels"></CardHeader>
    </Card>
    </Link>
   
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
  
      <EditPlan setOpen={setIsModal} plan={props.plan} />
    
  </Box></Modal>
    </>
  )
}

export default DashBtns