declare namespace API {
  type BaseResponseboolean = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponseGoldCoinGoods = {
    code?: number;
    data?: GoldCoinGoods;
    message?: string;
  };

  type BaseResponseGoldCoinGoodsOrder = {
    code?: number;
    data?: GoldCoinGoodsOrder;
    message?: string;
  };

  type BaseResponseGoldCoinGoodsOrderVO = {
    code?: number;
    data?: GoldCoinGoodsOrderVO;
    message?: string;
  };

  type BaseResponseGoldCoinGoodsVO = {
    code?: number;
    data?: GoldCoinGoodsVO;
    message?: string;
  };

  type BaseResponseint = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponseInterfaceInfoVO = {
    code?: number;
    data?: InterfaceInfoVO;
    message?: string;
  };

  type BaseResponseJSONObject = {
    code?: number;
    data?: Record<string, any>;
    message?: string;
  };

  type BaseResponseLoginUserVO = {
    code?: number;
    data?: LoginUserVO;
    message?: string;
  };

  type BaseResponselong = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponseMapstringobject = {
    code?: number;
    data?: Record<string, any>;
    message?: string;
  };

  type BaseResponseobject = {
    code?: number;
    data?: Record<string, any>;
    message?: string;
  };

  type BaseResponsePageGoldCoinGoods = {
    code?: number;
    data?: PageGoldCoinGoods;
    message?: string;
  };

  type BaseResponsePageGoldCoinGoodsOrder = {
    code?: number;
    data?: PageGoldCoinGoodsOrder;
    message?: string;
  };

  type BaseResponsePageGoldCoinGoodsOrderVO = {
    code?: number;
    data?: PageGoldCoinGoodsOrderVO;
    message?: string;
  };

  type BaseResponsePageGoldCoinGoodsVO = {
    code?: number;
    data?: PageGoldCoinGoodsVO;
    message?: string;
  };

  type BaseResponsePageInterfaceInfoVO = {
    code?: number;
    data?: PageInterfaceInfoVO;
    message?: string;
  };

  type BaseResponsePageUser = {
    code?: number;
    data?: PageUser;
    message?: string;
  };

  type BaseResponsePageUserVO = {
    code?: number;
    data?: PageUserVO;
    message?: string;
  };

  type BaseResponsestring = {
    code?: number;
    data?: string;
    message?: string;
  };

  type BaseResponseUser = {
    code?: number;
    data?: User;
    message?: string;
  };

  type BaseResponseUserVO = {
    code?: number;
    data?: UserVO;
    message?: string;
  };

  type cancelGoldCoinGoodsOrderUsingPOSTParams = {
    /** id */
    id?: number;
  };

  type createGoldCoinGoodsOrderUsingPOSTParams = {
    /** goldCoinGoodsId */
    goldCoinGoodsId?: number;
  };

  type DeleteRequest = {
    id?: number;
  };

  type getGoldCoinGoodsByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getGoldCoinGoodsOrderByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getGoldCoinGoodsOrderQrCodeUsingPOSTParams = {
    /** id */
    id?: number;
  };

  type getGoldCoinGoodsOrderVoByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getGoldCoinGoodsVoByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getInterfaceInfoVoByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getUserByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getUserVoByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type GoldCoinGoods = {
    createTime?: string;
    createUser?: number;
    description?: string;
    id?: number;
    isDelete?: number;
    name?: string;
    number?: number;
    price?: number;
    updateTime?: string;
  };

  type GoldCoinGoodsAddRequest = {
    description?: string;
    name?: string;
    number?: number;
    price?: number;
  };

  type GoldCoinGoodsOrder = {
    createTime?: string;
    description?: string;
    id?: number;
    isDelete?: number;
    name?: string;
    number?: number;
    outTradeNo?: string;
    payAmount?: number;
    status?: number;
    totalAmount?: number;
    updateTime?: string;
    userId?: number;
  };

  type GoldCoinGoodsOrderQueryRequest = {
    current?: number;
    description?: string;
    id?: number;
    name?: string;
    number?: number;
    outTradeNo?: string;
    pageSize?: number;
    payAmount?: number;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    userId?: number;
  };

  type GoldCoinGoodsOrderVO = {
    createTime?: string;
    description?: string;
    id?: number;
    name?: string;
    number?: number;
    outTradeNo?: string;
    payAmount?: number;
    status?: number;
    totalAmount?: number;
    userId?: number;
  };

  type GoldCoinGoodsQueryRequest = {
    createUser?: number;
    current?: number;
    description?: string;
    id?: number;
    name?: string;
    number?: number;
    pageSize?: number;
    price?: number;
    sortField?: string;
    sortOrder?: string;
  };

  type GoldCoinGoodsUpdateRequest = {
    description?: string;
    id?: number;
    name?: string;
    number?: number;
    price?: number;
  };

  type GoldCoinGoodsVO = {
    createTime?: string;
    createUser?: number;
    description?: string;
    id?: number;
    name?: string;
    number?: number;
    price?: number;
  };

  type IdRequest = {
    id?: number;
  };

  type InterfaceInfoAddRequest = {
    description?: string;
    method?: string;
    name?: string;
    price?: number;
    requestHeader?: string;
    requestParam?: string;
    responseHeader?: string;
    responseParam?: string;
    url?: string;
  };

  type InterfaceInfoQueryRequest = {
    createUser?: number;
    current?: number;
    description?: string;
    id?: number;
    method?: string;
    name?: string;
    pageSize?: number;
    price?: number;
    requestHeader?: string;
    requestParam?: string;
    responseHeader?: string;
    responseParam?: string;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    url?: string;
  };

  type InterfaceInfoUpdateRequest = {
    description?: string;
    id?: number;
    method?: string;
    name?: string;
    price?: number;
    requestHeader?: string;
    requestParam?: string;
    responseHeader?: string;
    responseParam?: string;
    status?: number;
    url?: string;
  };

  type InterfaceInfoVO = {
    createTime?: string;
    createUser?: number;
    description?: string;
    id?: number;
    method?: string;
    name?: string;
    price?: number;
    requestHeader?: string;
    requestParam?: string;
    responseHeader?: string;
    responseParam?: string;
    status?: number;
    totalNum?: number;
    url?: string;
  };

  type InvokeInterfaceParamRequest = {
    id?: number;
    param?: string;
  };

  type LoginUserVO = {
    createTime?: string;
    goldCoinBalance?: number;
    id?: number;
    signature?: string;
    updateTime?: string;
    userAvatar?: string;
    userName?: string;
    userRole?: string;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type PageGoldCoinGoods = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: GoldCoinGoods[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageGoldCoinGoodsOrder = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: GoldCoinGoodsOrder[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageGoldCoinGoodsOrderVO = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: GoldCoinGoodsOrderVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageGoldCoinGoodsVO = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: GoldCoinGoodsVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageInterfaceInfoVO = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: InterfaceInfoVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUser = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: User[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUserVO = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: UserVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type User = {
    accessKey?: string;
    createTime?: string;
    goldCoinBalance?: number;
    id?: number;
    isDelete?: number;
    secretKey?: string;
    signature?: string;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userPassword?: string;
    userRole?: string;
  };

  type UserAddRequest = {
    signature?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userRole?: string;
  };

  type UserLoginRequest = {
    userAccount?: string;
    userPassword?: string;
  };

  type UserQueryRequest = {
    current?: number;
    goldCoinBalance?: number;
    id?: number;
    pageSize?: number;
    signature?: string;
    sortField?: string;
    sortOrder?: string;
    userName?: string;
    userRole?: string;
  };

  type UserRegisterRequest = {
    checkPassword?: string;
    userAccount?: string;
    userPassword?: string;
  };

  type UserUpdateMyRequest = {
    signature?: string;
    userAvatar?: string;
    userName?: string;
  };

  type UserUpdatePasswordRequest = {
    checkUserPassword?: string;
    newUserPassword?: string;
    oldUserPassword?: string;
  };

  type UserUpdateRequest = {
    goldCoinBalance?: number;
    id?: number;
    signature?: string;
    userAvatar?: string;
    userName?: string;
    userRole?: string;
  };

  type UserVO = {
    createTime?: string;
    goldCoinBalance?: number;
    id?: number;
    signature?: string;
    userAvatar?: string;
    userName?: string;
    userRole?: string;
  };
}
