import   React,{useEffect,useRef,createRef,useState, useContext, MouseEventHandler} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import PlaceCard from '../cards/PlaceCard';
import { Button, CircularProgress, FormControl, Grid, MenuItem, Rating, Select, SelectChangeEvent } from '@mui/material';
import { MapContext } from '@/context/map-context';
import { getPlaceData } from '@/hooks/data-hook';





interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export interface ListItems {
  id:string,
  liked:boolean,
  location:string,
  category:string,
  headImg:string,
  name:string,
  stars:string,
  reviews:string
}

export type PlaceList={attractions:Array<ListItems>,hotels:Array<ListItems>,restaurants:Array<ListItems>}




function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  const mapCtx= useContext(MapContext)


const onChangeHandler=(event: SelectChangeEvent<string>, child: React.ReactNode)=>{
mapCtx?.setRating(event.target.value)


}


  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box justifyContent={'center'} marginTop={2} p={3} pt={0} pb={0} display={'flex'} >
     <FormControl fullWidth >
  <Select
  inputProps={{ 'aria-label': 'Without label' }}
  defaultChecked={true}
    id="demo-simple-select"
    value={mapCtx?.rating}

    onChange={onChangeHandler}
  >
    <MenuItem value={'0'}>Any Rating</MenuItem>
    <MenuItem value={'3'}><Rating size='small' readOnly value={3}/></MenuItem>
    <MenuItem value={'4'}><Rating size='small' readOnly value={4}/></MenuItem>
    <MenuItem value={'4.5'}><Rating size='small' precision={0.5} readOnly value={4.5}/></MenuItem>
  </Select>
</FormControl>
</Box>
      {value === index && (
        <Grid    container sx={{ p: 3 }}>
          
          { mapCtx?.isLoading ? <Box width={"100%"} display={'flex'} justifyContent="center"><CircularProgress size={'5rem'}/></Box>: children}
         
        </Grid>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

type Props={
  likedIds:Set<string>
}
export default function List(props:Props) {
  const mapCtx= useContext(MapContext)
  const types:Array<'hotels'|"restaurants"|"attractions">= ['hotels',"restaurants","attractions"]
  
  const [value, setValue] = useState(0);

const [refs,setRefs]=useState<any>([]);


const elRefs =useRef([])

elRefs.current=[];

useEffect(() => {
  if(mapCtx=== null) return;
  if(!mapCtx.isLoading){
    setRefs((refs:any[]) => Array(mapCtx.placeList.length).fill("").map((_, i) => refs[i] || createRef()));
  }
}, [mapCtx?.placeList,mapCtx?.isLoading])




const loadHandler:MouseEventHandler =(e)=>{
 if (mapCtx===null)return;
  mapCtx?.setIsLoading(true)
  getPlaceData(mapCtx.bounds,mapCtx.type).then((values)=>{
console.log(values);
mapCtx?.setPlaceList(values)
mapCtx?.setIsLoading(false)})
}
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
  
    setValue(newValue);
    if(mapCtx=== null) return;

mapCtx.setType(types[newValue])

    mapCtx?.setIsLoading(true)
  getPlaceData(mapCtx.bounds,types[newValue]).then((values)=>{

mapCtx?.setPlaceList(values)
mapCtx?.setIsLoading(false)
  })
   
  };


  return (
    <>
    <Box overflow="scroll"  sx={{ width: '100%',padding:0,height:'calc(100vh - 60px)'}}> 

       <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={types.indexOf(mapCtx?.type??'hotels')?? value} onChange={handleChange} sx={{ '& .MuiTabs-indicator':{height:'100%'},'& .Mui-selected':{zIndex:1,color:'white !important'} ,'& .MuiTabs-flexContainer':{justifyContent:'center'}}} aria-label="basic tabs example">
          <Tab  sx={{textTransform:'capitalize'}}  label="Hotels" {...a11yProps(0)} />
          <Tab sx={{textTransform:'capitalize'}}  label="Restaurants" {...a11yProps(1)} />
          <Tab sx={{textTransform:'capitalize'}} label="Attractions" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel   value={value} index={0}>
       
      {mapCtx?.placeList.length===0&&!mapCtx?.isLoading&&<Box width={'100%'} justifySelf={'center'} sx={{margin:'0'}}><Button onClick={loadHandler} size='small' color="primary" sx={{textTransform:"capitalize",border:'1px solid',width:'100%'}} >Load Places...</Button></Box> }
         { 
       mapCtx?.placeList?.filter((place)=>place.name).map((place,i)=><Box  sx={{margin:'10px 0'}} width={'100%'} key={place.location_id+place.name}> <PlaceCard liked={props.likedIds.has(place.name+place.location_id)}  refEl={refs[i]} index={i} selected={Number(mapCtx?.childClicked)===i} type='restaurants'  place={place} /></Box>) 
}

      </TabPanel>
      <TabPanel   value={value} index={1}>
     
      {mapCtx?.placeList.length===0&&!mapCtx?.isLoading&&<Button onClick={loadHandler} size='small' color="primary" sx={{textTransform:"capitalize",border:'1px solid'}} >Load Places...</Button>}
          { 
       mapCtx?.placeList?.filter((place)=>place.name).map((place,i)=><Box sx={{margin:'10px 0'}} width={'100%'} key={place.location_id+place.name}><PlaceCard liked={props.likedIds.has(place.name+place.location_id)} index={i} refEl={refs[i]} selected={Number(mapCtx?.childClicked)===i} type='restaurants' key={place.location_id+place.name} place={place} /></Box> )
}

      </TabPanel>
      <TabPanel  value={value} index={2}>
      {mapCtx?.placeList.length===0&&!mapCtx?.isLoading&&<Button onClick={loadHandler} size='small' color="primary" sx={{textTransform:"capitalize",border:'1px solid'}} >Load Places...</Button>}
          { 
       mapCtx?.placeList?.filter((place)=>place.name).map((place,i)=><Box sx={{margin:'10px 0'}} width={'100%'} key={place.location_id+place.name}><PlaceCard liked={props.likedIds.has(place.name+place.location_id)} index={i} refEl={refs[i]} selected={Number(mapCtx?.childClicked)===i} type='restaurants' key={place.location_id+place.name} place={place} /> </Box> )
}
      </TabPanel>
      
      
    </Box>

    </>
  );
}

