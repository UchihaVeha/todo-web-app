import { OrderedSet, Map } from 'immutable';
import {
  isPendingReducer as isPending,
  isLoadingByOnDateReducer as isLoadingByOnDate,
  byOnDateReducer as byOnDate,
  entitiesReducer as entities,
  createTodoRecord
} from './reducers';

describe('Todo reducers', () => {
  describe('help function createTodoRecord', () => {
    it('should have default params', () => {
      const todo = createTodoRecord();
      expect(todo.id).toBeLessThan(0);
      expect(todo.title).toEqual('');
      expect(todo.onDate).toEqual(new Date().toDateString());
      expect(todo.isCompleted).toBeFalsy();
      expect(todo.tags).toEqual(OrderedSet());
    });

    it('should transform tags->array to tags->OrderedSet ', () => {
      const todo = createTodoRecord({ tags: [1, 2, 3] });
      expect(todo.id).toBeLessThan(0);
      expect(todo.title).toEqual('');
      expect(todo.onDate).toEqual(new Date().toDateString());
      expect(todo.isCompleted).toBeFalsy();
      expect(todo.tags).toEqual(OrderedSet([1, 2, 3]));
    });
  });

  describe('isPending', () => {
    it('should have initial state', () => {
      const action = { type: 'ANY' };
      expect(isPending(undefined, action)).toEqual(OrderedSet());
    });

    it('handle todo/CREATE_TODO_REQUEST action', () => {
      const action = {
        type: 'todo/CREATE_TODO_REQUEST',
        todo: { id: '2' }
      };
      expect(isPending(OrderedSet(['3', '6', '9']), action)).toEqual(
        OrderedSet(['3', '6', '9', action.todo.id])
      );
    });

    it('handle todo/UPDATE_TODO_REQUEST action', () => {
      const action = {
        type: 'todo/UPDATE_TODO_REQUEST',
        todo: { id: '2' }
      };
      expect(isPending(OrderedSet(['3', '6', '9']), action)).toEqual(
        OrderedSet(['3', '6', '9', action.todo.id])
      );
    });

    it('handle todo/CREATE_TODO_SUCCESS action', () => {
      const action = {
        type: 'todo/CREATE_TODO_SUCCESS',
        prevTodo: { id: '6' }
      };
      expect(isPending(OrderedSet(['3', '6', '9']), action)).toEqual(
        OrderedSet(['3', '9'])
      );
    });

    it('handle todo/UPDATE_TODO_SUCCESS action', () => {
      const action = {
        type: 'todo/UPDATE_TODO_SUCCESS',
        prevTodo: { id: '6' }
      };
      expect(isPending(OrderedSet(['3', '6', '9']), action)).toEqual(
        OrderedSet(['3', '9'])
      );
    });
  });

  describe('isLoadingByOnDate', () => {
    const onDate = new Date().toDateString();

    it('should have initial state', () => {
      const action = { type: 'ANY' };
      expect(isLoadingByOnDate(undefined, action)).toEqual(OrderedSet());
    });

    it('handle todo/LOAD_TODO_REQUEST action', () => {
      const action = {
        type: 'todo/LOAD_TODOS_REQUEST',
        onDate
      };
      expect(isLoadingByOnDate(OrderedSet([]), action)).toEqual(
        OrderedSet([onDate])
      );
    });

    it('handle todo/LOAD_TODOS_SUCCESS action', () => {
      const action = {
        type: 'todo/LOAD_TODOS_SUCCESS',
        onDate
      };
      expect(isLoadingByOnDate(OrderedSet([onDate]), action)).toEqual(
        OrderedSet([])
      );
    });
  });

  describe('byOnDate', () => {
    const onDate = new Date().toDateString();

    it('should have initial state', () => {
      const action = { type: 'ANY' };
      expect(byOnDate(undefined, action)).toEqual(Map());
    });

    it('handle todo/CREATE_TODO_REQUEST action', () => {
      const action = {
        type: 'todo/CREATE_TODO_REQUEST',
        todo: {
          id: '1',
          onDate
        }
      };
      expect(byOnDate(Map({}), action)).toEqual(
        Map({ [onDate]: OrderedSet([action.todo.id]) })
      );
    });

    it('handle todo/CREATE_TODO_REQUEST action', () => {
      const action = {
        type: 'todo/CREATE_TODO_REQUEST',
        todo: {
          id: '2',
          onDate
        }
      };
      expect(byOnDate(Map({ [onDate]: OrderedSet(['1']) }), action)).toEqual(
        Map({ [onDate]: OrderedSet(['1', action.todo.id]) })
      );
    });

    it('handle todo/UPDATE_TODO_REQUEST action - add if empty', () => {
      const action = {
        type: 'todo/UPDATE_TODO_REQUEST',
        todo: {
          id: '1',
          onDate
        }
      };
      expect(byOnDate(Map({}), action)).toEqual(
        Map({ [onDate]: OrderedSet([action.todo.id]) })
      );
    });

    it('handle todo/UPDATE_TODO_REQUEST action', () => {
      const action = {
        type: 'todo/UPDATE_TODO_REQUEST',
        todo: {
          id: '2',
          onDate
        }
      };
      expect(byOnDate(Map({ [onDate]: OrderedSet(['1']) }), action)).toEqual(
        Map({ [onDate]: OrderedSet(['1', action.todo.id]) })
      );
    });

    it('handle todo/CREATE_TODO_SUCCESS action', () => {
      const action = {
        type: 'todo/CREATE_TODO_SUCCESS',
        prevTodo: {
          id: 'temp_1',
          onDate
        },
        nextTodo: {
          id: '2',
          onDate
        }
      };
      expect(
        byOnDate(Map({ [onDate]: OrderedSet([action.prevTodo.id]) }), action)
      ).toEqual(Map({ [onDate]: OrderedSet([action.nextTodo.id]) }));
    });

    it('handle todo/UPDATE_TODO_SUCCESS action', () => {
      const date = new Date();
      date.setDate(date.getDate() + 1);
      const nextOnDate = date.toDateString();
      const action = {
        type: 'todo/UPDATE_TODO_SUCCESS',
        prevTodo: {
          id: '2',
          onDate
        },
        nextTodo: {
          id: '2',
          onDate: nextOnDate
        }
      };
      expect(
        byOnDate(Map({ [onDate]: OrderedSet(['2', '3']) }), action)
      ).toEqual(
        Map({ [onDate]: OrderedSet(['3']), [nextOnDate]: OrderedSet(['2']) })
      );
    });
  });

  describe('entities', () => {
    it('should have initial state', () => {
      const action = { type: 'ANY' };
      expect(entities(undefined, action)).toEqual(Map());
    });

    it('handle todo/CREATE_TODO_REQUEST action', () => {
      const action = {
        type: 'todo/CREATE_TODO_REQUEST',
        todo: {
          id: 'temp_2'
        }
      };
      expect(entities(Map({}), action)).toEqual(
        Map().set(action.todo.id, createTodoRecord(action.todo))
      );
    });

    it('handle todo/UPDATE_TODO_REQUEST action', () => {
      const action = {
        type: 'todo/UPDATE_TODO_REQUEST',
        todo: {
          id: '2',
          title: 'next'
        }
      };
      expect(
        entities(
          Map().set('2', createTodoRecord({ id: '2', title: 'before' })),
          action
        )
      ).toEqual(Map().set('2', createTodoRecord({ id: '2', title: 'next' })));
    });
    it('handle todo/CREATE_TODO_SUCCESS action', () => {
      const action = {
        type: 'todo/CREATE_TODO_SUCCESS',
        prevTodo: {
          id: 'temp_1',
          title: 'before'
        },
        nextTodo: {
          id: '2',
          title: 'next'
        }
      };
      expect(
        entities(
          Map().set(
            'temp_1',
            createTodoRecord({ id: 'temp_1', title: 'before' })
          ),
          action
        )
      ).toEqual(Map().set('2', createTodoRecord({ id: '2', title: 'next' })));
    });
    it('handle todo/UPDATE_TODO_SUCCESS action', () => {
      const action = {
        type: 'todo/UPDATE_TODO_SUCCESS',
        prevTodo: {
          id: '2',
          title: 'before'
        },
        nextTodo: {
          id: '2',
          title: 'next'
        }
      };
      expect(
        entities(
          Map().set('2', createTodoRecord({ id: '2', title: 'before' })),
          action
        )
      ).toEqual(Map().set('2', createTodoRecord({ id: '2', title: 'next' })));
    });
    it('handle todo/LOAD_TODOS_SUCCESS action', () => {
      const action = {
        type: 'todo/LOAD_TODOS_SUCCESS',
        todos: {
          2: { id: 2, title: 'two' },
          3: { id: 3, title: 'three' }
        }
      };
      expect(
        entities(
          Map().set('1', createTodoRecord({ id: 1, title: 'one' })),
          action
        )
      ).toEqual(
        Map()
          .set('1', createTodoRecord({ id: 1, title: 'one' }))
          .set('2', createTodoRecord({ id: 2, title: 'two' }))
          .set('3', createTodoRecord({ id: 3, title: 'three' }))
      );
    });
  });
});
