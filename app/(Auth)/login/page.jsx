"use client"
import React, { useRef } from 'react'
import { styled } from 'styled-components'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import AuthService from '@/app/lib/services/auth.service'

function Login() {
    const { push } = useRouter()

    const emailRef = useRef()
    const passwordRef = useRef()

    const submitForm = async(e) => {
        e.preventDefault();

        const email = emailRef?.current?.value
        const password = passwordRef?.current?.value

        try {
    
            if(email === '') {
                toast.error('Email is required, Kindly fill all fields');
                return false;
            }
    
            // "^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
                toast.error('Email is not valid');
                return false;
            }
    
            if( password === '') {
                toast.error('Password is required, Kindly fill all fields');
                return false;
            }
    
            if( password.length < 7 ) {
                toast.error('Password must not be less than 7 characters');
                return false;
            }

            const response = await AuthService.login(email, password)

            if(!response) return false
            
            toast.success('Login successful!!!')
            push('/dashboard/home')
            
    
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <Container>
            <FormContainer>
                <TitleContainer>Login</TitleContainer>
                <CustomInput placeholder='Enter Email...' type='text' ref={emailRef} />
                <CustomInput placeholder='Enter Password...' type='password' ref={passwordRef}/>
                <CustomButton onClick={(e) => submitForm(e)}> Submit </CustomButton>
            </FormContainer>
        </Container>
    )
}

export default Login

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1.5em;
`

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
`

const CustomInput = styled.input`
    min-width: 500px;
    min-height: 60px;
    padding:15px;

    border-radius: 15px;
    border: 1px solid skyblue;

    margin-top: 15px;
`

const CustomButton = styled.button`
    margin-top: 15px;
    height: 60px;

    font-size: 1.5em;
    border-radius: 10px;
    color: skyblue;
    background-color: white;
    border: 1px solid skyblue;
`