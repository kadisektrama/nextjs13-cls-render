'use client'

import React, { useState, useEffect, memo } from "react";
import Carousel, { Modal, ModalGateway } from "react-images";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

import { SimpleLoader } from "@/components/Loader/simpleLoader";

function srcset(image: any, size: any, rows = 1, cols = 1) {
    return {
        src: `${image}`,
        srcSet: `${image}`,
    };
}

export const GalleryPhoto: React.FC<any> = memo(function GalleryPhoto({ photos, name }) {
    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);
    const [arrayImages] = useState<any>([]);
    const [isLoaded, setIsLoaded] = useState(false)

    const openLightbox = (index: any) => {
        setCurrentImage(index);
        setViewerIsOpen(true);
    };

    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    };

    useEffect(() => {
        photos.forEach((element: any, index: any) => {
            arrayImages.push({
                img: `${element['url']}?width=1200`,
                cols: index === 0 ? 2 : 1,
                rows: index === 0 ? 2 : 1,
            })
        })
        arrayImages.slice(0, 5);
        setIsLoaded(true);
    }, [])

    return (
        <div>
            {isLoaded ? (
                <>
                    <ImageList
                        sx={{
                            height: 450,
                            borderRadius: 3
                        }}
                        variant="quilted"
                        cols={4}
                        rowHeight={225}
                    >
                        {arrayImages.slice(0, 5).map((item: any, index: any) => (
                            <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
                                <img
                                    {...srcset(item.img, 225, item.rows, item.cols)}
                                    alt={name}
                                    loading="lazy"
                                    onClick={() => openLightbox(index)}
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                    <br/>
                    {/*@ts-ignore*/}
                    <ModalGateway>
                        {viewerIsOpen ? (
                            <Modal onClose={closeLightbox}>
                                <Carousel
                                    currentIndex={currentImage}
                                    views={arrayImages.map((x: any) => ({
                                        ...x,
                                        src: x.img,
                                        srcset: x.srcSet,
                                        caption: x.title
                                    }))}
                                />
                            </Modal>
                        ) : ''}
                    </ModalGateway>
                </>
            ) : <SimpleLoader />}
        </div>
    );
})

