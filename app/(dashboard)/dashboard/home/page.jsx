"use client"
import AuthService from "@/app/lib/services/auth.services";
import React, { useEffect, useState } from "react";
import styled from "styled-components"

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export default function Home() {

  return (
    <Container>
        <p>dashboard</p>
        <button>get Users</button>
    </Container>
  )
}

