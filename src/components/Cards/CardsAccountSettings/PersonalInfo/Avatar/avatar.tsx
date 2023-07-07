import React, { useEffect, useState } from 'react';
import { Upload } from 'antd';
import axios from "axios";
import Cookies from "js-cookie";

//import 'antd/dist/reset.css';
import { PlusOutlined } from '@ant-design/icons';
import Button from "@mui/material/Button";
import { CircularProgress } from "@material-ui/core";

import { updateUserProfile } from "@/api/commonApi";
import { fetchUserProfile } from '@/redux/thunk/user';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { setUserProfilePhoto } from '@/redux/slices/user';

export const Avatar: React.FC<any> = (props) => {
    const dispatch = useAppDispatch()
    const state = useAppSelector(state => state)
    const [fileList, setFileList] = useState<any>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isDisableButton, setIsDisableButton] = useState(false);

    useEffect(() => {
        if (state.user.user.user_profile.photo && state.user.user.user_profile.photo.path) {
            fileList.push({
                'url': state.user.user.user_profile.photo.url,
            });
        }

        setIsLoaded(true);
    }, [])

    const handleChangeUpdate = ({ fileList: newFileList }: any) => setFileList(newFileList);

    const dummyRequest = ({ file, onSuccess }: any) => {
        let formData = new FormData();
        setIsDisabled(true)
        formData.append('image[1]', file);

        axios({
            url: `${process.env.REACT_APP_REST_API}/file-storage/upload-images`,
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`,
            },
            data: formData
        }).then((res: any) => {
            res.data.map((item: any) => {
                dispatch(setUserProfilePhoto(item));
                return true;
            })

            setIsDisabled(false)
        })

        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    };

    const handleUpdate = () => {
        setIsDisableButton(true);
        updateUserProfile(state.user.user)
            .then(() => dispatch(fetchUserProfile()))
            .then(() => {
                setIsDisableButton(false);
                props.handleClose()
            })
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Добавить</div>
        </div>
    );

    return (
        <>
            {isLoaded && (
                <>
                    <Upload
                        accept="image/*,.png"
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture-card"
                        customRequest={dummyRequest}
                        fileList={fileList}
                        onChange={handleChangeUpdate}
                        onRemove={(file) => {
                            fileList.forEach((el: any) => {
                                if (el.url === file.url) {
                                    dispatch(setUserProfilePhoto(null));
                                    setFileList([]);
                                }
                            })
                        }}
                    >
                        {fileList.length >= 1 ? null : uploadButton}
                    </Upload>

                    <Button
                        variant="contained"
                        sx={{ mt: 3, mb: 2, width: '122.5px' }}
                        onClick={() => handleUpdate()}
                        disabled={isDisabled}
                    >
                        {isDisableButton ? <CircularProgress size={30} color={"green" as "inherit"} /> : 'Сохранить'}
                    </Button>
                </>
            )}
        </>
    );
};