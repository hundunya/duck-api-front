// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** cancelOrder POST /api/alipay/order/cancel */
export async function cancelOrderUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.cancelOrderUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/alipay/order/cancel', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** payOrder POST /api/alipay/order/pay */
export async function payOrderUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.payOrderUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseJSONObject>('/api/alipay/order/pay', {
    method: 'POST',
    params: {
      ...params,
    },
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
