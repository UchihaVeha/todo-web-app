import {
  createTodo,
  createTodoSuccess,
  updateTodo,
  updateTodoSuccess,
  loadTodos,
  loadTodosSuccess
} from './actions';

describe('modules/todo/actions', () => {
  it('should handle createTodo', () => {
    expect(createTodo({ id: 1 })).toEqual({
      type: 'todo/CREATE_TODO_REQUEST',
      todo: { id: 1 }
    });
  });

  it('should handle createTodoSuccess', () => {
    expect(
      createTodoSuccess({ name: 'prev' }, { name: 'next' }, { name: 'tags' })
    ).toEqual({
      type: 'todo/CREATE_TODO_SUCCESS',
      prevTodo: { name: 'prev' },
      nextTodo: { name: 'next' },
      tags: { name: 'tags' }
    });
  });

  it('should handle updateTodo', () => {
    expect(updateTodo({ id: 1 })).toEqual({
      type: 'todo/UPDATE_TODO_REQUEST',
      todo: { id: 1 }
    });
  });

  it('should handle updateTodoSuccess', () => {
    expect(
      updateTodoSuccess({ name: 'prev' }, { name: 'next' }, { name: 'tags' })
    ).toEqual({
      type: 'todo/UPDATE_TODO_SUCCESS',
      prevTodo: { name: 'prev' },
      nextTodo: { name: 'next' },
      tags: { name: 'tags' }
    });
  });

  it('should handle loadTodos', () => {
    expect(loadTodos('date')).toEqual({
      type: 'todo/LOAD_TODOS_REQUEST',
      onDate: 'date'
    });
  });

  it('should handle loadTodosSuccess', () => {
    expect(
      loadTodosSuccess({ 1: { name: 'todo' } }, [1], 'date', {
        1: { name: 'tag' }
      })
    ).toEqual({
      type: 'todo/LOAD_TODOS_SUCCESS',
      todos: { 1: { name: 'todo' } },
      todoIds: [1],
      onDate: 'date',
      tags: { 1: { name: 'tag' } }
    });
  });
});
