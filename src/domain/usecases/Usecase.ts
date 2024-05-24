import { CacheDatasource } from '../../data/datasources/cache/CacheDatasource';
import { InMemoryDatabaseDatasource } from '../../data/datasources/database/InMemoryDatabaseDatasource';
import { TodoRepositoryImpl } from '../../data/repositories/TodoRepositoryImpl';
import { Result } from '../../utils/Result';
// import { CreateTodoUsecase } from './CreateTodoUsecase';
import { ListTodoUsecase } from './ListTodoUsecase';

export interface Usecase<Req, Res extends Result<any, any>> {
  execute(req: Req): Promise<Res>;
}

//

const todoDatasource = new InMemoryDatabaseDatasource();

const todoRepository = new TodoRepositoryImpl(
  todoDatasource,
  new CacheDatasource(),
);

// const createTodoUsecase = new CreateTodoUsecase(todoRepository);
const listTodoUsecase = new ListTodoUsecase(todoRepository);

export const Usecases = {
  todo: {
    // create: createTodoUsecase,
    list: listTodoUsecase,
  },
};
