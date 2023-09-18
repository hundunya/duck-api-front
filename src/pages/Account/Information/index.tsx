import {PageContainer, ProCard, ProForm, ProFormInstance} from '@ant-design/pro-components';
import {Avatar, Col, Input, message, Row, Upload} from 'antd';
import {useModel} from "@@/exports";
import {RcFile} from "antd/es/upload";
import {useEffect, useRef, useState} from "react";
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import {LOGO} from "@/constants";
import {
    getLoginUserUsingGET,
    updateMyAvatarUsingPOST,
    updateMyUserUsingPOST
} from "@/services/duckapi-backend/userController";
import {flushSync} from "react-dom";
import defaultSettings from "../../../../config/defaultSettings";
import {Settings as LayoutSettings} from "@ant-design/pro-layout";

export default () => {
    const {initialState, setInitialState} = useModel('@@initialState');
    const [loading, setLoading] = useState(false);
    const [hover, setHover] = useState(false);
    // 用户头像
    const userAvatar = initialState?.loginUser?.userAvatar;
    const [imageUrl, setImageUrl] = useState<string>(
        userAvatar ? userAvatar : LOGO
    );
    const formRef = useRef<ProFormInstance<API.UserUpdateMyRequest>>();

    // 水平居中样式
    const horizontalStyle = {
        display: 'flex',
        justifyContent: 'center',
    };

    useEffect(() => {
        // 处理鼠标悬浮在头像上的操作
        const avatarUploader = document.getElementsByClassName("avatar-uploader")[0];
        avatarUploader.addEventListener("mouseover", () => {
            setHover(true);
        });
        avatarUploader.addEventListener("mouseleave", () => {
            setHover(false);
        });
    }, []);

    // 监听头像变化
    useEffect(() => {
        const userAvatar = initialState?.loginUser?.userAvatar;
        if (userAvatar){
            setImageUrl(userAvatar);
        }
    }, [initialState?.loginUser?.userAvatar]);

    const beforeUpload = async (file: RcFile) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('头像仅支持jpg/jpeg和png格式');
        }
        // 上传的文件不能超过2MB
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('上传的图片不能超过2MB');
        }
        return isJpgOrPng && isLt2M;
    };

    /**
     * 查询当前用户信息
     */
    const queryCurrentUser = async () => {
        try {
            const res = await getLoginUserUsingGET();
            flushSync(() => {
                setInitialState({
                    loginUser: res.data,
                    settings: defaultSettings as Partial<LayoutSettings>,
                });
            })
        } catch (error) {
            const defaultFailureMessage = '系统错误';
            console.log(error);
            message.error(defaultFailureMessage);
        }
    }

    /**
     * 修改个人信息
     * @param values
     */
    const updateMyInformation = async (values: API.UserUpdateMyRequest) => {
        try {
            // 修改信息
            const res = await updateMyUserUsingPOST({
                ...values
            });
            if (res?.data) {
                await queryCurrentUser();
                const defaultSuccessMessage = '修改成功';
                message.success(defaultSuccessMessage);
            }
        } catch (error) {
            const defaultFailureMessage = '修改失败，请重试！';
            console.log(error);
            message.error(defaultFailureMessage);
        }
    }

    /**
     * 更换头像
     * @param options
     */
    const updateMyAvatar = async (options: any) => {
        setLoading(true);
        const { file } = options;
        try {
            let formData = new FormData();
            formData.append("multipartFile", file);
            // 更换头像
            const res = await updateMyAvatarUsingPOST(
                formData as any,
                {headers: {'Content-Type': 'multipart/form-data',}}
            );
            if (res?.data){
                await queryCurrentUser();
                setLoading(false);
                const defaultSuccessMessage = '修改成功';
                message.success(defaultSuccessMessage);
            }
        } catch (error) {
            const defaultFailureMessage = '修改失败，请重试！';
            console.log(error);
            message.error(defaultFailureMessage);
        }
    }

    return (
        <PageContainer>
            <ProCard
                style={{
                    background: 'transparent',
                    minHeight: 460
                }}
                gutter={16}
            >
                <ProCard
                    colSpan={8}
                >
                    <Row
                        style={{
                            marginBottom: '20px'
                        }}
                    >
                        <Col flex={1}
                             style={horizontalStyle}
                        >
                            <div>
                                <Upload
                                    name="avatar"
                                    listType="picture-circle"
                                    className="avatar-uploader"
                                    showUploadList={true}
                                    beforeUpload={beforeUpload}
                                    maxCount={1}
                                    fileList={[]}
                                    customRequest={updateMyAvatar}
                                >
                                    <div
                                        style={{
                                            position: 'absolute',
                                            background: loading || hover ? 'rgba(0, 0, 0, 0.3)' : '',
                                            width: '100px',
                                            height: '100px',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            zIndex: '1',
                                            transition: '0.3s'
                                        }}
                                    >
                                        {
                                            loading ? <LoadingOutlined
                                                style={{
                                                    zIndex: '1',
                                                    color: "white",
                                                    transition: '0.3s'
                                                }}
                                            /> : <></>
                                        }
                                        {
                                            !loading && hover ? <PlusOutlined
                                                style={{
                                                    position: 'absolute',
                                                    zIndex: '1',
                                                    fontSize: '35px',
                                                    color: "rgba(0, 0, 0, 0.5)",
                                                    transition: '0.3s'
                                                }}
                                            /> : <></>
                                        }
                                    </div>
                                    <Avatar
                                        className={'avatar'}
                                        size={100}
                                        alt={'头像'}
                                        src={imageUrl}
                                        style={{
                                            border: '2px #1890ff solid'
                                        }}
                                        draggable={false}
                                    />
                                </Upload>
                            </div>
                        </Col>
                    </Row>
                    <Row
                        style={{
                            marginBottom: '4px'
                        }}
                    >
                        <Col flex={1}
                             style={{
                                 display: 'flex',
                                 justifyContent: 'center',
                                 fontWeight: 500,
                                 fontSize: '20px',
                                 lineHeight: '28px',
                                 color: 'fade(#000, 85%)',
                             }}
                        >
                            {initialState?.loginUser?.userName}
                        </Col>
                    </Row>
                    <Row>
                        <Col flex={1}
                             style={horizontalStyle}
                        >
                            {initialState?.loginUser?.signature}
                        </Col>
                    </Row>
                </ProCard>
                <ProCard
                    colSpan={16}
                    bordered
                >
                    <ProForm<API.UserUpdateMyRequest>
                        onFinish={updateMyInformation}
                        formRef={formRef}
                        submitter={{
                            searchConfig: {
                                submitText: '保存'
                            },
                            resetButtonProps: {
                                style: {
                                    display: 'none'
                                }
                            }
                        }}
                        autoFocusFirstInput={false}
                    >
                        <ProForm.Item
                            name="userName"
                            label="用户名"
                            initialValue={initialState?.loginUser?.userName}
                            rules={[
                                {
                                    required: true,
                                    message: '用户名不能为空'
                                },
                            ]}
                        >
                            <Input
                                placeholder={'请输入用户名'}
                                maxLength={50}
                                showCount
                            />
                        </ProForm.Item>
                        <ProForm.Item
                            name="signature"
                            label="个性签名"
                            initialValue={initialState?.loginUser?.signature}
                            // initialValue={"签名"}
                        >
                            <Input.TextArea
                                maxLength={100}
                                showCount
                                autoSize={{minRows: 3, maxRows: 10}}
                            />
                        </ProForm.Item>
                    </ProForm>
                </ProCard>
            </ProCard>
        </PageContainer>
    );
};
