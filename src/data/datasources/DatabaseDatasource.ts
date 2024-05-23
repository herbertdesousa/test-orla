import {CreateTodo} from '../../domain/entities/CreateTodo';
import {TodoModel} from '../model/TodoModel';

export interface DatabaseDatasource {
  createTodo(createTodo: CreateTodo): Promise<TodoModel>;
}
