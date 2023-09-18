// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addInterfaceInfo POST /api/interface-info/add */
export async function addInterfaceInfoUsingPOST(
  body: API.InterfaceInfoAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponselong>('/api/interface-info/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteInterfaceInfoByIds POST /api/interface-info/batch/delete */
export async function deleteInterfaceInfoByIdsUsingPOST(
  body: number[],
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/interface-info/batch/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteInterfaceInfo POST /api/interface-info/delete */
export async function deleteInterfaceInfoUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/interface-info/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getInterfaceLeftNum GET /api/interface-info/get/interface/leftNum */
export async function getInterfaceLeftNumUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getInterfaceLeftNumUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseint>('/api/interface-info/get/interface/leftNum', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getInterfaceInfoVoById GET /api/interface-info/get/vo */
export async function getInterfaceInfoVoByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getInterfaceInfoVoByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInterfaceInfoVO>('/api/interface-info/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** invokeInterface POST /api/interface-info/invoke */
export async function invokeInterfaceUsingPOST(
  body: API.InvokeInterfaceParamRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseobject>('/api/interface-info/invoke', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listInterfaceInfoVoByPage POST /api/interface-info/list/page/vo */
export async function listInterfaceInfoVoByPageUsingPOST(
  body: API.InterfaceInfoQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageInterfaceInfoVO>('/api/interface-info/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** offlineInterface POST /api/interface-info/offline */
export async function offlineInterfaceUsingPOST(
  body: API.IdRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/interface-info/offline', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** onlineInterface POST /api/interface-info/online */
export async function onlineInterfaceUsingPOST(
  body: API.IdRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/interface-info/online', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateInterfaceInfo POST /api/interface-info/update */
export async function updateInterfaceInfoUsingPOST(
  body: API.InterfaceInfoUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/interface-info/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
