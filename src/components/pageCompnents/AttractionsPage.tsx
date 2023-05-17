import React from 'react'
import AttractionSearch from '../attractions/AttractionSearch'
import AttracrionList from '../attractions/AttracrionList'
import { Container } from '@mui/material'

type Props = {}

const AttractionsPage = (props: Props) => {
  return (
    <>
    <Container sx={{marginY:'10%',paddingTop:'65px'}} >

    <AttractionSearch/>
    <AttracrionList/>

    </Container>
    </>
  )
}

export default AttractionsPage