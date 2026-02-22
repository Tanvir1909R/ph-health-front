import PhFileUploader from '@/components/forms/PhFileUploader'
import PhForm from '@/components/forms/PhForm'
import PhInput from '@/components/forms/PhInput'
import PhModal from '@/components/shared/PhModal'
import { useCreateSpecialtyMutation } from '@/redux/api/specialtiesApi'
import { modifyPayload } from '@/utils/modifyPayload'
import { Button, Grid, Grid2, TextField } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import { FieldValues } from 'react-hook-form'
import { toast } from 'sonner'


type TProps = {
    open:boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
}

const SpecialtyModal = ({open,setOpen}:TProps) => {
  const [createSpecialty] = useCreateSpecialtyMutation()
  const handleFormSubmit = async(values:FieldValues) =>{
    const data = modifyPayload(values)
    try {
      const res = await createSpecialty(data).unwrap()
      if(res?.id){
        toast.success("Specialty created successfully")
        setOpen(false)
      }
    } catch (error:any) {
      console.log(error.message);
      
    }
    
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