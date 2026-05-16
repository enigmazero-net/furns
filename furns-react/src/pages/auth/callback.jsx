import Head from "next/head";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import settings from "@data/settings";
import Layout from "@components/layout";
import Loader from "@components/ui/loader";
import Breadcrumb from "@components/ui/breadcrumb";
import {Container} from "@bootstrap";
import {exchangeKeycloakCode} from "@services/auth";
import {FurnsPanel, PageContent, PanelSubtitle, PanelTitle} from "@components/furns/furns.style";

const AuthCallbackPage = () => {
    const router = useRouter();
    const [error, setError] = useState("");

    useEffect(() => {
        const {code, state} = router.query;
        if (!code || !state) return;

        exchangeKeycloakCode({code, state})
            .then(({redirectPath}) => router.replace(redirectPath))
            .catch((err) => setError(err.message || "Login failed."));
    }, [router]);

    return (
        <Layout>
            <Head>
                <title>{"Signing In :: " + settings?.title}</title>
            </Head>

            <Breadcrumb py={[40, 80]} mb={[60, null, 100]} pageTitle="Signing In"/>

            <PageContent>
                <Container>
                    <FurnsPanel>
                        <PanelTitle>{error ? "Authentication Failed" : "Completing Login"}</PanelTitle>
                        {error ? (
                            <PanelSubtitle>{error}</PanelSubtitle>
                        ) : (
                            <>
                                <PanelSubtitle>Finishing the Keycloak session and returning to Furns.</PanelSubtitle>
                                <Loader/>
                            </>
                        )}
                    </FurnsPanel>
                </Container>
            </PageContent>
        </Layout>
    );
};

export default AuthCallbackPage;
