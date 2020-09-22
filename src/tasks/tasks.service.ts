import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTaskFilterDto } from './dto/get-task-dto-filter';

@Injectable()
export class TasksService {
    private tasks:Task[] = [];
    
    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTaskWithFilters(filterDto: GetTaskFilterDto): Task[] {
        const {status, searchTerm} = filterDto;
        let tasks = this.tasks;
        if(status) {
            tasks = tasks.filter(task => task.status === status);
        }
        if(searchTerm) {
            tasks = tasks.filter(task => 
                task.title.includes(searchTerm) ||
                task.description.includes(searchTerm))
        }
        return tasks;
    }

    getTaskById(id: string): Task {
        const found = this.tasks.find(task => task.id === id);
        if(!found) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
        return found;
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const {title, description} = createTaskDto;

        const task: Task = {
            id: uuid.v1(),
            title,
            description,
            status: TaskStatus.OPEN
        }
        this.tasks.push(task);
        return task;
    }

    deleteTaskById(id: string): void {
        const found = this.getTaskById(id);
        this.tasks = this.tasks.filter(task => task.id !== id);
    }

    updateTaskStatus(id: string, status: TaskStatus) {
        let task = this.getTaskById(id);
        task.status = status;
        return task;
    }
}
