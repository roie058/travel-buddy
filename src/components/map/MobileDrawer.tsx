import * as React from 'react';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';

import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { IPlace } from '@/dummyData';
import PlaceCard from '../ui/cards/PlaceCard';
import { MapContext } from '@/context/map-context';

const drawerBleeding = 56;

interface Props {
open:boolean,
setOpen:React.Dispatch<React.SetStateAction<boolean>>,
selectedPlace?:IPlace
}



const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));

export default function MobileDrawer({open,setOpen,selectedPlace}: Props) {
const mapCtx=React.useContext(MapContext)
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
const anchor='bottom'

  return (
   <>
      <CssBaseline />    
      <SwipeableDrawer
      disablePortal 
    
      sx={{overflow:'visible'}}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
          sx:{...{
            '& > .MuiPaper-root': {
              height:`calc(70% - ${drawerBleeding}px)`,
              overflow: 'visible',
            },
          }}
        }}
      >
        <StyledBox
          sx={{
            position: 'absolute',
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            right: 0,
            left: 0,
          }}
        >
          <Puller />
        { selectedPlace&& <Typography sx={{ p: 2, color: 'text.secondary' }}>{selectedPlace.name}</Typography>}
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: '100%',
            overflow: 'auto',
          }}
        >
         {selectedPlace? <PlaceCard place={selectedPlace} type={(selectedPlace.category.key??'hotel')+'s'}/>:<Skeleton variant="rectangular"/>}
        </StyledBox>
      </SwipeableDrawer>
    
    </>
  );
}