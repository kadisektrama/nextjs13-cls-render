import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

import { Avatar } from "./Avatar/avatar";
import { updateUserProfile } from "@/api/commonApi";
import './componentPersonalInfo.module.scss';
import { Name } from "./Name/name";
import { Gender } from "./Gender/gender";
import { BirthDate } from "./BirthDate/birthDate";
import { Location } from "./Location/location";
import { dateForViewFormat } from "@/utils/Helpers/Date/date";
import { Phones } from "./Phones/phones";
import { Email } from "./Email/email";
import { useAppSelector } from "@/redux/hooks/hooks";

export const ComponentPersonalInfo: React.FC<any> = (props) => {
    const state = useAppSelector(state => state)
    const searchParams = useSearchParams();
    const [selectedAria, setSelectedAria] = useState(searchParams.get('cellPhones') ? 'phones' : '');
    let router = useRouter();

    let cells = [
        {
            id: 'photo',
            title: 'Фото',
            description: '',
            selectedDescription: 'Выберите аватар',
            component: <Avatar {...props} handleClose={() => setSelectedAria('')} />,
        },
        {
            id: 'name',
            title: 'Имя',
            description: `${state.user.user.user_profile.first_name} ${state.user.user.user_profile.last_name}`,
            selectedDescription: 'Имя, указанное в загранпаспорте, водительском удостоверении или другом выездном документе.',
            component: <Name {...props} handleClose={() => setSelectedAria('')} />,
        },
        {
            id: 'gender',
            title: 'Пол',
            description: `${state.user.user.user_profile.gender === 'male' ? 'Мужской' : ''}${state.user.user.user_profile.gender === 'female' ? 'Женский' : ''}${['male', 'female'].includes(state.user.user.user_profile.gender) ? '' : 'Не выбран' }`,
            selectedDescription: 'Укажите ваш пол.',
            component: <Gender {...props} handleClose={() => setSelectedAria('')} />,
        },
        {
            id: 'birthDate',
            title: 'Дата рождения',
            description: `${dateForViewFormat(state.user.user.user_profile.birthdate)}`,
            selectedDescription: 'Укажите вашу дату рождения.',
            component: <BirthDate {...props} handleClose={() => setSelectedAria('')} />,
        },
        {
            id: 'mail',
            title: 'Электронная почта',
            description: state.user.user.email ? state.user.user.email : 'Не указано',
            selectedDescription: 'Укажите адрес, к которому у вас есть постоянный доступ.',
            component: <Email {...props} handleClose={() => setSelectedAria('')} />,
        },
        {
            id: 'phones',
            title: 'Телефоны',
            description: 'Контактные телефоны (для связи с Kvartiranasutki и гостями, подтвердившими бронирование). Также можно добавить в аккаунт другие номера и указать их назначение.',
            selectedDescription: '',
            component: <Phones {...props} handleClose={() => setSelectedAria('')} />,
        },
        {
            id: 'location',
            title: 'Адрес',
            description: `${state.user.user.user_profile.location ? state.user.user.user_profile.location : 'Не выбрано'}`,
            selectedDescription: 'Используйте постоянный адрес.',
            component: <Location {...props} handleClose={() => setSelectedAria('')} />,
        }
    ]

    const handleSubmit = (event: any) => {
        event.preventDefault();

        updateUserProfile(state.user.user)
            .then(res => {
                if (res.status === 204) {
                    router.push(`/guest/account-settings`)
                }
            })
    };

    return (
        <Box onSubmit={handleSubmit} component="form">
            {cells.map((cell) =>
                <div key={cell.id} id={cell.id} aria-disabled={!(selectedAria === '' || selectedAria === cell.id)}>
                    <Stack
                        spacing={2}
                    >
                        <div></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginRight: '10px', marginLeft: '10px' }}>
                            <div>
                                <Typography component="div" variant="h6" gutterBottom>
                                    {cell.title}
                                </Typography>
                            </div>
                            <>
                                {selectedAria === cell.id ? (
                                    <Button variant="text" sx={{ color: 'black', textTransform: 'none' }} onClick={() => {setSelectedAria('')}}>Отменить</Button>
                                ) : (
                                    <Button variant="text" sx={{ color: 'black', textTransform: 'none' }} onClick={() => {setSelectedAria(cell.id)}}>Редактировать</Button>
                                )}
                            </>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginRight: '10px', marginLeft: '10px', marginTop: 0 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                {selectedAria === cell.id ? cell.selectedDescription : cell.description}
                            </Typography>
                        </div>

                        {selectedAria === cell.id && <Box sx={{ p: 2, pt: 1, pb: 1 }}>{cell.component}</Box>}
                        <Divider />
                    </Stack>
                </div>
            )}
        </Box>
    );
}
