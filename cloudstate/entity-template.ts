import { cloudstate, invalidate, useCloud } from "freestyle-sh";

@cloudstate
export class EntityTemplate {
    id = crypto.randomUUID();
    entitytemplate: Record<string, string> = {};
    entitytemplateName: string = '';


    constructor(entityTemplate: Record<string, string>, entitytemplateName: string) {
        this.entitytemplate = entityTemplate;
        this.entitytemplateName = entitytemplateName;
    }


    getTemplate() {
        return {
            id: this.id,
            entitytemplate: this.entitytemplate,
            entitytemplateName: this.entitytemplateName
        };
    }

}

@cloudstate
export class EntityTemplateManager {
    id = crypto.randomUUID();
    templates = new Map<string, EntityTemplate>();

    constructor() {
        // Creating Company Template
        const company = new EntityTemplate(
            {
                name: "string",
                place: "string"
            },
            "company"
        );

        this.templates.set("company", company);
    }


    getTemplate(entityId: string) {
        return this.templates.get(entityId)?.getTemplate();
    }

}


@cloudstate
export class EntityData {
    id = crypto.randomUUID();
    dataList: Map<string, Record<string, string>> = new Map<string, Record<string, string>>();

    constructor(data: Record<string, string>) {
        // this.data = data;
        this.dataList.set(this.id, data);
    }

    getData() {
        return {
            id: this.id,
            data: this.dataList
        };
    }
}

@cloudstate
export class EntityDataManager {
    id = crypto.randomUUID();
    // Here  Company (Key) -> EntityData (Value) {<id, data>,<id, data>}
    entityDataList: Map<string, EntityData> = new Map<string, EntityData>();


}

@cloudstate
export class App {
    static id = "freeflow" as const;
    entityTemplateManagerList: Map<string, EntityTemplateManager> = new Map<string, EntityTemplateManager>();
    entityDataManagerList: Map<string, EntityDataManager> = new Map<string, EntityDataManager>();

}