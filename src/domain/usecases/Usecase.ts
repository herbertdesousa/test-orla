import { InMemoryCacheDatasource } from '../../data/datasources/cache/InMemoryCacheDatasource';
import { LocalStorageDatabaseDatasource } from '../../data/datasources/database/LocalStorageDatabaseDatasource';
import { TodoRepositoryImpl } from '../../data/repositories/TodoRepositoryImpl';
import { Result } from '../../utils/Result';
import { CreateTodoUsecase } from './CreateTodoUsecase';
import { DeleteTodoUsecase } from './DeleteTodoUsecase';
import { ListTodoUsecase } from './ListTodoUsecase';
import { UpdateTodoUsecase } from './UpdateTodoUsecase';
import { ValidationCreateTodoUsecase } from './ValidationCreateTodoUsecase';
import { ValidationUpdateTodoUsecase } from './ValidationUpdateTodoUsecase';

export interface Usecase<Req, Res extends Result<any, any>> {
  execute(req: Req): Promise<Res>;
}

//

const todoRepository = new TodoRepositoryImpl(
  new LocalStorageDatabaseDatasource(),
  new InMemoryCacheDatasource(),
);

const validationCreateTodoUsecase = new ValidationCreateTodoUsecase();
const validationUpdateTodoUsecase = new ValidationUpdateTodoUsecase();
const createTodoUsecase = new CreateTodoUsecase(
  todoRepository,
  validationCreateTodoUsecase,
);
const updateTodoUsecase = new UpdateTodoUsecase(
  todoRepository,
  validationUpdateTodoUsecase,
);
const listTodoUsecase = new ListTodoUsecase(todoRepository);
const deleteTodoUsecase = new DeleteTodoUsecase(todoRepository);

export const Usecases = {
  todo: {
    create: createTodoUsecase,
    update: updateTodoUsecase,
    list: listTodoUsecase,
    validateCreate: validationCreateTodoUsecase,
    validateUpdate: validationUpdateTodoUsecase,
    delete: deleteTodoUsecase,
  },
};
