export const verifyImgUrl = (url: string) => {
  const imgUrl = !url.includes('sprint-fe-project.s3.ap-northeast-2.amazonaws.com')
    ? undefined
    : url;

  return imgUrl;
};
