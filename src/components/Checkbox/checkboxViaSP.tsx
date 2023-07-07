import * as React from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { Checkbox } from "@mui/material";

type TMapStateToProps = {
    name: string,
    field_name: string
}

export const CustomCheckbox = ({ name, field_name }: TMapStateToProps) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    return (
        <div>
            <Checkbox 
                sx={{ padding: "3px", fontSize: "13px" }} 
                checked={searchParams.has(field_name)} 
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => 
                    {
                        const search = searchParams.toString() ? Object.fromEntries(searchParams.entries() || []) : {}
                        const params = event.target.checked 
                            ? new URLSearchParams({...search, page: '1', [field_name]: 1 + ""}).toString()
                            : new URLSearchParams({...search, page: '1', [field_name]: ''}).toString()  

                        router.push(`${pathname}?${params}`, {scroll: false})                   
                    }
                }
            />
            <span style={{ fontSize: "13px" }}>
                {name}
                </span>
                </div>
    )
}