// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addGoldCoinGoods POST /api/mall/add */
export async function addGoldCoinGoodsUsingPOST(
  body: API.GoldCoinGoodsAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponselong>('/api/mall/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteGoldCoinGoodsByIds POST /api/mall/batch/delete */
export async function deleteGoldCoinGoodsByIdsUsingPOST(
  body: number[],
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/mall/batch/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteGoldCoinGoods POST /api/mall/delete */
export async function deleteGoldCoinGoodsUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/mall/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getGoldCoinGoodsById GET /api/mall/get */
export async function getGoldCoinGoodsByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getGoldCoinGoodsByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseGoldCoinGoods>('/api/mall/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getGoldCoinGoodsVoById GET /api/mall/get/vo */
export async function getGoldCoinGoodsVoByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getGoldCoinGoodsVoByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseGoldCoinGoodsVO>('/api/mall/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listGoldCoinGoodsByPage POST /api/mall/list/page */
export async function listGoldCoinGoodsByPageUsingPOST(
  body: API.GoldCoinGoodsQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageGoldCoinGoods>('/api/mall/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listGoldCoinGoodsVoByPage POST /api/mall/list/page/vo */
export async function listGoldCoinGoodsVoByPageUsingPOST(
  body: API.GoldCoinGoodsQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageGoldCoinGoodsVO>('/api/mall/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateGoldCoinGoods POST /api/mall/update */
export async function updateGoldCoinGoodsUsingPOST(
  body: API.GoldCoinGoodsUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/mall/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
