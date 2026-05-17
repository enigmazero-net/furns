import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Button from "@components/ui/button";
import {getAccessToken, isAdminUser} from "@services/auth";
import {ActionRow, FurnsPanel, PanelSubtitle, PanelTitle} from "@components/furns/furns.style";

const AdminGuard = ({children}) => {
    const router = useRouter();
    const [access, setAccess] = useState("checking");

    useEffect(() => {
        if (!getAccessToken()) {
            router.replace("/admin/login");
            return;
        }

        setAccess(isAdminUser() ? "allowed" : "denied");
    }, [router]);

    if (access === "allowed") return children;

    if (access === "denied") {
        return (
            <FurnsPanel>
                <PanelTitle>Admin Access Required</PanelTitle>
                <PanelSubtitle>Your signed-in account does not have an administrator role.</PanelSubtitle>
                <ActionRow>
                    <Button tag="a" href="/account" bg="primary" color="white" hvrBg="secondary">
                        Go To Account
                    </Button>
                </ActionRow>
            </FurnsPanel>
        );
    }

    return (
        <FurnsPanel>
            <PanelTitle>Checking Admin Access</PanelTitle>
            <PanelSubtitle>Verifying your administrator role before showing this page.</PanelSubtitle>
        </FurnsPanel>
    );
};

export default AdminGuard;
