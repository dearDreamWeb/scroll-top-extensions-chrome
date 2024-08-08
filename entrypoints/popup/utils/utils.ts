/**
 * 获取唯一id
 * @returns
 */
export const getUUid = () => {
  return (Math.random() * Math.random()).toString(36).slice(2, 10);
};
