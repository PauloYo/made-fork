import { Activity, isProcess, Model, Task, Process } from "../../../language/generated/ast.js";
import { AbstractApplication } from "./AbstractApplication.js";
import { Process as ProcessData, Activity as ActivityData, Task as TaskData } from "made-report-lib";
import { ProcessBuilder } from "./builders/ProcessBuilder.js";
import { ActivityBuilder } from "./builders/ActivityBuilder.js";
import { TaskBuilder } from "./builders/TaskBuilder.js";

export class ProcessApplication extends AbstractApplication {

    constructor(target_folder: string, model: Model) {
        super(target_folder, model)
        this.jsonFile = "process.json"
    }

    public async create() {
        const processes = this.model.components.filter(isProcess);

        await Promise.all(
            processes.map(async process => {
                const instance = await this.createProcess(process)
                await this.saveorUpdate(instance)
            })
        );
    }

    private async createProcess(process: Process): Promise<ProcessData> {
        const activities = await Promise.all(
            process.activities.map(async activity => await this.createActivity(activity)) ?? []
        );

        return new ProcessBuilder()
            .setId(process.id)
            .setName(process.name ?? "")
            .setDescription(process.description ?? "")
            .setActivities(activities)
            .build();
    }

    private async createActivity(activity: Activity): Promise<ActivityData> {
        const tasks = await Promise.all(
            activity.tasks.map(async task => await this.createTask(task)) ?? []
        );

        return new ActivityBuilder()
            .setId(activity.id ?? "")
            .setName(activity.name ?? "")
            .setDescription(activity.description ?? "")
            .setTasks(tasks)
            .build();
    }

    private async createTask(task: Task): Promise<TaskData> {
        return new TaskBuilder()
            .setId(task.id ?? "")
            .setName(task.name ?? "")
            .setDescription(task.description ?? "")
            .build();
    }
}