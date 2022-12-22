export const productFormHelpers = () => {
  const randomNumber = (count?: number) =>
    +Math.random()
      .toString()
      .slice(count || -6);

  const createImageSrc = () =>
    `https://picsum.photos/id/${randomNumber(-3)}/200/200`;

  const createDefaultValues = () => ({
    title: 'Title --' + randomNumber(),
    description: 'Description --' + randomNumber(),
    price: randomNumber(),
    quantity: randomNumber(),
    active: true,
  });

  return { createImageSrc, createDefaultValues };
};
