"use client"

import { SignOutButton } from '@clerk/nextjs'
import { useCloud } from "freestyle-sh";
import { DataBaseApp } from "@/cloudstate/entity-template";
import { useEffect } from 'react';

const page = () => {

    const db = useCloud<typeof DataBaseApp>("freeflow");


    const onFetchClick = async () => {
        const data = await db.getEntityDataManagerList("Msd");
        console.log(data);
    }


   


    return (
        <div className='flex flex-col'>
            Protected Route in dashboard
            <SignOutButton redirectUrl='/'/>
            <div>
                <button onClick={() => onFetchClick()}>Fetch the Data</button>
            </div>
        </div>
    )
}


export default page