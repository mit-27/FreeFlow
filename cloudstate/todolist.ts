import { cloudstate, invalidate, useCloud } from "freestyle-sh";


@cloudstate
export class TodoItem {
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
export class TodoList {
    static id = "todoList";

    items: TodoItem[] = [];

    async addItem(text: string) {
        this.items.push(new TodoItem(text));
        invalidate(useCloud("todoList").getItems);
    }

    getItems() {
        return this.items.map(item => item.getInfo());
    }

    toggleItem(id: string) {
        const item = this.items.find(item => item.id === id);
        if (item) {
            item.toggle();
        }
    }
}


