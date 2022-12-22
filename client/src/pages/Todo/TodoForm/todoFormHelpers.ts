export const todoFormHelpers = () => {
  const randomNumber = () => +Math.random().toString().slice(-4);

  const createDefaultValues = () => ({
    title: 'Title --' + randomNumber(),
    description: 'Description --' + randomNumber(),
    done: true,
  });
  return { createDefaultValues };
};
