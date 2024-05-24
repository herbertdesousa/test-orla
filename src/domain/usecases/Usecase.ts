import { InMemoryCacheDatasource } from '../../data/datasources/cache/InMemoryCacheDatasource';
import { InMemoryDatabaseDatasource } from '../../data/datasources/database/InMemoryDatabaseDatasource';
import { TodoRepositoryImpl } from '../../data/repositories/TodoRepositoryImpl';
import { Result } from '../../utils/Result';
import { CreateTodoUsecase } from './CreateTodoUsecase';
// import { CreateTodoUsecase } from './CreateTodoUsecase';
import { ListTodoUsecase } from './ListTodoUsecase';
import { ValidationCreateTodoUsecase } from './ValidationCreateTodoUsecase';

export interface Usecase<Req, Res extends Result<any, any>> {
  execute(req: Req): Promise<Res>;
}

//

const todoDatasource = new InMemoryDatabaseDatasource();

const todoRepository = new TodoRepositoryImpl(
  todoDatasource,
  new InMemoryCacheDatasource(),
);

const validationCreateTodoUsecase = new ValidationCreateTodoUsecase();
const createTodoUsecase = new CreateTodoUsecase(
  todoRepository,
  validationCreateTodoUsecase,
);
const listTodoUsecase = new ListTodoUsecase(todoRepository);

export const Usecases = {
  todo: {
    create: createTodoUsecase,
    list: listTodoUsecase,
    validate: validationCreateTodoUsecase,
  },
};
