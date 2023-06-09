import dynamic from 'next/dynamic'
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, ButtonGroup, Card, CardContent, CardHeader,  List, ListItem, ListItemText, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
const Image=dynamic(() => import("next/image"), {loading: () => <p>Loading...</p>,})
const  HeartBtn =dynamic(() => import("../ui/buttons/HeartBtn"), {loading: () => <p>Loading...</p>,})
import { Arrow, EditIcon, FlightIcon, HotelIcon, LikedMarker, ScheduleIcon, WeatherIcon } from '../svgComponents'
import Link from 'next/link'
import UiButton from '../ui/buttons/UiButton'

import styles from './DocsPage.module.css'

import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
type Props = { }

const Question=({summary,children,id})=>{
    const {locale}=useRouter()
    return  <Accordion  id={id}  sx={{width:'100%',textAlign:locale=="he"?"right":"left"}}  >
    <AccordionSummary   expandIcon={<Arrow height={30} width={30} />}
  >{summary}</AccordionSummary>
    <AccordionDetails>{children}</AccordionDetails>
</Accordion>
}


const DocsPage = (props: Props) => {
    const { t } = useTranslation('docs')
    const {locale}=useRouter()
const isSm=useMediaQuery("(max-width:600px)")
  return (
     <Box height={"100%"} width={"100%"} marginBottom={"10%"} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} >
        <Typography className={styles.mainHeader} textAlign={"center"}  fontWeight={"bold"} variant='h1'>{t("title")}</Typography>
        <List>
            <ListItem>
<Card sx={{width:'100%'}}>
    <CardHeader sx={{paddingTop:'3%'}} titleTypographyProps={{textAlign:'center',fontWeight:"bold",className:styles.subHeader}} title={t("guide1.title")}/>
    <CardContent>
        <List >
   <ListItem  > <ListItemText primaryTypographyProps={{className:styles.text,textAlign:locale=="he"?"right":"left"}} >{t("guide1.step1")}<span ><Link href={'/newplan'} style={{fontWeight:'bold'}}> {t("guide1.link1")}</Link></span> {t("guide1.step1rest")}</ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text,textAlign:locale=="he"?"right":"left"}} >{t("guide1.step2")}</ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text,textAlign:locale=="he"?"right":"left",display:'flex',alignItems:"center",flexDirection:locale=="he"?"row-reverse":"row"}}>{t("guide1.step3")} {<UiButton style={{height:'30px', width:'100px',padding:"2% 7%",fontSize:'1rem'}} color='blue' clickFn={()=>{}}>{t("guide1.step3button")}</UiButton>} {t("guide1.step3rest")}</ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text,textAlign:locale=="he"?"right":"left"}} >🎉{t("guide1.step4")}🎉</ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text,textAlign:locale=="he"?"right":"left"}} >{t("guide1.summery")} <span ><Link href={'/plans'} style={{fontWeight:'bold'}}>{t("guide1.summeryLink")}</Link></span> {t("guide1.summeryRest")}</ListItemText></ListItem>
        </List>
    </CardContent>
   </Card>
            </ListItem>
            <ListItem >
            <Card sx={{width:'100%'}}>
    <CardHeader sx={{paddingTop:'3%'}} titleTypographyProps={{className:styles.subHeader,textAlign:'center',fontWeight:"bold"}} title={t("guide2.title")}/>
    <CardContent >
        <List >
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text,textAlign:locale=="he"?"right":"left"}} >{t("guide2.step1")} <span ><Link href={'/map'} style={{fontWeight:'bold'}}>{t("guide2.link1")}</Link></span> {t("guide2.step1rest")}</ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text,textAlign:locale=="he"?"right":"left"}} >{t("guide2.step2")}</ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text,textAlign:locale=="he"?"right":"left",display:'flex',alignItems:"center",flexDirection:locale=="he"?"row-reverse":"row"}} >{t("guide2.step3")} <ButtonGroup orientation={"horizontal"} >
    <Button  onClick={()=>{}}  sx={{width:'35px',minWidth:'0',textTransform:'capitalize',backgroundColor:"white",color:'#3c4043',border:'1px solid #3c404355'}} ><Image alt='atractions' width={20} height={20} src={'/images/amusment.gif'}/></Button>
    <Button onClick={()=>{}}  sx={{minWidth:'0',width:'35px',textTransform:'capitalize',backgroundColor:"white",color:'#3c4043',border:'1px solid #3c404355'}} ><Image alt='Hotels' width={20} height={20} src={'/images/bed.png'}/></Button>
    <Button onClick={()=>{}}  sx={{minWidth:'0',width:'35px',textTransform:'capitalize',backgroundColor:"white",color:'#3c4043',border:'1px solid #3c404355'}} ><Image alt='restaurants' width={20} height={20} src={'/images/restaurant.png'}/></Button>
    </ButtonGroup></ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text,textAlign:locale=="he"?"right":"left"}}>{t("guide2.step4")} </ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text,textAlign:locale=="he"?"right":"left",display:'flex',alignItems:"center",flexDirection:locale=="he"?"row-reverse":"row"}} >{t("guide2.step5")} <HeartBtn liked={false} onClick={()=>{}}/></ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text,textAlign:locale=="he"?"right":"left"}} >{t("guide2.step6")}</ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text,textAlign:locale=="he"?"right":"left"}} > 🎉{t("guide2.step7")}🎉</ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text,textAlign:locale=="he"?"right":"left",display:'flex',alignItems:"center",flexDirection:locale=="he"?"row-reverse":"row"}}  >{t("guide2.summery")} <LikedMarker style={{overflow:'clip'}}  width={50} height={50} /></ListItemText></ListItem>
        </List>
    </CardContent>
   </Card>


            </ListItem>
            <ListItem><Card sx={{width:'100%'}}>
    <CardHeader sx={{paddingTop:'3%'}} titleTypographyProps={{className:styles.subHeader,textAlign:'center',fontWeight:"bold"}} title={t("guide3.title")}/>
    <CardContent sx={{textAlign:locale=="he"?"right":"left"}}>
        <List >
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text,textAlign:locale=="he"?"right":"left"}} >{t("guide3.row1")}</ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text,textAlign:locale=="he"?"right":"left"}} >{t("guide3.row2")}</ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text,textAlign:locale=="he"?"right":"left",display:'flex',alignItems:"center",gap:'5px',flexDirection:locale=="he"?"row-reverse":"row"}}><ScheduleIcon width={25} height={25}/> {t("guide3.step1")} </ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text,textAlign:locale=="he"?"right":"left",display:'flex',alignItems:"center",gap:'5px',flexDirection:locale=="he"?"row-reverse":"row"}}>{t("guide3.step1text")}</ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text,textAlign:locale=="he"?"right":"left",display:'flex',flexDirection:locale=="he"?"row-reverse":"row",alignItems:"center",gap:'5px'}}><EditIcon width={25} height={25}/> {t("guide3.step2")}</ListItemText></ListItem>
      <ListItem > <ListItemText primaryTypographyProps={{className:styles.text,textAlign:locale=="he"?"right":"left",display:'flex',alignItems:"center",gap:'5px',flexDirection:locale=="he"?"row-reverse":"row"}}>{t("guide3.step2text")}</ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text,textAlign:locale=="he"?"right":"left",display:'flex',alignItems:"center",gap:'5px',flexDirection:locale=="he"?"row-reverse":"row"}}><FlightIcon width={25} height={25}/> {t("guide3.step3")}</ListItemText></ListItem>
      <ListItem > <ListItemText primaryTypographyProps={{className:styles.text,textAlign:locale=="he"?"right":"left",display:'flex',alignItems:"center",gap:'5px',flexDirection:locale=="he"?"row-reverse":"row"}}>{t("guide3.step3text")}</ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text,textAlign:locale=="he"?"right":"left",display:'flex',alignItems:"center",gap:'5px',flexDirection:locale=="he"?"row-reverse":"row"}}><HotelIcon width={25} height={25}/> {t("guide3.step4")}</ListItemText></ListItem>
      <ListItem > <ListItemText primaryTypographyProps={{className:styles.text,textAlign:locale=="he"?"right":"left",display:'flex',alignItems:"center",gap:'5px',flexDirection:locale=="he"?"row-reverse":"row"}}>{t("guide3.step4text")}</ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text,textAlign:locale=="he"?"right":"left",display:'flex',alignItems:"center",gap:'5px',flexDirection:locale=="he"?"row-reverse":"row"}}><WeatherIcon width={25} height={25}/> {t("guide3.step5")}</ListItemText></ListItem>
      <ListItem > <ListItemText primaryTypographyProps={{className:styles.text,textAlign:locale=="he"?"right":"left",display:'flex',alignItems:"center",gap:'5px',flexDirection:locale=="he"?"row-reverse":"row"}}>{t("guide3.step5text")}</ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text,textAlign:locale=="he"?"right":"left"}} ></ListItemText></ListItem>
        </List>
    </CardContent>
   </Card></ListItem>
   <ListItem><Card sx={{width:'100%'}}> 
    <CardHeader sx={{paddingTop:'3%'}} titleTypographyProps={{className:styles.subHeader,textAlign:'center',fontWeight:"bold"}} title={t("guide4.title")}/>
    <CardContent>
        <List >
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text,textAlign:locale=="he"?"right":"left"}} >{t("guide4.step1")}</ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text,textAlign:locale=="he"?"right":"left"}} >{t("guide4.step2")}</ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text,textAlign:locale=="he"?"right":"left"}}>{t("guide4.step3")}</ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text,textAlign:locale=="he"?"right":"left"}} >{t("guide4.step4")}</ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text,textAlign:locale=="he"?"right":"left"}} >{t("guide4.step5")}</ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text,textAlign:locale=="he"?"right":"left"}} >{t("guide4.step6")}</ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text,textAlign:locale=="he"?"right":"left"}} > {t("guide4.step7")}</ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text,textAlign:locale=="he"?"right":"left"}} >{t("guide4.step8")}</ListItemText></ListItem>
        </List>
    </CardContent>
   </Card></ListItem>
        </List>
<Box display={"flex"} paddingX={"10%"} flexDirection={"column"} gap={"15px"} alignItems={"center"} justifyContent={"center"}>


        <Typography textAlign={"center"} fontSize={isSm?"1.5rem": "2.5rem"} fontWeight={"bold"} variant='h2'>{t("qa.header")}</Typography>
       <Question id={'question1'} summary={t("qa.q1")}>{t("qa.a1")} <span ><Link href={'/plans'} style={{fontWeight:'bold'}}>{t("qa.a1link")}</Link></span>  {t("qa.a1rest")}</Question>
       <Question id={'question2'} summary={t("qa.q2")}>{t("qa.a2")}</Question>
       <Question id={'question3'} summary={t("qa.q3")}>{t("qa.a3")} <span ><Link href={'/plans'} style={{fontWeight:'bold'}}>{t("qa.a3link")}</Link></span> {t("qa.a3rest")}</Question>
       <Question id={'question4'} summary={t("qa.q4")}>{t("qa.a4")} <span ><Link href={'/plans'} style={{fontWeight:'bold'}}>{t("qa.a4link")}</Link></span></Question>
       <Question id={'question5'} summary={t("qa.q5")}>{t("qa.a5")} <span ><Link href={'/plans'} style={{fontWeight:'bold'}}>{t("qa.a5link")}</Link></span></Question>
       <Question id={'question6'} summary={t("qa.q6")}>{t("qa.a6")}</Question>
       </Box>
    </Box>
  )
}

export default DocsPage