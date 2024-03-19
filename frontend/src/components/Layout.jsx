import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import {  Outlet } from 'react-router-dom'

const Layout = () => {
    const [isLogined,setIsLogined] = useState(false);
    useEffect(() =>{
        setIsLogined( localStorage.getItem('userToken') !== null);
    },[isLogined])

    return (
        <div>
            <section>
                <Outlet  context={[isLogined, setIsLogined]} />
            </section>
        </div>
    )
}

export default Layout
