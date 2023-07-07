import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.min.css';
import { Upload } from 'antd';
import axios from "axios";
import Cookies from "js-cookie";

import { PlusOutlined } from '@ant-design/icons';

import { useAppSelector } from '@/redux/hooks/hooks';

export const Photo: React.FC<any> = (props) => {
    const state = useAppSelector(state => state)
    const [fileList, setFileList] = useState<any>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        props.item.photo_path && props.item.photo_path.forEach((el: any, index: any) => {
            fileList.push({
                'url': el.url,
            });
        })
        setIsLoaded(true);

    }, [])

    const handleChangeUpdate = ({ fileList: newFileList }: any) => setFileList(newFileList);

    const dummyRequest = ({ file, onSuccess }: any) => {
        let formData = new FormData();
        formData.append('image[1]', file);

        axios({
            url: `${process.env.REACT_APP_REST_API}/file-storage/upload-images`,
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`,
            },
            data: formData
        }).then((res) => {
            //let bedroomsInfo = state.property.property.rooms_and_spaces.bedrooms_info;
            //bedroomsInfo[props.index]['photo_path'] = res.data[0].path;

            //props.props.propertyActions.setBedroomsInfo(bedroomsInfo);
        });

        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );

    return (
        <>
            {isLoaded && (
                <>
                    <div>Фото</div>
                    <Upload
                        accept="image/*,.png"
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture-card"
                        customRequest={dummyRequest}
                        fileList={fileList}
                        onChange={handleChangeUpdate}
                        onRemove={(file) => {
                            let bedroomsInfo = props.props.property.roomsAndSpaces.bedrooms_info;
                            bedroomsInfo[props.index]['photo_path'] = '';

                            props.props.propertyActions.setBedroomsInfo(bedroomsInfo);
                        }}
                    >
                        {fileList.length >= 1 ? null : uploadButton}
                    </Upload>
                </>
            )}
        </>
    );
};