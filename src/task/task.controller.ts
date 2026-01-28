import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entity';
import { CreateTask } from './dtos/create-task.dto';
import { UpdateTask } from './dtos/update-task.dto';
import { PaginationDto } from './dtos/pagination.dto';

@Controller('task')
export class TaskController {

    constructor(private serviceTask: TaskService) { }

    @Get('/all')
    GetAllTask(): Promise<Task[]> {
        return this.serviceTask.FindAllTask()
    }

    @Get('/pagination')
    getAllTasks(@Query() pagination: PaginationDto) {
        return this.serviceTask.getTasks(pagination);
    }

    @Get('/search')
    getTaskbyTitle(@Query('title') title : string){
        return this.serviceTask.getTaskbyTitle(title)
    }

    @Post('/add')
    AddTask(@Body() task: CreateTask): Promise<Task> {
        return this.serviceTask.CreateTask(task)
    }

    @Patch('/update/:id')
    UpdateTask(@Param('id') id: number, @Body() task: UpdateTask): Promise<Task> {
        return this.serviceTask.Update(id, task)
    }

    @Delete('/:id')
    RemoveTask(@Param('id') id: number): Promise<Task> {
        return this.serviceTask.Remove(id)
    }





}
