import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Button from "@components/ui/button";
import {getAccessToken, loginWithKeycloak, registerWithKeycloak} from "@services/auth";
import {ActionRow, FurnsPanel, PanelSubtitle, PanelTitle} from "@components/furns/furns.style";

const AuthGuard = ({children, returnTo}) => {
    const router = useRouter();
    const [access, setAccess] = useState("checking");

    useEffect(() => {
        if (!router.isReady) return;

        setAccess(getAccessToken() ? "allowed" : "denied");
    }, [router.isReady]);

    const redirectPath = returnTo || router.asPath || "/account";

    if (access === "allowed") return children;

    if (access === "denied") {
        return (
            <FurnsPanel>
                <PanelTitle>Sign In Required</PanelTitle>
                <PanelSubtitle>Sign in before viewing private account or checkout details.</PanelSubtitle>
                <ActionRow>
                    <Button tag="button" bg="primary" color="white" hvrBg="secondary" onClick={() => loginWithKeycloak(redirectPath)}>
                        Login
                    </Button>
                    <Button tag="button" bg="secondary" color="white" hvrBg="primary" onClick={() => registerWithKeycloak(redirectPath)}>
                        Sign Up
                    </Button>
                </ActionRow>
            </FurnsPanel>
        );
    }

    return (
        <FurnsPanel>
            <PanelTitle>Checking Access</PanelTitle>
            <PanelSubtitle>Verifying your signed-in session before showing this page.</PanelSubtitle>
        </FurnsPanel>
    );
};

export default AuthGuard;
