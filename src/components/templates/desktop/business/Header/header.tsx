'use client'

import { memo } from "react";
import Cookies from "js-cookie";
import React from 'react'

import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import {
    createPropertyFavourite,
    deletePropertyFavourite,
} from "@/api/commonApi";
import { Breadcrumb } from "./BreadCrumb/Breadcrumbs";
import { fetchPropertyFavourites } from '@/redux/thunk/propertyFavourite';
import { useAppDispatch } from "@/redux/hooks/hooks";

export const Header: React.FC<any> = memo(function Header({ name, id, propertyFavourites, setOpenWindowChecking, ...props }) {
    const dispatch = useAppDispatch()

    const handleChangeFavourite = () => {
        if (Cookies.get("token")) {
            !propertyFavourites?.message && propertyFavourites.find((item: any) => item.id === +id) ? deletePropertyFavourite(id) : createPropertyFavourite(id);
            dispatch(fetchPropertyFavourites())
        } else {
            setOpenWindowChecking(true)
        }
    }

    return (
        <div>
            <Typography variant="h5" gutterBottom component="h1">
                {name}
            </Typography>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Breadcrumb name={name} />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button variant="outlined" size={"small"}>
                        Поделиться
                    </Button>
                    <Button variant="outlined" onClick={() => handleChangeFavourite()} size={"small"}>
                        {propertyFavourites && !propertyFavourites.message && propertyFavourites.find((item: any) => item.id === +id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </Button>
                </div>
            </div>
        </div>
    );
})