import { Box, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import RoundLogo from '../../../public/images/roundlogo.svg'
type Props = {}
import {Heebo} from '@next/font/google'
import Image from 'next/image'
import UiButton from '../ui/buttons/UiButton'
import styles from './NewHero.module.css'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
const heebo=Heebo({subsets:["latin","hebrew"]})
const NewHero = (props: Props) => {

   const {data:session} =useSession()
const router=useRouter()
const isXl=useMediaQuery("(max-width:1350px)")
const isLg=useMediaQuery("(max-width:900px)")
const isSmall=useMediaQuery("(max-width:600px)")



  return (
      <Box minHeight={"100vh"}    >
        

        <Box height={"100%"}  display={'flex'} justifyContent={"center"} alignItems={"center"} flexDirection={"column"} px={isSmall?'10%':"0"}  >
        
<Box   display={"flex"} alignItems={isLg?"center":"flex-start"} position={"relative"}   flexDirection={"column"} maxWidth={isXl? "780px" : '1000px'}    >
{!isLg&& <Box className={styles.circleGroup1}>
        <div  ></div>
        <div ></div>
        <div ></div>
        </Box>}
        
        {!isLg&&  <Box className={styles.circleGroup2}>
        <div ></div>
        <div></div>
        <div ></div>
        </Box>}
    <Box  display={"flex"} alignItems={isLg?"center":"flex-start"} gap={isSmall?'0px' :"50px"} flexDirection={isLg?"column-reverse":'row'} >
<Typography className={heebo.className} fontWeight={"bold"} variant="h1" fontSize={isXl?isSmall?"3.5rem": '4rem':"5rem"}>The only travel site <br/> you will need</Typography>
<Image priority sizes='250px' width={isXl?  200 :260}  alt='travel buddy'  src={RoundLogo}   />
</Box>
<Typography pt={isLg? "3%" : "0"} maxWidth={isLg?'530px':"100%"} className={heebo.className} color={"#666666"} fontWeight={"bold"} fontSize={isXl? isSmall? "1rem" :'1.3rem':"1.5rem"}>Travel Buddy offers an all in one travel tool packed with everything 
so you can plan your trip with  <span style={{color:"#238080"}}>Efficiency</span> and <span style={{color:"#0B799D"}}>Simplicity.</span></Typography>
</Box>

<Box  paddingY={isSmall?"15%":"5%"}  display={'flex'} alignItems={'center'} flexWrap={"wrap"} justifyContent={"center"} gap={"15px"} maxWidth={'1000px'} >
{session&& <Typography className={heebo.className} fontWeight={"bold"} variant='h2' fontSize={isXl?"2rem": "3rem"}>Start your Adventure</Typography>}
{session? <UiButton style={{height:'50px',width:'200px',padding:'0'}} size='small' clickFn={()=>{router.push('/newplan')}}>+New Plan</UiButton> :<UiButton style={{height:'50px',width:'200px',padding:'0'}} size='small' color='blue' clickFn={()=>router.push('/auth')}>sign in</UiButton>}
</Box>
</Box>

    </Box>
  )
}

export default NewHero