import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Task } from "./task.entity";

@Injectable()
export class TaskRepository {
    private repo: Repository<Task>

    constructor(private datasource: DataSource) {
        this.repo = datasource.getRepository(Task)
    }

    findOneById(id: number) {
        return this.repo.findOneBy({ id });
    }

    findAll() {
        return this.repo.find()
    }

    save(task: Task) {
        return this.repo.save(task);
    }

    create(task: Partial<Task>) {
        return this.repo.create(task);
    }

    delete(id: number) {
        return this.repo.delete({ id })
    }

    remove(task: Task) {
        return this.repo.remove(task)
    }

    async findPaginated(page: number, limit: number){
        const skip = (page - 1) * limit;

        const [data, total] = await this.repo.findAndCount({
            skip,
            take: limit,
            order: { createdAt: 'DESC' },
        });

        return { data, total };
    }

    findbytitle(title : string){
        return this.repo.findBy({title})
    }


}