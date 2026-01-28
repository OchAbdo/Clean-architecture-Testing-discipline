import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entity';
import { CreateTask } from './dtos/create-task.dto';
import { UpdateTask } from './dtos/update-task.dto';

@Controller('task')
export class TaskController {

    constructor(private serviceTask : TaskService){}

    @Get('/all')
    GetAllTask() : Promise<Task[]>{
        return this.serviceTask.FindAllTask()
    }

    @Post('/add')
    AddTask(@Body() task : CreateTask ) : Promise<Task>{
        return this.serviceTask.CreateTask(task)
    }

    @Patch('/update/:id')
    UpdateTask(@Param('id') id : number , @Body() task : UpdateTask) : Promise<Task> {
        return this.serviceTask.Update(id , task)
    }

    @Delete('/:id')
    RemoveTask(@Param('id') id : number) : Promise<Task>{
        return this.serviceTask.Remove(id)
    }





}
