
import { IPlace } from '@/dummyData';
import { Avatar, Dialog, DialogTitle, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material'
import Image from 'next/image';
import React from 'react'
import { UserAddedItem } from '../ui/calender/UserAddedNote';

import UserAddedNoteForm from './UserAddedNoteForm';
import { useTranslation } from 'next-i18next';


type Props = { open: boolean;
   onSubmit:(value:UserAddedItem|IPlace)=>void
    onClose: () => void,
likedList:Array<IPlace>
}

const AddStopModal = (props: Props) => {
    const { onClose, onSubmit, open,likedList } = props;
    const {t}=useTranslation("day")

    const handleClose = () => {
        onClose();
      };
    
      const handleListItemClick = (value: IPlace|UserAddedItem) => {
        onSubmit(value);
      };

      


  return (
    <Dialog sx={{zIndex:1000}}  onClose={handleClose} open={open}>
    <DialogTitle>{t("pick")}</DialogTitle>

<ListItem>
  <UserAddedNoteForm onSubmit={handleListItemClick}/>
</ListItem>



    <List sx={{ pt: 0 }}>
      {likedList.map((email) => (
        <ListItem key={email.name} disableGutters>
          <ListItemButton onClick={() => handleListItemClick(email)} key={email.name}>
            <ListItemAvatar>
              <Avatar  >
              <Image priority style={{objectFit:"cover"}} alt={email.name} fill sizes='50px'  src={email.photo.images.small.url}/> 
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