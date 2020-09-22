import { TaskStatus } from "../task.model";

export class GetTaskFilterDto {
    status: TaskStatus;
    searchTerm: string
}