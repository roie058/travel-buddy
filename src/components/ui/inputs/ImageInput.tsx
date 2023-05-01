import { tripImages } from '@/util/tripsImages'
import {  Button, Dialog, DialogTitle, Grid, ImageList, ImageListItem, ListItemButton, Typography, useMediaQuery } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Box } from '@mui/system'

type Props = {setValue:any,value?:string}

const ImageInput = (props: Props) => {
 
  const [open, setOpen] = useState<boolean>(false)
  const [selectedValue, setSelectedValue] = React.useState<string|undefined>();

useEffect(() => {
if( props.value){
  setSelectedValue(props.value)
}

}, [props])


const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = (value: string) => {
  setOpen(false);
  
  if(typeof value  === 'string' ){
    setSelectedValue(value); 
    props.setValue('image',value)   
  }

};

const isMobile=useMediaQuery("(max-width:600px)")
  return (
    <>
    
    {selectedValue&& <Box sx={{cursor:'pointer'}}   onClick={handleClickOpen}  >
      <Typography color={'GrayText'} >Selected:</Typography>
        <Image  loading="lazy" style={{objectFit:"cover",borderRadius:'20px'}} width={100} height={100} alt={selectedValue??''} src={selectedValue??''}/>
      </Box>}
      
    {!selectedValue&&  <Button  onClick={handleClickOpen} variant="contained" >
  Pick Image
</Button>}
<Dialog maxWidth={'md'} fullWidth  onClose={handleClose}  open={open}>
      <DialogTitle>Image Selector</DialogTitle>
      <ImageList sx={{width:'100%'}} gap={2} cols={isMobile?1:3} >
      {tripImages.map((image) => (
<ImageListItem   key={image.url} sx={{position:'relative',width:'100%',minHeight:'200px'}} >
  <ListItemButton  onClick={() => handleClose(image.url)}>
<Image  loading="lazy" style={{objectFit:"cover"}} fill sizes='300px' alt={image.type} src={image.url}/>
</ListItemButton>
</ImageListItem>
      ))}
      </ImageList>
     
    </Dialog>
    </>
  )
}

export default ImageInput