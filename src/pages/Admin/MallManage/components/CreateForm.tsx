import {ProFormInstance,} from '@ant-design/pro-components';
import '@umijs/max';
import React, {useRef} from 'react';
import BaseForm from "@/pages/Admin/MallManage/common/BaseForm";

export type CreateFormProps = {
    onClose: () => void;
    onSubmit: (values: API.GoldCoinGoodsVO) => Promise<boolean>;
    visible: boolean;
};

const CreateForm: React.FC<CreateFormProps> = (props) => {
    const {onClose, onSubmit, visible} = props;
    const formRef = useRef<ProFormInstance>();

    return (
        <BaseForm
            formRef={formRef}
            values={{number: 1, price: 0.01}}
            title={"添加商品"}
            onCancel={onClose}
            onSubmit={onSubmit}
            visible={visible}
        />
    );
};
export default CreateForm;
