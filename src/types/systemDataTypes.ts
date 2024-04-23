
import { AxiosResponse } from "axios";



export interface ExtendedAxiosResponse<T> extends AxiosResponse<T> {
  message?: string;
  data:T;
}

export interface SystemMenuItem {
  menuId?: number;
  key?: string;
  icon?: string;
  children: Array<SystemMenuItem> | null;
  parentId: number;
  path: string;
  menuName: string;
  uniqAuth: string;
}


export interface SystemRoleTableType {
  roleId:number,
  roleName:string,
  access:string,
  menus:SystemMenuItem[]
}



export interface SystemRoleListResponseType {
  roleId:number,
  authority:string,
  menus:SystemMenuItem[]
}

export interface SysterUserInfo {
  access?: string[];
  userId: number;
  username: string;
}

interface Authority {
  authority:string
}
export interface SystemAdminUserDataType {
  userId:number,
  username:string,
  nickname:string,
  enabled?:boolean,
  accountNonLocked?:boolean
  authorities?:Authority[]
}

