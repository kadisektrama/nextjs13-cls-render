import React from 'react';

import Container from '@mui/material/Container';

import { ComponentCardsAccountSettings } from "@/components/Cards/CardsAccountSettings/cardsAccountSettings";
import { AccountHeader } from "@/components/Mobile/AccountHeader/accountHeader";

export const AccountSettings: React.FC = () => {
    return (
        <AccountHeader name={'Аккаунт'}>
            <Container>
                <ComponentCardsAccountSettings />
            </Container>
        </AccountHeader>
    );
}
