import * as React from 'react';

import { Avatar, Divider, Typography } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Button from "@mui/material/Button";

import { deletePropertyFavourite } from "@/api/commonApi";

import { useAppDispatch } from '@/redux/hooks/hooks';
import { fetchPropertyFavourites } from '@/redux/thunk/propertyFavourite';

export const Card: React.FC<any> = (props) => {
    const dispatch = useAppDispatch()

    const handleChangeFavourite = () => {
        deletePropertyFavourite(props.id);
        dispatch(fetchPropertyFavourites())
    }

    return(
        <>
            <ListItem>
                <a
                    href={`${window.location.protocol === 'https:' ? process.env.REACT_APP_BASIC : process.env.REACT_APP_LOCAL_BASIC}/${props.region.slug}/${props.id}`}
                    style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}
                />
                <ListItemAvatar
                    sx={{
                        minWidth: 56+16
                    }}
                >
                    <Avatar
                        sx={{
                            width: 56,
                            height: 40
                        }}
                        src={`${props.photos[0].url}?width=480`}
                        variant="rounded"
                    />
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="subtitle2" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {props.name}
                            </Typography>

                            <Button variant="outlined" onClick={() => handleChangeFavourite()} size={"small"}>
                                {<FavoriteIcon />}
                            </Button>
                        </div>
                    }
                    secondary={
                        <React.Fragment>
                            <Typography variant="caption">
                                Изменено: {(new Date(props.updated_at)).toLocaleDateString("ru", { month: 'short', day: 'numeric' })}
                            </Typography>
                        </React.Fragment>
                    }
                />
            </ListItem>
            <Divider component="li" />
        </>
    )
}
