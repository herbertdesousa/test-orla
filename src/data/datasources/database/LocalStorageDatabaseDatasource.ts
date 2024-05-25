import AsyncStorage from '@react-native-async-storage/async-storage';
import { TodoModel, UpdateTodoModel } from '../../model/TodoModel';
import {
  CreateTodoRes,
  DatabaseDatasource,
  DeleteTodoRes,
  ListAllTodosRes,
  QueryAnyTodoFieldRes,
  UpdateTodoRes,
} from './DatabaseDatasource';
import { z } from 'zod';

const key = '@DATABASE_TODO';

type SerializeSchemas = z.ZodObject<any> | z.ZodArray<any>;

export class LocalStorageDatabaseDatasource implements DatabaseDatasource {
  private serializeFrom<Z extends SerializeSchemas>(
    data: string,
    model: Z,
  ): Z['_type'] | null {
    const result = model.safeParse(JSON.parse(data));

    if (!result.success) {
      return null;
    }

    return result.data;
  }

  private serializeTo(model: SerializeSchemas['_type']): string {
    return JSON.stringify(model);
  }

  async createTodo(createTodo: TodoModel): CreateTodoRes {
    const allTodos = await this.listAllTodos();

    if (allTodos === null) {
      return null;
    }

    allTodos.push(createTodo);

    await AsyncStorage.setItem(key, this.serializeTo(allTodos));

    return createTodo;
  }

  async listAllTodos(): ListAllTodosRes {
    const stored = await AsyncStorage.getItem(key);

    if (stored === null) {
      return [];
    }

    return this.serializeFrom(stored, z.array(TodoModel));
  }

  private normalize(str: string): string {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  }

  async queryAnyTodoField(query: string): QueryAnyTodoFieldRes {
    const allTodos = await this.listAllTodos();

    if (allTodos === null) {
      return null;
    }

    const queryNorm = this.normalize(query);

    const queried = allTodos.filter(todo => {
      return [
        this.normalize(todo.title),
        this.normalize(todo.status),
        this.normalize(todo.describe),
        // String(todo.createdAt),
        // String(todo.updatedAt),
      ].some(field => field.includes(queryNorm));
    });

    return queried;
  }

  async updateTodo(payload: UpdateTodoModel): UpdateTodoRes {
    const allTodos = await this.listAllTodos();

    if (allTodos === null) {
      return null;
    }

    const todoIndex = allTodos.findIndex(todo => todo.id === payload.id);

    if (todoIndex === -1) {
      return null;
    }

    if (payload?.title !== undefined) {
      allTodos[todoIndex].title = payload.title;
    }
    if (payload?.describe !== undefined) {
      allTodos[todoIndex].describe = payload.describe;
    }
    if (payload?.status !== undefined) {
      allTodos[todoIndex].status = payload.status;
    }
    if (payload?.createdAt !== undefined) {
      allTodos[todoIndex].createdAt = payload.createdAt;
    }
    if (payload?.updatedAt !== undefined) {
      allTodos[todoIndex].updatedAt = payload.updatedAt;
    }

    await AsyncStorage.setItem(key, this.serializeTo(allTodos));

    return allTodos[todoIndex];
  }

  async deleteTodo(id: string): DeleteTodoRes {
    const allTodos = await this.listAllTodos();

    if (allTodos === null) {
      return null;
    }

    const todoIndex = allTodos.findIndex(todo => todo.id === id);

    if (todoIndex === -1) {
      return null;
    }

    const todo = allTodos[todoIndex];

    const filteredAllTodos = allTodos.filter(_todo => _todo.id !== id);

    await AsyncStorage.setItem(key, this.serializeTo(filteredAllTodos));

    return todo;
  }
}
