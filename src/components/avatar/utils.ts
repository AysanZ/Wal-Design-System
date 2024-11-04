import { Size } from '.';

export const isSizeLargeEnough = (size: Size) => {
  const largeSizes = ['large', 'xlarge', 'xxlarge', 'xxxlarge'];
  return largeSizes.includes(size);
};
