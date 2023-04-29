import { Card} from '@mui/material';



type Props = {}

const SkyScanner = (props: Props) => {
 
    return (
        <>
       
        <Card  sx={{width:'60%',height:"max-content",padding:"10% 20%",overflowY:'scroll'}}  >
          
        <div
  data-skyscanner-widget="SearchWidget"
  data-locale="en-GB"
  data-market="UK"
  data-currency="GBP"
></div> 
        </Card>
        </>
      )
}

export default SkyScanner