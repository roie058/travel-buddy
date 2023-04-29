import { UserContext } from '@/context/auth-context'

import { Badge, Card, CardActions, CardContent, CardHeader, CardMedia, Chip, Icon, SvgIcon, Typography } from '@mui/material'
import Image from 'next/image'
import React, { useState,useContext } from 'react'
import ListButton from '../buttons/ListButton'
import { ListItems } from './List'
import styles from './ListItem.module.css'
type Props = {
listItem:ListItems,
type:string
}


const ListItem = (props: Props) => {
   const [liked,setLiked]=useState(props.listItem.liked)
const userCtx=useContext(UserContext)

const clickHandler=()=>{
 if(!liked){
  props.listItem.liked=true
  userCtx?.plans[0].liked[props.type].push(props.listItem)
 }else{
  props.listItem.liked=false
  const itemI=userCtx?.plans[0].liked[props.type].findIndex((item:ListItems)=> item.id === props.listItem.id)
userCtx?.plans[0].liked[props.type].splice(itemI,1)
 }
setLiked(!liked)
}

  return (
    <Card  sx={{fontFamily: "Heebo, sans-serif",display:'flex',padding:'5%',paddingRight:'3%',alignItems:'center'}}>
        <Badge  badgeContent={liked&&<Image alt='stars' height={35} width={35} src={'/images/liked.svg'}></Image>}>
        <Image style={{objectFit:"cover",borderRadius:'10px'}} width={150} height={150}  src={props.listItem.headImg} alt={props.listItem.name}/>
        <CardContent sx={{padding:'5% 0% 5% 3%' }}>
            <h3 className={styles.header}>{props.listItem.name}<span className={styles.stars}>{props.listItem.stars}</span>{<Image alt='stars' height={10} width={10} src={'/images/star.svg'}></Image>}<span className={styles.reviews}>{props.listItem.reviews} Reviews</span></h3>
            <p className={styles.address}><Image alt='pin' height={12} width={7} src={'/images/pin.svg'}></Image> {props.listItem.location}</p>
            <p className={styles.stars}>{props.listItem.category}</p>
            <ListButton onClick={clickHandler} liked={liked}>{liked?"Remove from list":'Add to list'}</ListButton>
        </CardContent>
        </Badge>
          </Card>
  )
}

export default ListItem