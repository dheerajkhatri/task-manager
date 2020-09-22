import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTaskFilterDto } from './dto/get-task-dto-filter';
import { TaskStatusValidationPipe } from './pipes/task-status-validaton-pipe';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {}
    
    @Get()
    getAllTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto): Task[] {
        if(Object.keys(filterDto).length) {
            return this.taskService.getTaskWithFilters(filterDto);
        }
        return this.taskService.getAllTasks();
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.taskService.getTaskById(id);        
    }    

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
        return this.taskService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id:string): void {
        this.taskService.deleteTaskById(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id:string, 
                     @Body('status', TaskStatusValidationPipe) status:TaskStatus): Task {
        return this.taskService.updateTaskStatus(id, status);
    }

}
