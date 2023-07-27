// import './globals.css'
"use client";

import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Loading from './Loading';
import AuthService from './services/auth.services';

const authenticatedRoutes = [
  '/dashboard/home',
]

export default function RequireAuth({ children }) {
  const [user, setUser] = useState({});

  const currentUser = AuthService.getCurrentUser();

    const pathname = usePathname();
    const router = useRouter()
    console.log("current user: " , currentUser)


    useEffect(() => {
        if(!currentUser){
            if(authenticatedRoutes.includes(pathname)){
                router.push('/login')
            }
        }

        if(currentUser) {
            setUser(currentUser)
        }
    },[])

  if(!user) return <Loading />

    return (
    <>
        {children}
    </>
    );
}
