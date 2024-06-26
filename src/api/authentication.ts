import {  LoginRequestType } from "@/types/requestDataTypes";
import HttpRequest from "./httpRequestExtention/httpRequest";
export const loginApi = (data:LoginRequestType) => {
  return HttpRequest({
    url:"/auth/adminLogin",
    method: "post",
    data
  });
};



