import React from 'react'
import styles from './Pill.module.css'
type Props = {
text:string,
color:string
}

const Pill = (props: Props) => {
  return (
    <span className={styles.pill} style={{color:props.color,borderColor:props.color}} >{props.text}</span>
  )
}

export default Pill