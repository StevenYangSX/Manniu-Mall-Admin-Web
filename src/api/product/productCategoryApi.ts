
import HttpRequest from "@/api/httpRequestExtention/httpRequest";
import { ProductCategoryType } from "@/types/systemDataTypes";

export const getProductCategoryListApi = () => {
  return HttpRequest<ProductCategoryType[]>({
    url:"/adminApi/product/category/list",
    method: "get",
  });
};