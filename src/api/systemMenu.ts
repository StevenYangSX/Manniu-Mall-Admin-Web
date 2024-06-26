import { AddOrModifySystemMenuItemRequestType, deleteMenuByIdType } from "@/types/requestDataTypes";
import HttpRequest from "./httpRequestExtention/httpRequest";
import { SystemMenuItem } from "@/types/systemDataTypes";

export const getSystemMenusApi = () => {
  return HttpRequest<SystemMenuItem[]>({
    url:"/adminApi/menuList",
    method: "get",
  });
};

export const addMenuItemApi = (menuItem:AddOrModifySystemMenuItemRequestType) =>{
  return HttpRequest({
    url:"/systemMenu/addMenu",
    method:"post",
    data:menuItem
  })
}


export const deleteMenuByIdApi = (payload:deleteMenuByIdType) => {
  return HttpRequest({
    url:"/systemMenu/deleteMenu",
    method:"post",
    data:payload
  })
}


export const modifyMenuItemApi = (payload:AddOrModifySystemMenuItemRequestType) => {
  return HttpRequest({
    url:"/systemMenu/modifyMenu",
    method:"post",
    data:payload
  })
}

