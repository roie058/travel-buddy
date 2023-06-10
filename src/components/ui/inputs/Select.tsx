import { Box,  FormControl, Autocomplete, AutocompleteChangeDetails, AutocompleteChangeReason, TextField, FormHelperText } from '@mui/material'
import React, { useState } from 'react'
import ToolTip from '../ToolTip'
import { useTranslation } from 'next-i18next'



type Props = {data:any[],inputRef:any,setValue:any}

const SelectInput = (props: Props) => {
  const {t}=useTranslation("form")
const [value,setValue]=useState<undefined|string[]>()
  const handleChange:((event: React.SyntheticEvent<Element, Event>, value: Array<{label:string,value:string}>, reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails<unknown> | undefined) => void) = (event,value) => {
    props.setValue('type',value.map((item)=>item.value))
    setValue(value.map((item)=>item.value))
  };


  return (
    <FormControl fullWidth >
      <ToolTip title={t("typeTooltip")}>
    <Autocomplete
    onChange={handleChange}
      multiple 
      
      isOptionEqualToValue={(option,value)=>(option.value===value.value)}
      options={props.data}
      renderInput={(params)=><TextField  error={value?.length>3}  label={t("type")} {...params} id="select-multiple-chip" />}
      renderOption={(props, option) => 
        {
        return(
        <Box component="li"  sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          <option value={option.value}>
          {option.label}
          </option>
          
        </Box>
      )}
    }
   />
   </ToolTip>
  <FormHelperText sx={{color:'#d32f2f'}}>{(value?.length>3)?t("errors.typeMax"):''}</FormHelperText>
  </FormControl>

  )
}

export default SelectInput