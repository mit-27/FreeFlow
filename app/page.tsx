"use client";
// import SignIn from "@/components/signIn";
import { useCloud } from "freestyle-sh";
import {useCloudQuery} from 'freestyle-sh/react'
import { TodoList,Temp } from "@/cloudstate/todolist";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";


export default function Home() {
  const todoList = useCloud<typeof TodoList>("todoList");
  const tempList = useCloud<typeof Temp>("temp");

  const {data: items,mutate } = useCloudQuery(todoList.getItems);
  const {data: tempItems,mutate: mutateTemp } = useCloudQuery(tempList.getObjs);
  const [itemDescription, setItemDescription] = useState<string>("");


  const addItem = async () => {
    if(itemDescription==="") return;
    // mutate([...items,{id:crypto.randomUUID(),text:itemDescription,completed:false}])
    await todoList.addItem(itemDescription);
    console.log("item Added xzx")
    setItemDescription("");
  };

  const tempAddItem = async () => {
    const res = await tempList.addObj({"name": "Mit Suthar","age" : "23"});
  };

  useEffect(() => {

    console.log(tempItems)

  },[tempItems])

  const changeItemToggle = async (id: string) => {
    await todoList.toggleItem(id);
  }

  return (
      <div className="min-h-screen flex justify-center flex-col items-center">
          <h1>Todo List</h1>
          <div className="flex flex-col gap-3">
          <input type="string" onChange={(e) => setItemDescription(e.target.value)} />
          <button onClick={() => addItem()}>Add Item</button>
          {/* <button onClick={() => tempAddItem()}>Add Temp Obj</button> */}
          <Button onClick={() => tempAddItem()}>Add Temp Obj</Button>

          </div>


          {/* <ul>
              {items ? items.map(item => (
                  <li key={item.id}>
                      <input type="checkbox" checked={item.completed} onChange={() => changeItemToggle(item.id)}  />
                      {item.text}
                  </li>
              )) : (<>Loading</>)}
          </ul> */}
      </div>
  );
}
