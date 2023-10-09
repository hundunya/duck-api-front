// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** deleteGoldCoinGoodsOrderByIds POST /api/alipay/batch/delete */
export async function deleteGoldCoinGoodsOrderByIdsUsingPOST(
  body: number[],
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/alipay/batch/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** createGoldCoinGoodsOrder POST /api/alipay/create */
export async function createGoldCoinGoodsOrderUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.createGoldCoinGoodsOrderUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseJSONObject>('/api/alipay/create', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** deleteGoldCoinGoodsOrder POST /api/alipay/delete */
export async function deleteGoldCoinGoodsOrderUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/alipay/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getGoldCoinGoodsOrderById GET /api/alipay/get */
export async function getGoldCoinGoodsOrderByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getGoldCoinGoodsOrderByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseGoldCoinGoodsOrder>('/api/alipay/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getGoldCoinGoodsOrderVoById GET /api/alipay/get/vo */
export async function getGoldCoinGoodsOrderVoByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getGoldCoinGoodsOrderVoByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseGoldCoinGoodsOrderVO>('/api/alipay/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** cancelGoldCoinGoodsOrder POST /api/alipay/goldCoinGoodsOrder/cancel */
export async function cancelGoldCoinGoodsOrderUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.cancelGoldCoinGoodsOrderUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/alipay/goldCoinGoodsOrder/cancel', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getGoldCoinGoodsOrderQrCode POST /api/alipay/goldCoinGoodsOrder/qrCode */
export async function getGoldCoinGoodsOrderQrCodeUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getGoldCoinGoodsOrderQrCodeUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsestring>('/api/alipay/goldCoinGoodsOrder/qrCode', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listGoldCoinGoodsOrderByPage POST /api/alipay/list/page */
export async function listGoldCoinGoodsOrderByPageUsingPOST(
  body: API.GoldCoinGoodsOrderQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageGoldCoinGoodsOrder>('/api/alipay/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listGoldCoinGoodsOrderVoByPage POST /api/alipay/list/page/vo */
export async function listGoldCoinGoodsOrderVoByPageUsingPOST(
  body: API.GoldCoinGoodsOrderQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageGoldCoinGoodsOrderVO>('/api/alipay/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** success POST /api/alipay/success */
export async function successUsingPOST(options?: { [key: string]: any }) {
  return request<any>('/api/alipay/success', {
    method: 'POST',
    ...(options || {}),
  });
}
