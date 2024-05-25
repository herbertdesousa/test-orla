import { TodoModel, UpdateTodoModel } from '../../model/TodoModel';

export interface DatabaseDatasource {
  createTodo(createTodo: TodoModel): Promise<TodoModel>;

  listAllTodos(): Promise<TodoModel[]>;

  queryAnyTodoField(query: string): Promise<TodoModel[]>;

  updateTodo(updateTodo: UpdateTodoModel): Promise<TodoModel | null>;

  deleteTodo(id: string): Promise<TodoModel | null>;
}
