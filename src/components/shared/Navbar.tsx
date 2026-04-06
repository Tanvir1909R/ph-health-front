"use client"
import { Box, Container, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import AuthButton from '../ui/authButton/AuthButton'
import dynamic from 'next/dynamic'
import useUserInfo from '@/hooks/useUserInfo'

const Navbar = () => {
    const userInfo = useUserInfo();
    
  const AuthButton = dynamic(()=> import('../ui/authButton/AuthButton'),{ssr:false})
  return (
    <Container>
        <Stack py={2} direction="row" justifyContent='space-between' alignItems={'center'}>
            <Typography component="a" variant='h5' href='/'>
                <Box color="primary.main" component='span' fontWeight={700}>H</Box>ealth Care
            </Typography>
            <Stack direction='row' justifyContent='space-between' gap={4}>
                <Link href={'/'}>Consultation</Link>
                <Link href={'/'}>Health Plans </Link>
                <Link href={'/'}>Medicine</Link>
                <Link href={'/'}>Diagnostics</Link>
                <Link href={'/'}>NGOs</Link>
                 {userInfo?.email ? (
                     <Link
                        href='/dashboard'
                     >
                        Dashboard
                     </Link>
                  ) : null}
            </Stack>
            <AuthButton/>
        </Stack>
    </Container>
  )
}

export default Navbar