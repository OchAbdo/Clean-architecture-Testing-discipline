import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { CreateTask } from './dtos/create-task.dto';
import { UpdateTask } from './dtos/update-task.dto';
import { PaginationDto } from './dtos/pagination.dto';

@Injectable()
export class TaskService {
    constructor(private repository: TaskRepository) { }

    FindAllTask(): Promise<Task[]> {
        return this.repository.findAll()
    }

    async FindbyId(id: number): Promise<Task> {
        const existtask = await this.repository.findOneById(id)
        if (!existtask) {
            throw new NotFoundException(`Task with id ${id} is not found!`)
        }
        return existtask;
    }

    CreateTask(newtask: CreateTask): Promise<Task> {

        const task = this.repository.create({ ...newtask, createdAt: new Date(Date.now()), updatedAt: new Date(Date.now()) })
        return this.repository.save(task)
    }

    async Update(id: number, task: UpdateTask): Promise<Task> {
        const existTask = await this.repository.findOneById(id)
        if (!existTask) {
            throw new NotFoundException(`Task with id ${id} is not found!`)
        }
        Object.assign(existTask, { ...task, updatedAt: new Date(Date.now()) })
        return this.repository.save(existTask)
    }

    Delete(id: number) {
        this.repository.delete(id)
    }

    async Remove(id: number): Promise<Task> {
        const existtask = await this.repository.findOneById(id)
        if (!existtask) {
            throw new NotFoundException(`Task with id ${id} is not found!`)
        }
        return this.repository.remove(existtask)
    }

    async getTasks(pagination: PaginationDto) {
        const { page, limit } = pagination;

        const { data, total } = await this.repository.findPaginated(page, limit);

        if(Math.ceil(total / limit) < page){
            throw new NotFoundException("this Page is not found !")
        }

        return {
            data,
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    getTaskbyTitle(title : string){
        return this.repository.findbytitle(title)
    }
}
