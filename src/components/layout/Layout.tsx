
import React, { useEffect } from 'react'

import styles from './Layout.module.css'


import NewNavBar from './NewNavBar'
import {Heebo} from 'next/font/google'


const heebo = Heebo({subsets:["latin",'hebrew']})
type Props = {
    children:string|JSX.Element|JSX.Element[]
}

const Layout = (props: Props) => {


  useEffect(() => {}, [(props.children as any).props])


  return (
    <div className={`${styles.layout} ${heebo.className}`} >   
      <div className={styles.content}><NewNavBar  />{props.children}</div> 
      </div>

  )
}


export default Layout