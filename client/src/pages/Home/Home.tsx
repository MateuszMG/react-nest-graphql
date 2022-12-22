import { useQuery } from '@apollo/client';
import { cache } from '../../client/cache';
import { Button } from '../../components/Global/Button/Button';
import {
  useChangeTitleMutation,
  useGetBooksQuery,
} from '../../generated/types';

export const Home = () => {
  const { data: books } = useGetBooksQuery();
  const bookId = books?.getBooks[0].id || '';
  console.log('books', books);

  const [changeTitle] = useChangeTitleMutation();

  return (
    <div>
      <Button onClick={() => changeTitle({ variables: { id: bookId } })}>
        changeTitle
      </Button>
      <p> Home </p>
      <p> Home </p>
    </div>
  );
};
