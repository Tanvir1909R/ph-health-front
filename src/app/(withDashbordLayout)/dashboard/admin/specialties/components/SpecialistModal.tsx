import PhFileUploader from '@/components/forms/PhFileUploader'
import PhForm from '@/components/forms/PhForm'
import PhInput from '@/components/forms/PhInput'
import PhModal from '@/components/shared/PhModal'
import { Button, Grid, Grid2, TextField } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import { FieldValues } from 'react-hook-form'


type TProps = {
    open:boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
}

const SpecialtyModal = ({open,setOpen}:TProps) => {
  const handleFormSubmit = (values:FieldValues) =>{
    console.log(values);
    
  }
  return (
    <PhModal open={open} setOpen={setOpen} title="Create A New Specialty">
        <PhForm onSubmit={handleFormSubmit}>
            <Grid container spacing={2}>
              <Grid item md={6}>
                <PhInput name='title' label='Title' />
              </Grid>
              <Grid item md={6}>
                <PhFileUploader name='file' label='Upload File' />
              </Grid>
            </Grid>
            <Button type='submit' sx={{mt:1}}>Create</Button>
        </PhForm>
    </PhModal>
  )
}

export default SpecialtyModal