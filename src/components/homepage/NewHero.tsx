import { Box, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import RoundLogo from '../../../public/images/roundlogo.svg'
import {Heebo} from 'next/font/google'
import Image from 'next/image'
import UiButton from '../ui/buttons/UiButton'
import styles from './NewHero.module.css'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { TFunction } from 'i18next'
type Props = {t: TFunction<"home", undefined, "home">}



const heebo=Heebo({subsets:["latin","hebrew"]})
const NewHero = ({t}: Props) => {
const {locale}=useRouter()
   const {data:session} =useSession()
const router=useRouter()
const isXl=useMediaQuery("(max-width:1350px)")
const isLg=useMediaQuery("(max-width:900px)")
const isSmall=useMediaQuery("(max-width:600px)")



  return (
      <Box minHeight={"100vh"}    >
        

        <Box height={"100%"}  display={'flex'} justifyContent={"center"} alignItems={"center"} flexDirection={"column"} px={isSmall?'10%':"0"}  >
        
<Box className={styles.container} >
<Box className={styles.circleGroup1}>
        <div  ></div>
        <div ></div>
        <div ></div>
        </Box>
        
         <Box className={styles.circleGroup2}>
        <div ></div>
        <div></div>
        <div ></div>
        </Box>
    <Box className={styles.mainText}   >
<Typography className={`${heebo.className} ${styles.header}`} fontWeight={"bold"} variant="h1" >{t('h1')}</Typography>
<Image priority sizes='250px' className={styles.logo}  alt='travel buddy'  src={RoundLogo}   />
</Box>
<Typography className={`${heebo.className} ${styles.sub}`}>{t('sub1')} <span style={{color:"#238080"}}>{t("colorText1")}</span> {locale==='en'?"and":''} <span style={{color:"#0B799D"}}>{t("colorText2")}</span></Typography>
</Box>

<Box  paddingY={isSmall?"15%":"5%"}  display={'flex'} alignItems={'center'} textAlign={'center'} flexWrap={"wrap"} justifyContent={"center"} gap={"15px"} maxWidth={'1000px'} >
{session&& <Typography className={heebo.className} fontWeight={"bold"} variant='h2' fontSize={isXl?"2rem": "3rem"}>{t("startLink")}</Typography>}
{session? <UiButton style={{height:'50px',width:'200px',padding:'0'}} size='small' clickFn={()=>{router.push('/newplan')}}>{t("button")}</UiButton> :<UiButton style={{height:'50px',width:'200px',padding:'0'}} size='small' color='blue' clickFn={()=>router.push('/auth')}>{t("loginButton")}</UiButton>}
</Box>
</Box>

    </Box>
  )
}

export default NewHero