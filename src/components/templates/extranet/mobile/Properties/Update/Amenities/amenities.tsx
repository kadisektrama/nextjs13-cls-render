import { useParams } from "next/navigation";
import Link from "next/link";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import Button from "@mui/material/Button";
import { useAppSelector } from "@/redux/hooks/hooks";

export const Amenities: React.FC  = () => {
    const state = useAppSelector(state => state)
    let { id } = useParams();

    return (
        <div>
            <Stack
                spacing={2}
            >
                <Divider />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginRight: '10px', marginLeft: '10px' }}>
                    <div>
                        <Typography component="div" variant="h6" gutterBottom>
                            Удобства
                        </Typography>
                    </div>
                    <>
                        <Link href={`/host/properties/${id}/update/amenities`}>
                            <Button variant="text" sx={{ textDecoration: 'underline', color: 'black', textTransform: 'none' }}>Редактировать<KeyboardArrowRightOutlinedIcon /></Button>
                        </Link>
                    </>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginRight: '10px', marginLeft: '10px', marginTop: 0 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        <div>
                            {state.property.property.amenities.filter((amenity: any) => amenity.status === true).slice(0, 8).map((amenity: any) => (
                                <div key={amenity.id}>{amenity.name}</div>
                            ))}
                        </div>
                    </Typography>
                </div>
                <Divider />
            </Stack>
        </div>
    )
}