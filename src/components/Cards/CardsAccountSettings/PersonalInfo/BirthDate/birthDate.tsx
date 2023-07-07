import ruLocale from 'date-fns/locale/ru';
import { addYears } from "date-fns";

import TextField from "@mui/material/TextField";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import Button from "@mui/material/Button";

import { dateForRequestFormat } from "@/utils/Helpers/Date/date";
import { updateUserProfile } from "@/api/commonApi";
import { setUserProfileBirthdate } from '@/redux/slices/user';
import { useAppSelector } from '@/redux/hooks/hooks';

export const BirthDate: React.FC<any> = (props) => {
    const state = useAppSelector(state => state)

    const handleSubmit = () => {
        updateUserProfile(state.user.user)
            .then(res => {
                if (res.status === 204) {
                    props.handleClose()
                }
            })
    };

    return(
        <>
            <div style={{ paddingTop: '12px' }}>
                <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
                    <DesktopDatePicker
                        mask="__.__.____"
                        value={state.user.user.user_profile.birthdate}
                        minDate={addYears(new Date(), -100)}
                        maxDate={new Date()}
                        onChange={(newValue: any) => {
                            setUserProfileBirthdate(dateForRequestFormat(newValue));
                        }}
                        label="Дата рождения"
                        renderInput={(params: any) => <TextField {...params}
                                sx={{ background: "white", borderRadius: "3px" }}
                        />}
                    />
                </LocalizationProvider>
            </div>

            <Button
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => handleSubmit()}
            >
                Сохранить
            </Button>
        </>
    )
}