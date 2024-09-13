export const transformToLocale = (date: number) => {
  return new Date(date).toLocaleString('hy', {
    timeZone: 'Asia/Yerevan',
  });
};
