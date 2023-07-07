import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Upload } from 'antd';
import axios from "axios";
import Cookies from "js-cookie";
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import update from 'immutability-helper';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';

import { PlusOutlined } from '@ant-design/icons';
import Typography from "@mui/material/Typography";
import { Tooltip } from "@mui/material";

import 'antd/dist/reset.css';
import './photos.css';
import { useAppSelector } from '@/redux/hooks/hooks';
import { setPhotos, deletePhotos } from '@/redux/slices/property';

const type = 'DragableUploadList';

const DragableUploadListItem: React.FC<any> = ({ originNode, moveRow, file, fileList }) => {
    const ref = useRef(null);
    const index = fileList.indexOf(file);
    const [{ isOver, dropClassName }, drop] = useDrop({
        accept: type,
        collect: (monitor) => {
            const { index: dragIndex } = monitor.getItem() || {};

            if (dragIndex === index) {
                return {};
            }

            return {
                isOver: monitor.isOver(),
                dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
            };
        },
        drop: (item: any) => {
            moveRow(item.index, index);
        },
    });
    const [, drag] = useDrag({
        type,
        item: {
            index,
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    drop(drag(ref));
    const errorNode = <Tooltip title="Upload Error">{originNode.props.children}</Tooltip>;
    return (
        <div
            ref={ref}
            className={`ant-upload-draggable-list-item ${isOver ? dropClassName : ''}`}
            style={{
                cursor: 'move',
                width: '102px',
                height: '102px',
            }}
        >
            {file.status === 'error' ? errorNode : originNode}
        </div>
    );
};

export const Photos: React.FC<any> = (props) => {
    const state = useAppSelector(state => state)
    const [fileList, setFileList] = useState<any>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        state.property.property.initialPhotos?.forEach((el: any) => {
            fileList.push({
                'url': el.url,
            });
        })

       setIsLoaded(true);
    }, [])

    const handleChangeUpdate = ({ fileList: newFileList }: any) => {
        newFileList.length === state.property.property.photos.length && props.setIsDisabled(false);
        setFileList(newFileList)
    };

    const dummyRequest = async ({ file, onSuccess }: any) => {
        let formData = new FormData();
        formData.append('image[1]', file);

        await axios({
            url: `${process.env.REACT_APP_REST_API}/file-storage/upload-images`,
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`,
            },
            data: formData
        }).then((res) => {
            let photos = state.property.property.photos ? state.property.property.photos : [];
            res.data.map((item: any) => {
                photos[fileList.findIndex((i: any) => i.uid === file.uid)] = {
                    'path': item.path
                };

                return true;
            })

            setPhotos(
                photos.map((photo: any, index: any) => {
                    return {'path': photo.path, 'order': index + 1}
                })
            );
        });

        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    };

    const moveRow = useCallback(
        (dragIndex: any, hoverIndex: any) => {
            const dragRow = fileList[dragIndex];
            const storeDragRow = state.property.property.photos[dragIndex];

            let updatesList = update(state.property.property.photos, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, {path: storeDragRow.path}],
                ],
            })
            setPhotos(
                updatesList.map((photo: any, index: any) => {
                    return {'path': photo.path, 'order': index + 1}
                })
            );

            setFileList(
                update(fileList, {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, dragRow],
                    ],
                }),
            );
        },

        [fileList],
    );

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
                    <div>Фото</div>
                    <DndProvider backend={window.screen.availWidth > window.screen.availHeight ? (HTML5Backend) : (TouchBackend)}>
                        <Upload
                            accept="image/*,.png"
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            listType="picture-card"
                            customRequest={dummyRequest}
                            fileList={fileList}
                            onChange={handleChangeUpdate}
                            beforeUpload={() => props.setIsDisabled(true)}
                            multiple={true}
                            itemRender={(originNode, file, currFileList) => (
                                <DragableUploadListItem
                                    originNode={originNode}
                                    file={file}
                                    fileList={currFileList}
                                    moveRow={moveRow}
                                />
                            )}
                            locale={{
                                uploading: 'Загрузка...'
                            }}
                            onRemove={(file) => {
                                fileList.forEach((el: any, index: any) => {
                                    if (el.uid === file.uid) {
                                        let photos = state.property.property.photos;
                                        photos.splice(index, 1);
                                        setPhotos(photos);

                                        fileList.splice(index, 1)
                                        setFileList(fileList);
                                    }
                                })
                            }}
                        >
                            {fileList.length >= 45 ? null : uploadButton}
                        </Upload>
                    </DndProvider>
                    <Typography variant="body2" component="h2" color="text.secondary">
                        {"* Для публикации необходимо 5 и более фотографий."}
                    </Typography>
                </>
            )}
        </>
    );
};