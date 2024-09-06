import { cloudstate, invalidate, useCloud } from "freestyle-sh";



export interface tempObj {
    [key: string]: any;
};


@cloudstate
export class TodoItemEntity {
    id = crypto.randomUUID();
    text: string;
    completed = false;

    constructor(text: string) {
        this.text = text;
    }

    toggle() {
        this.completed = !this.completed;
        invalidate(useCloud(this.id).getInfo);
        invalidate(useCloud("todoList").getItems);
    }

    getInfo() {
        return {
            id: this.id,
            text: this.text,
            completed: this.completed
        };
    }

}


@cloudstate
export class TodoItem {
    id = crypto.randomUUID();
    items: TodoItemEntity[] = [];

    constructor() {

    }

    getitems() {
        return this.items.map(item => item.getInfo());
    }

    addItem(text: string) {
        this.items.push(new TodoItemEntity(text));
        invalidate(useCloud(this.id).getInfo);
        invalidate(useCloud("todoList").getItems);
    }

    toggleItemById(id: string) {
        const item = this.items.find(item => item.id === id);
        if (item) {
            item.toggle();
        }
    }
}
@cloudstate
export class TodoList {
    static id = "todoList";
    items = new Map<string, TodoItem>();
    // items: TodoItem[] = [];



    async addItem(text: string) {
        if (this.items.has("msd")) {
            this.items.get("msd")?.addItem(text);
        }
        else {
            const todoItem = new TodoItem();
            todoItem.addItem(text);
            this.items.set("msd", todoItem);
        }
        // this.items.push(new TodoItem(text));
        // invalidate(useCloud("todoList").getItems);
    }

    getItems() {
        // return this.items.map(item => item.getInfo());
        return this.items.get("msd")?.getitems();

    }

    toggleItem(id: string) {
        return this.items.get("msd")?.toggleItemById(id);
    }
}


@cloudstate
export class Temp {
    id = crypto.randomUUID();
    // static id = "temp" as const;
    tempArr: Map<string, Record<string, string>> = new Map<string, Record<string, string>>();

    async addObj(objName: { [key: string]: string }) {
        // this.tempArr = objName;
        this.tempArr.set(crypto.randomUUID(), objName);
        invalidate(useCloud("temp").getObjs);
        return objName;
    }

    async getObjs() {
        // return Array.from(this.tempArr.values());
        return Array.from(this.tempArr.values());
    }
}



