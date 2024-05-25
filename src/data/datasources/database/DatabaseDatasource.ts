import { TodoModel, UpdateTodoModel } from '../../model/TodoModel';

export type CreateTodoRes = Promise<TodoModel | null>;

export type ListAllTodosRes = Promise<TodoModel[] | null>;

export type QueryAnyTodoFieldRes = Promise<TodoModel[] | null>;

export type UpdateTodoRes = Promise<TodoModel | null>;

export type DeleteTodoRes = Promise<TodoModel | null>;

export interface DatabaseDatasource {
  createTodo(createTodo: TodoModel): CreateTodoRes;

  listAllTodos(): ListAllTodosRes;

  queryAnyTodoField(query: string): QueryAnyTodoFieldRes;

  updateTodo(updateTodo: UpdateTodoModel): UpdateTodoRes;

  deleteTodo(id: string): DeleteTodoRes;
}
