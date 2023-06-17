
import { Button, Divider, Drawer, IconButton, List, ListItem, Menu, MenuItem, Select, useMediaQuery } from '@mui/material'


import Image from 'next/image'
import { useRouter } from 'next/router'
import {useSession,signOut} from 'next-auth/react'
import React, { useState } from 'react'

import styles from './NewNavBar.module.css'
import Link from 'next/link'
import { Box } from '@mui/system'
import { AccountIcon, LogoIcon } from '../svgComponents'
import { useTranslation } from 'next-i18next'


type Props = {}

const NewNavBar = (props: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openNav, setOpenNav] = useState<boolean>(false);
const {data:session}=useSession()
const {t}=useTranslation()

  const open = Boolean(anchorEl);
const router=useRouter()
  

  const handleClickMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

 
 
  const isMobile=useMediaQuery('(min-width:600px)')
  return (
    <div style={{display:'flex',flexDirection:'column',position:"sticky",top:'0',
    zIndex: 3,width:'100%'}}>
  <nav className={styles.nav}>
  {!isMobile&& <Button name="navigation drawer" aria-label="navigation"  onClick={()=>{setOpenNav(true)}} className={styles.mobile_navBtn} >
<div></div>
<div></div>
<div></div>
</Button>}
{isMobile&& <ul className={(router.pathname!=='/plans/[planId]'&&router.pathname!=='/map')? styles.profile  :styles.navigation }>
        <li style={{borderRadius:'100%',overflow:"hidden",width:'50px',height:'50px'}}>
            <Link href={'/'}  >
        <LogoIcon width={50} height={50}   />
        </Link>
        </li>
    
   <li>
   
   </li>
  <li><Link className={(router.pathname ==='/plans')? styles.selected_link : styles.link} href={'/plans'}> {t('nav.myTrips')} </Link></li>
   <li>
   <Link className={(router.pathname ==='/map')? styles.selected_link : styles.link} href={'/map'}> {t('nav.map')}</Link> 
   </li>
   <li>
   <Link className={(router.pathname ==='/flights')? styles.selected_link : styles.link} href={'/flights'}>{t('nav.flights')}</Link>   
   </li>
   <li>
   <Link className={(router.pathname ==='/weather')? styles.selected_link : styles.link} href={'/weather'}>{t('nav.weather')}</Link>   
   </li>
   
   
  
    </ul>}
    
   <Box sx={{justifySelf:'flex-end',display:"flex"}} >

 {isMobile&&<Select onChange={(e)=>{ router.push(router.asPath,undefined,{locale:String(e.target.value)})  }} variant="standard" defaultValue={router.locale} >
    <MenuItem value={"he"}><Image width={20} height={15} alt={"hebrew"}    src={'https://flagcdn.com/40x30/il.webp'}  />  He</MenuItem>
    <MenuItem value={"en"}><Image width={20} height={14} alt={"english"}    src={'https://flagcdn.com/40x30/gb.webp'}  />  En</MenuItem>
  </Select>}
   {session?.user?
          <Button
        id="profile"
        name="user profile"
        aria-label="profile"
        aria-controls={open ? 'menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClickMenu }
        
      >
        {session.user?.image? <Image priority src={session.user?.image} alt='profile' style={{borderRadius:'45px'}} height={45} width={45}/>:<AccountIcon fillOpacity={0.4} height={45} width={45}/>}
      
      </Button>:
      <Button
      name='login'
      aria-label="login button"
      onClick={()=>{router.push('/auth') } }
    >
    {t("profile.login")}
    </Button>}
    </Box> 
    <Menu
        id="menu"
        aria-labelledby="menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        disableScrollLock
        >
        <MenuItem onClick={()=>{ router.push('/plans'),handleCloseMenu()}}>{t('profile.alltrips')}</MenuItem>
        <MenuItem onClick={()=>{ router.push('/newplan'),handleCloseMenu()}}>{t('profile.newPlan')}</MenuItem>
        <MenuItem onClick={()=>{signOut() ;handleCloseMenu()}}>{t('profile.logout')}</MenuItem>
      </Menu>
    
    <Drawer PaperProps={{sx:{width:'100%'}}} sx={{width:'100%'}} anchor='left' open={openNav} onClose={()=>{setOpenNav(false)}}><Box width={"100%"}>
        <Button sx={{fontSize:'50px',lineHeight:'1',color:'rgba(0, 0, 0, 0.60)'}} className={styles.closeBtn}  onClick={()=>setOpenNav(false)} >
        &times;
            </Button>
        <List sx={{display:'flex',flexDirection:'column',justifyItems:'center',alignItems:'center',gap:'30px',marginTop:'20%'}}>
            <ListItem   sx={{justifyContent:'center',borderRadius:'50%',overflow:"hidden",width:'70px',height:'70px'}} onClick={()=>setOpenNav(false)}><Link href={'/'}>
        <LogoIcon  width={80} height={80}  />
        </Link></ListItem>
<ListItem sx={{justifyContent:'center'}} onClick={()=>setOpenNav(false)}  ><Link className={(router.pathname ==='/plans')? styles.selected_link : styles.link} href={'/plans'}>{t('nav.myTrips')}</Link></ListItem>
<ListItem sx={{justifyContent:'center'}} onClick={()=>setOpenNav(false)}><Link className={(router.pathname ==='/map')? styles.selected_link : styles.link} href={'/map'}>{t('nav.map')}</Link> </ListItem>
<ListItem sx={{justifyContent:'center'}} onClick={()=>setOpenNav(false)}><Link className={(router.pathname ==='/flights')? styles.selected_link : styles.link} href={'/flights'}>{t('nav.flights')}</Link> </ListItem>
<ListItem sx={{justifyContent:'center'}} onClick={()=>setOpenNav(false)}><Link className={(router.pathname ==='/weather')? styles.selected_link : styles.link} href={'/weather'}>{t('nav.weather')}</Link> </ListItem>
       <ListItem sx={{justifyContent:'center'}}><Select  onChange={(e)=>{ setOpenNav(false);router.push(router.asPath,undefined,{locale:String(e.target.value)})  }} variant="standard" defaultValue={router.locale} >
    <MenuItem value={"he"}><Image width={20} height={15} alt={"hebrew"}    src={'https://flagcdn.com/40x30/il.webp'}  />  He</MenuItem>
    <MenuItem value={"en"}><Image width={20} height={14} alt={"english"}    src={'https://flagcdn.com/40x30/gb.webp'}  />  En</MenuItem>
  </Select></ListItem> 
        </List>
      
        </Box></Drawer>
  </nav>
  <Divider/>
  </div>
  )
}

export default NewNavBar

