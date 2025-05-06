import { Process, Activity } from "made-report-lib";

export class ProcessBuilder {
    private process: Partial<Process> = {};

    setId(id: string): ProcessBuilder {
        this.process.id = id;
        return this;
    }

    setName(name: string): ProcessBuilder {
        this.process.name = name;
        return this;
    }

    setDescription(description: string): ProcessBuilder {
        this.process.description = description;
        return this;
    }

    setActivities(activities: Activity[]): ProcessBuilder {
        this.process.activities = activities;
        return this;
    }

    build(): Process {
        if (!this.process.id || !this.process.name) {
            throw new Error("Process must have an ID and a name.");
        }
        return this.process as Process;
    }
}