import { Task } from "made-report-lib";

export class TaskBuilder {
    private task: Partial<Task> = {};

    setId(id: string): TaskBuilder {
        this.task.id = id;
        return this;
    }

    setName(name: string): TaskBuilder {
        this.task.name = name;
        return this;
    }

    setDescription(description: string): TaskBuilder {
        this.task.description = description;
        return this;
    }

    build(): Task {
        if (!this.task.id || !this.task.name) {
            throw new Error("Task must have an ID and a name.");
        }
        return this.task as Task;
    }
}