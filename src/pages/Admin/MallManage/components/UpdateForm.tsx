import {ProFormInstance,} from '@ant-design/pro-components';
import '@umijs/max';
import React, {useEffect, useRef, useState} from 'react';
import BaseForm from "@/pages/Admin/MallManage/common/BaseForm";

export type UpdateFormProps = {
    onCancel: () => void;
    onSubmit: (values: API.GoldCoinGoodsVO, id: number | undefined) => Promise<boolean>;
    visible: boolean;
    values: API.GoldCoinGoodsVO;
};
const UpdateForm: React.FC<UpdateFormProps> = (props) => {
    const [id, setId] = useState<number>();
    const {onCancel, onSubmit, visible, values} = props;
    const formRef = useRef<ProFormInstance>();

    useEffect(() => {
        if (formRef) {
            formRef.current?.setFieldsValue(values);
            setId(values.id);
        }
    }, [values]);

    return (
        <BaseForm
            formRef={formRef}
            values={formRef.current?.getFieldsValue()}
            title={"修改商品"}
            onCancel={onCancel}
            onSubmit={async (values) => {
                return await onSubmit(values, id);
            }}
            visible={visible}
        />
    );
};
export default UpdateForm;
