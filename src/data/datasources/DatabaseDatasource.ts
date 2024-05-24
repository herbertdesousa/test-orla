import { CreateTodo } from '../../domain/entities/Todo';
import { TodoModel } from '../model/TodoModel';

export interface DatabaseDatasource {
  createTodo(createTodo: CreateTodo): Promise<TodoModel>;
}
