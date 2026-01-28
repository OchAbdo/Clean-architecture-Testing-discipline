import { Injectable} from "@nestjs/common";
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

    save(task: Task) {
        return this.repo.save(task);
    }

    create(task: Partial<Task>) {
        return this.repo.create(task);
    }

    delete(id : number){
        return this.repo.delete({id})
    }

    remove(task : Task){
        return this.repo.remove(task)
    }


}