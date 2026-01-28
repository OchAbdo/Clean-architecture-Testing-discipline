import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { TaskRepository } from './task.repository';
import { NotFoundException } from '@nestjs/common';

describe('TaskService', () => {
  let service: TaskService;

  let mockTaskRepo = {
    findOneById: jest.fn(),
    findAll: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
    remove: jest.fn(),
    findPaginated: jest.fn(),
    findbytitle: jest.fn()
  }

  const mockTask = {
    id: 1,
    title: 'Test task',
    discrption: 'task',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskService,
        { provide: TaskRepository, useValue: mockTaskRepo }
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
    jest.clearAllMocks()
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('should create a new task', async () => {
    mockTaskRepo.create.mockReturnValue(mockTask);
    mockTaskRepo.save.mockResolvedValue(mockTask);

    const result = await service.CreateTask({ title: 'Test task', discrption: 'task' } as any);

    expect(mockTaskRepo.create).toHaveBeenCalled();
    expect(mockTaskRepo.save).toHaveBeenCalledWith(mockTask);
    expect(result).toEqual(mockTask);
  });

  it('should throw NotFoundException when task not found', async () => {
    mockTaskRepo.findOneById.mockResolvedValue(null);

    await expect(service.FindbyId(1)).rejects.toThrow(NotFoundException);
  });

  it('should return task by id', async () => {
    mockTaskRepo.findOneById.mockResolvedValue(mockTask);

    const result = await service.FindbyId(1);

    expect(result).toEqual(mockTask);
    expect(mockTaskRepo.findOneById).toHaveBeenCalledWith(1);
  });

  it('should return all tasks', async () => {
    const tasks = [{ id: 1 }, { id: 2 }];

    mockTaskRepo.findAll.mockResolvedValue(tasks);

    const result = await service.FindAllTask();

    expect(mockTaskRepo.findAll).toHaveBeenCalled();
    expect(result).toEqual(tasks);
  });

  it('should return paginated tasks', async () => {
    const paginatedResult = {
      data: [{ id: 1 }],
      meta: {
        page: 1,
        limit: 10,
        total: 1,
        totalPages: Math.ceil(1 / 10),
      }
    };

    mockTaskRepo.findPaginated.mockResolvedValue(paginatedResult);

    const result = await service.getTasks({ page: 1, limit: 10 });

    expect(mockTaskRepo.findPaginated).toHaveBeenCalledWith(1, 10);
    //expect(result).toEqual(paginatedResult);
  });


  it('should find tasks by title', async () => {
    const tasks = [{ id: 1, title: 'test' , descrption:'task' }];

    mockTaskRepo.findbytitle.mockResolvedValue(tasks);

    const result = await service.getTaskbyTitle('test');

    expect(mockTaskRepo.findbytitle).toHaveBeenCalledWith('test');
    expect(result).toEqual(tasks);
  });



});
