import {ProFormInstance,} from '@ant-design/pro-components';
import '@umijs/max';
import React, {useEffect, useRef, useState} from 'react';
import BaseForm from "@/pages/Admin/InterfaceManage/common/BaseForm";

export type UpdateFormProps = {
    onCancel: () => void;
    onSubmit: (values: API.InterfaceInfoVO, id: number | undefined) => Promise<boolean>;
    visible: boolean;
    values: API.InterfaceInfoVO;
};
const UpdateForm: React.FC<UpdateFormProps> = (props) => {
    const [id, setId] = useState<number>();
    const {onCancel, onSubmit, visible, values} = props;
    const formRef = useRef<ProFormInstance>();

    const getRequestHeader = () => {
        try {
            const {requestHeader} = values;
            let array = JSON.parse(requestHeader as string);
            return array.map((item: any, index: number) => {
                item.id = index;
                return item;
            });
        } catch (e) {
            return [];
        }
    };

    const getResponseHeader = () => {
        try {
            const {responseHeader} = values;
            let array = JSON.parse(responseHeader as string);
            return array.map((item: any, index: number) => {
                item.id = index;
                return item;
            });
        } catch (e) {
            return [];
        }
    };

    const getRequestParam = () => {
        try {
            const {requestParam} = values;
            let array = JSON.parse(requestParam as string);
            return array.map((item: any, index: number) => {
                item.id = index;
                return item;
            });
        } catch (e) {
            return [];
        }
    };

    const getResponseParam = () => {
        try {
            const {responseParam} = values;
            let array = JSON.parse(responseParam as string);
            return array.map((item: any, index: number) => {
                item.id = index;
                return item;
            });
        } catch (e) {
            return [];
        }
    };


    useEffect(() => {
        if (formRef) {
            const initialValues = {
                name: values.name,
                description: values.description,
                url: values.url,
                method: values.method,
                price: values.price,
                requestHeader: getRequestHeader(),
                responseHeader: getResponseHeader(),
                requestParam: getRequestParam(),
                responseParam: getResponseParam()
            };
            formRef.current?.setFieldsValue(initialValues);
            setId(values.id);
        }
    }, [values]);

    return (
        <BaseForm
            formRef={formRef}
            values={formRef.current?.getFieldsValue()}
            title={"修改接口"}
            onCancel={onCancel}
            onSubmit={async (values) => {
                return await onSubmit(values, id);
            }}
            visible={visible}
        />
    );
};
export default UpdateForm;
