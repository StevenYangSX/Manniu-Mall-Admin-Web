import HttpRequest from "./httpRequestExtention/httpRequest";

export const getImageCategoryApi = () => {
  return HttpRequest<any>({
    url: "/adminApi/images/category",
    method: "get",
  });
};
