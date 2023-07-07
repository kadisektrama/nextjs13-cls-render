import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import Button from "@mui/material/Button";

export const Rules: React.FC = () => {
    let {id} = useParams();

    return (
        <div>
            <Stack
                spacing={2}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginRight: '10px', marginLeft: '10px', marginTop: '16px' }}>
                    <div>
                        <Typography component="div" variant="h6" gutterBottom>
                            Правила размещения
                        </Typography>
                    </div>
                    <>
                        <Link href={`/host/properties/${id}/update/rules`}>
                            <Button variant="text" sx={{ textDecoration: 'underline', color: 'black', textTransform: 'none' }}>Редактировать<KeyboardArrowRightOutlinedIcon /></Button>
                        </Link>
                    </>
                </div>
                <Divider />
            </Stack>
        </div>
    )
}