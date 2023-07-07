import { BottomSheet } from "react-spring-bottom-sheet";
import React from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Anchor } from 'antd';
import { useAppSelector } from "@/redux/hooks/hooks";

export const ModalWindow: React.FC<any> = (props) => {
    const state = useAppSelector(state => state)

    return (
        <BottomSheet
            open={props.open}
            onDismiss={() => props.handleClose()}
            blocking={false}
            snapPoints={({maxHeight }) => [
                maxHeight - 80,
            ]}
        >
            {props.open && (
                <Box sx={{ paddingBottom: '60px', paddingLeft: '5px' }}>
                    <Typography variant="h5" gutterBottom>
                        Типы удобств
                    </Typography>
                    <Stack spacing={2}>
                        <Anchor>
                            {state.amenityCategory.amenityCategories.map((amenityCategory: any) => <Anchor.Link key="anchor" href={`#${amenityCategory.name}`} title={amenityCategory.name} />)}
                        </Anchor>
                    </Stack>
                </Box>
            )}
        </BottomSheet>
    )
}