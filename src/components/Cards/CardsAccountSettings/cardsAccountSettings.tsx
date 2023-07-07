import { useRouter } from "next/navigation";
import React from "react";

import Box from '@mui/material/Box';
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

import styles from "./cardsAccountSettings.module.scss";

export const ComponentCardsAccountSettings: React.FC = () => {
    const router = useRouter();

    return (
        <div className={styles.grid2Desktop1ModileColumn}>
                <Card variant="outlined" sx={{ borderRadius: 3, display: 'flex', flexDirection: 'row' }}>
                    <ManageAccountsOutlinedIcon sx={{ fontSize: 42, margin: "15px" }}/>
                    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                        <CardContent sx={{ pb: 2 }}>
                            <Typography variant="subtitle2">
                                Персональные данные
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Обновите свои данные и узнайте как мы их используем.
                            </Typography>
                        </CardContent>

                        <CardActions sx={{ justifyContent: 'flex-end' }}>
                            <Button sx={{ p: 1 }} onClick={() => router.push('/guest/account-settings/personal-info')} size="small">Настроить</Button>
                        </CardActions>
                    </Box>
                </Card>

                <Card variant="outlined" sx={{ borderRadius: 3, display: 'flex', flexDirection: 'row' }}>
                    <NotificationsNoneIcon sx={{ fontSize: 42, margin: "15px" }}/>
                    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                        <CardContent sx={{ pb: 2 }}>
                            <Typography variant="subtitle2">
                                Уведомления
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Укажите, какие уведомления вы хотите получать, а какие — нет.
                            </Typography>
                        </CardContent>

                        <CardActions sx={{ justifyContent: 'flex-end' }}>
                            <Button sx={{ p: 1 }} onClick={() => router.push('/guest/account-settings/notifications')} size="small">Настроить</Button>
                        </CardActions>
                    </Box>
                </Card>
        </div>
    );
}
