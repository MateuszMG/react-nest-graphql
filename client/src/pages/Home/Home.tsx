import { Button } from '../../components/Global/Button/Button';
import {
  useChangeTitleMutation,
  useGetBooksQuery,
} from '../../generated/types';
import { Container, Section, Text } from './Home.styled';

export const Home = () => {
  const { data } = useGetBooksQuery();
  const bookId = data?.getBooks[0].id || '';

  const [changeTitle] = useChangeTitleMutation();

  return (
    <Container>
      <Button onClick={() => changeTitle({ variables: { id: bookId } })}>
        change book title
      </Button>
      {data?.getBooks.map((item) => (
        <Section key={item.id}>
          <Text>Title: {item.title} </Text>
          <Text>Author: {item.author}</Text>
        </Section>
      ))}
    </Container>
  );
};
