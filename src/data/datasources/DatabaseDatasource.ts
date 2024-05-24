import { TodoModel } from '../model/TodoModel';

export interface DatabaseDatasource {
  createTodo(createTodo: TodoModel): Promise<TodoModel>;

  listAllTodos(): Promise<TodoModel[]>;
}
