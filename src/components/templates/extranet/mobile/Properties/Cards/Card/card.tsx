import React from "react"
import Link from "next/link";

import { Avatar, Divider } from "@mui/material";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemText";
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import s from "./card.module.scss";
import { PropertyStatuses } from "@/utils/Constants/Enums/PropertyStatuses"

export const Card: React.FC<any> = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return(
        <>
            <ListItem>
                <Link
                    className={s.Link}
                    href={`${props.property.id}/update`}
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
                        src={`${props.property.photos[0].url}?width=480`}
                        variant="rounded"
                    />
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <Typography variant="subtitle2">
                            {props.property.name}
                        </Typography>
                    }
                    secondary={
                        <React.Fragment>
                            <Typography variant="caption">
                                Изменено: {(new Date(props.property.updated_at)).toLocaleDateString("ru", { month: 'short', day: 'numeric' })}
                            </Typography>
                        </React.Fragment>
                    }
                />
                <ListItemIcon style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div className={s.Status} style={props.property.status === PropertyStatuses.active ? {borderColor: 'green'} : {borderColor: '#b3b2b2'}}/>
                </ListItemIcon>
                <ListItemIcon style={{ display: 'flex', justifyContent: 'flex-end', maxWidth: '32px' }}>
                    <IconButton
                        aria-label="more"
                        id="long-button"
                        style={{ paddingRight: '0px' }}
                        aria-controls={open ? 'long-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        id="long-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem key={'search on website'} onClick={handleClose}>
                            <Link style={{ color: 'black' }} href={`/${props.property.region.slug}/${props.property.id}`}>Посмотреть на сайте</Link>
                        </MenuItem>
                    </Menu>
                </ListItemIcon>
            </ListItem>
            <Divider component="li" />
        </>
    )
}

