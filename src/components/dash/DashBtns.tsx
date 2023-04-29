
import { Plan } from '@/pages/plans/[planId]/schedule'
import { Box, Button, Card, CardHeader, Modal, Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, {  useState } from 'react'
import EditPlan from '../form/EditPlan'

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
<Card    sx={{flexGrow:'3',minHeight:'16vh',position:'relative',backgroundImage:'url(/images/schedule.jpg)',backgroundPosition:'center',backgroundRepeat:"no-repeat",backgroundSize:"cover",}} >
<CardHeader   titleTypographyProps={{textAlign:'center',color:'white'}} title="Schedule"></CardHeader>

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
    <Card sx={{flexGrow:'3',minHeight:'16vh' ,position:'relative',backgroundImage:'url(/images/editplan.jpg)',backgroundPosition:'center',backgroundRepeat:"no-repeat",backgroundSize:"cover",}} >
      
<CardHeader titleTypographyProps={{textAlign:'center',color:'white'}} title="Edit Plan"></CardHeader>
    </Card>
    </Button> 
    <Link href={`/plans/${query.planId}/flights`}>
    <Card sx={{flexGrow:'3',minHeight:'16vh',position:'relative',backgroundImage:'url(/images/flights.jpg)',backgroundPosition:'center',backgroundRepeat:"no-repeat",backgroundSize:"cover"}}>
    
<CardHeader titleTypographyProps={{textAlign:'center',color:'white'}} title="Flights"></CardHeader>
    </Card>
    </Link>
    <Link href={`/plans/${query.planId}/hotels`}>
    <Card sx={{flexGrow:'3',minHeight:'16vh',position:'relative',backgroundImage:'url(/images/hotels.jpg)',backgroundPosition:'center',backgroundRepeat:"no-repeat",backgroundSize:"cover"}}>
    
<CardHeader titleTypographyProps={{textAlign:'center',color:'white'}} title="Hotels"></CardHeader>
    </Card>
    </Link>
    <Link href={`/plans/${query.planId}/hotels`}>
    <Card sx={{flexGrow:'3',minHeight:'16vh',position:'relative',backgroundImage:'url(/images/weather.jpg)',backgroundPosition:'center',backgroundRepeat:"no-repeat",backgroundSize:"cover"}}>
    
<CardHeader titleTypographyProps={{textAlign:'center',color:'white'}} title="Weather"></CardHeader>
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