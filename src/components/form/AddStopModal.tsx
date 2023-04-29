
import { IPlace } from '@/dummyData';
import { Avatar, Dialog, DialogTitle, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material'
import Image from 'next/image';
import React from 'react'
import { UserAddedItem } from '../ui/calender/UserAddedNote';

import UserAddedNoteForm from './UserAddedNoteForm';


type Props = { open: boolean;
   onSubmit:(value:IPlace)=>void,
    onClose: () => void,
likedList:Array<IPlace>
}

const AddStopModal = (props: Props) => {
    const { onClose, onSubmit, open,likedList } = props;


    const handleClose = () => {
        onClose();
      };
    
      const handleListItemClick = (value: IPlace|UserAddedItem) => {
        onSubmit(value);
      };

      


  return (
    <Dialog sx={{zIndex:1000}}  onClose={handleClose} open={open}>
    <DialogTitle>Pick</DialogTitle>

<ListItem>
  <UserAddedNoteForm onSubmit={handleListItemClick}/>
</ListItem>



    <List sx={{ pt: 0 }}>
      {likedList.map((email) => (
        <ListItem key={email.name} disableGutters>
          <ListItemButton onClick={() => handleListItemClick(email)} key={email.name}>
            <ListItemAvatar>
              <Avatar  >
              <Image style={{objectFit:"cover"}} alt={email.name} fill sizes='50vw'  src={email.photo.images.small.url}/> 
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={email.name} />
          </ListItemButton>
        </ListItem>
      ))}
      
    </List>
  </Dialog>
  )
}

export default AddStopModal