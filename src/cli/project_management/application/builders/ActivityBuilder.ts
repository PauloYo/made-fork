import { Activity, Task } from "made-report-lib";

export class ActivityBuilder {
    private activity: Partial<Activity> = {};

    setId(id: string): ActivityBuilder {
        this.activity.id = id;
        return this;
    }

    setName(name: string): ActivityBuilder {
        this.activity.name = name;
        return this;
    }

    setDescription(description: string): ActivityBuilder {
        this.activity.description = description;
        return this;
    }

    setTasks(tasks: Task[]): ActivityBuilder {
        this.activity.tasks = tasks;
        return this;
    }

    build(): Activity {
        if (!this.activity.id || !this.activity.name) {
            throw new Error("Activity must have an ID and a name.");
        }
        return this.activity as Activity;
    }
}