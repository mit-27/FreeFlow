"use client"
import React from 'react'
// export const dynamic = "force-dynamic";
import { useCloud } from "freestyle-sh";
import {useCloudQuery} from 'freestyle-sh/react'
import { EntityDataManager } from "@/cloudstate/dynamicobjects";
import { Button } from '@/components/ui/button';



export default function page() {

  const entityDataManager = useCloud<typeof EntityDataManager>("entityDataManager");
  const {data : myData } = useCloudQuery(entityDataManager.getDataByEntityId);


  const addDymmyData = async () => {
    const data = ["Mit","Suthar"];

    const res = await entityDataManager.addData("company",{
      name: data[0],
      place: data[1]
    });

    console.log(res)
  }




  return (
    <div className='min-h-screen flex justify-center items-center'>
        <div>{myData && JSON.stringify(myData)}</div>
        <Button onClick={() => addDymmyData()}>Add dummy Data</Button>
    </div>
  )
}
