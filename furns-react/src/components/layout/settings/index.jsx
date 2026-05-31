import Link from "next/link";
import {useEffect, useState} from "react";
import Logo from "@components/ui/logo";
import OffCanvas from "@components/ui/offCanvas";
import {isAdminUser, isSignedIn} from "@services/auth";
import {OffCanvasCloseBtn, OffCanvasHead} from "@components/ui/offCanvas/style";
import {SettingsWrap, SettingsItem, SettingsFooter} from "@components/layout/settings/settings.style";

const SettingsSidebar = ({isOpen, onHandler}) => {
    const [signedIn, setSignedIn] = useState(null);
    const [adminUser, setAdminUser] = useState(false);

    useEffect(() => {
        setSignedIn(isSignedIn());
        setAdminUser(isAdminUser());
    }, []);

    return (
        <OffCanvas onHandler={onHandler} open={isOpen}>
            <OffCanvasHead>
                <Logo
                    width={100}
                    src="/images/logo/logo.png"
                />
                <OffCanvasCloseBtn onClick={() => onHandler()}>x</OffCanvasCloseBtn>
            </OffCanvasHead>

            <SettingsWrap>
                {signedIn === false && (
                    <SettingsItem>
                        <Link href="/login">Customer Login</Link>
                    </SettingsItem>
                )}

                <SettingsItem>
                    <Link href="/checkout">Checkout</Link>
                </SettingsItem>

                <SettingsItem>
                    <Link href="/account/orders">Order History</Link>
                </SettingsItem>

                {adminUser && (
                    <SettingsItem>
                        <Link href="/admin">Admin Dashboard</Link>
                    </SettingsItem>
                )}
            </SettingsWrap>

            <SettingsFooter>
                <p>Furns local workflow navigation.</p>
            </SettingsFooter>
        </OffCanvas>
    );
};

export default SettingsSidebar;
