"use client";
// import SignIn from "@/components/signIn";
import { useCloud } from "freestyle-sh";
import {useCloudQuery} from 'freestyle-sh/react'
import { TodoList } from "@/cloudstate/todolist";
import { useEffect, useState } from "react";


export default function Home() {
  const todoList = useCloud<typeof TodoList>("todoList");
  const {data: items,mutate } = useCloudQuery(todoList.getItems);
  const [itemDescription, setItemDescription] = useState<string>("");


  const addItem = async () => {
    if(itemDescription==="") return;
    // mutate([...items,{id:crypto.randomUUID(),text:itemDescription,completed:false}])
    await todoList.addItem(itemDescription);
    console.log("item Added xzx")
    setItemDescription("");
  };

  useEffect(() => {

    console.log(items)

  },[items])

  const changeItemToggle = async (id: string) => {
    await todoList.toggleItem(id);
  }

  return (
      <div className="min-h-screen flex justify-center flex-col items-center">
          <h1>Todo List</h1>
          <div className="flex">
          <input type="string" onChange={(e) => setItemDescription(e.target.value)} />
          <button onClick={() => addItem()}>Add Item</button>
          </div>
          <ul>
              {items ? items.map(item => (
                  <li key={item.id}>
                      <input type="checkbox" checked={item.completed} onChange={() => changeItemToggle(item.id)}  />
                      {item.text}
                  </li>
              )) : (<>Loading</>)}
          </ul>
      </div>
  );
}
