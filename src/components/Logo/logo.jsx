import Image from 'next/image';

import mtBank from "../../../public/logo/mtbank.png";
import googlePay from "../../../public/logo/google-pay-mark.png";
import visaMasterCardBelCard from "../../../public/logo/visa-masterCard-belCard.png";
import mirPay from "../../../public/logo/mir-pay-mark.png"

export function LogoImages() {
    return (
        <div style={{ display: 'flex', direction: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Image height={18} src={mtBank} alt='mtBank' />
            <Image height={30} src={mirPay} alt='mirPay' />
            <Image height={30} src={visaMasterCardBelCard} alt='visaMasterCardBelCard' />
            <Image height={18} src={googlePay} alt='googlePay' />
        </div>
    )
}