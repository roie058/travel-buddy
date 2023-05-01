
import { Button, Divider, Drawer, List, ListItem, Menu, MenuItem, useMediaQuery } from '@mui/material'


import Image from 'next/image'
import { useRouter } from 'next/router'
import {useSession,signOut} from 'next-auth/react'
import React, { useState } from 'react'

import styles from './NewNavBar.module.css'
import Link from 'next/link'
import { Box } from '@mui/system'


type Props = {}

const NewNavBar = (props: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openNav, setOpenNav] = useState<boolean>(false);
const {data:session}=useSession()


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
    <div style={{display:'flex',flexDirection:'column',position:"fixed",
    zIndex: 3,width:'100%'}}>
  <nav className={styles.nav}>
  {!isMobile&& <Button onClick={()=>{setOpenNav(true)}} className={styles.mobile_navBtn} >
<div></div>
<div></div>
<div></div>
</Button>}
{isMobile&& <ul className={(router.pathname!=='/plans/[planId]'&&router.pathname!=='/map')? styles.profile  :styles.navigation }>
        <li>
            <Link href={'/'}>
        <Image src={'/images/logo.png'} width={50} priority height={50} alt={'logo'} />
        </Link>
        </li>
    
   <li>
   
   </li>
  <li><Link className={(router.pathname ==='/plans')? styles.selected_link : styles.link} href={'/plans'}> My Trips </Link></li>
   <li>
   <Link className={(router.pathname ==='/map')? styles.selected_link : styles.link} href={'/map'}> Discover Places</Link> 
   </li>
   <li>
   <Link className={(router.pathname ==='/flights')? styles.selected_link : styles.link} href={'/flights'}>Flights</Link>   
   </li>
   <li>
   <Link className={(router.pathname ==='/weather')? styles.selected_link : styles.link} href={'/weather'}>Weather</Link>   
   </li>
   
   
  
    </ul>}
    
   {session?
          <Button
        id="button"
        aria-controls={open ? 'menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClickMenu }
        sx={{justifySelf:'flex-end'}}
      >
       <Image src={session.user?.image??'/images/account.png'} alt='profile' style={{borderRadius:'45px'}} height={45} width={45}></Image>
      </Button>:
      <Button
      onClick={()=>{router.push('/auth') } }
    >
     Login
    </Button>}
    
    <Menu
        id="menu"
        aria-labelledby="button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        disableScrollLock
        >
        <MenuItem onClick={()=>{ router.push('/plans'),handleCloseMenu()}}>All Trips</MenuItem>
        <MenuItem onClick={()=>{signOut() ;handleCloseMenu()}}>Logout</MenuItem>
      </Menu>
    
    <Drawer PaperProps={{sx:{width:'100%'}}} sx={{width:'100%'}} anchor='left' open={openNav} onClose={()=>{setOpenNav(false)}}><Box width={"100%"}>
        <Button sx={{fontSize:'50px',lineHeight:'1',color:'rgba(0, 0, 0, 0.60)'}} className={styles.closeBtn}  onClick={()=>setOpenNav(false)} >
        &times;
            </Button>
        <List sx={{display:'flex',flexDirection:'column',justifyItems:'center',alignItems:'center',gap:'30px',marginTop:'20%'}}>
            <ListItem sx={{justifyContent:'center'}} onClick={()=>setOpenNav(false)}><Link href={'/'}>
        <Image src={'/images/logo.png'} width={70} height={70} alt={'logo'} />
        </Link></ListItem>
<ListItem sx={{justifyContent:'center'}} onClick={()=>setOpenNav(false)}  ><Link className={(router.pathname ==='/plans')? styles.selected_link : styles.link} href={'/plans'}> My Trips </Link></ListItem>
<ListItem sx={{justifyContent:'center'}} onClick={()=>setOpenNav(false)}><Link className={(router.pathname ==='/map')? styles.selected_link : styles.link} href={'/map'}> Discover Places</Link> </ListItem>
<ListItem sx={{justifyContent:'center'}} onClick={()=>setOpenNav(false)}><Link className={(router.pathname ==='/flights')? styles.selected_link : styles.link} href={'/flights'}>Flights</Link> </ListItem>
<ListItem sx={{justifyContent:'center'}} onClick={()=>setOpenNav(false)}><Link className={(router.pathname ==='/weather')? styles.selected_link : styles.link} href={'/weather'}>Weather</Link> </ListItem>
        </List>
        </Box></Drawer>
  </nav>
  <Divider/>
  </div>
  )
}

export default NewNavBar