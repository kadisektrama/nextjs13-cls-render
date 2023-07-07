import * as React from "react";

import { Typography } from "@mui/material";

import { rangeStartDateEndDate } from "@/utils/Helpers/Date/date";
import { SimpleLoader } from "@/components/Loader/simpleLoader";

export const Information: React.FC<any> = (props) => {
    const [isLoaded] = React.useState(true);

    return(
        <>
            {isLoaded ? (
                <>
                    <div>Информация о бронировании</div>
                    <div>
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis"
                            }}
                        >
                            <div>Даты: {props.chat && rangeStartDateEndDate(props.chat.details.booking.start_date, props.chat.details.booking.end_date)}</div>
                            <div>Гости: {+props.chat?.details.booking.guests.adults + (props.chat?.details.booking.guests.children ? +props.chat?.details.booking.guests.children : 0)}</div>
                        </Typography>
                    </div>
                </>
            ) : <SimpleLoader />}
        </>
    )
}