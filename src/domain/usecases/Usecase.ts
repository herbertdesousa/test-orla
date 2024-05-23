import {InMemoryDatabaseDatasource} from '../../data/datasources/InMemoryDatabaseDatasource';
import {TodoRepositoryImpl} from '../../data/repositories/TodoRepositoryImpl';
import {Result} from '../../utils/Result';
import {CreateTodoUsecase} from './CreateTodoUsecase';

export interface Usecase<Req, Res extends Result<any, any>> {
  execute(req: Req): Promise<Res>;
}

//

const todoDatasource = new InMemoryDatabaseDatasource();

const todoRepository = new TodoRepositoryImpl(todoDatasource);

const createTodoUsecase = new CreateTodoUsecase(todoRepository);

export const Usecases = {
  todo: {
    create: createTodoUsecase,
  },
};
