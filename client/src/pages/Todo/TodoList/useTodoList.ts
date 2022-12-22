import { editedTodoVar } from '../../../client/reactiveVariables';
import {
  LocalTypenames,
  Todo,
  useGetTodosQuery,
} from '../../../generated/types';

export const useTodoList = () => {
  const { data, client } = useGetTodosQuery({
    fetchPolicy: 'cache-only',
  });
  const todos = data?.getTodos || [];
  const { cache } = client;

  const handleChange = (item: Todo) => {
    cache.modify({
      id: cache.identify({
        __typename: LocalTypenames.Todo,
        ...item,
      }),
      fields: {
        done(bool) {
          return !bool;
        },
      },
    });
  };

  const handleEdit = (item: Todo) => {
    editedTodoVar(item);
  };

  const handleDelete = (item: Todo) => {
    cache.evict({
      id: cache.identify({ ...item }),
      // broadcast: false,
    });
    cache.gc();

    // const todos = cache.readQuery({
    //   query: GetTodosDocument,
    // }) as GetTodosQuery;

    // cache.modify({
    //   id: cache.identify({ __typename: 'Query', todos }),
    //   fields: {
    //     getTodos(existingTodoRefs, { readField }) {
    //       return existingTodoRefs.filter(
    //         (todoRef: Reference) =>
    //           item.id !== readField('id', todoRef),
    //       );
    //     },
    //   },
    // });
  };

  return { handleChange, handleDelete, handleEdit, todos };
};
