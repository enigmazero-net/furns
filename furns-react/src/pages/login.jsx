import Head from "next/head";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import settings from "@data/settings";
import Layout from "@components/layout";
import Breadcrumb from "@components/ui/breadcrumb";
import {isSignedIn, loginWithKeycloak} from "@services/auth";
import {Col, Container, Row} from "@bootstrap";
import {FurnsPanel, PageContent, PanelSubtitle, PanelTitle} from "@components/furns/furns.style";

const LoginPage = () => {
    const router = useRouter();
    const [error, setError] = useState("");

    useEffect(() => {
        if (!router.isReady) return;

        const returnTo = typeof router.query.returnTo === "string" && router.query.returnTo.startsWith("/")
            ? router.query.returnTo
            : "/account";

        if (isSignedIn()) {
            router.replace(returnTo);
            return;
        }

        loginWithKeycloak(returnTo).catch((err) => {
            setError(err.message || "Unable to redirect to Keycloak.");
        });
    }, [router, router.isReady, router.query.returnTo]);

    return (
        <Layout>
            <Head>
                <title>{"Login :: " + settings?.title}</title>
            </Head>

            <Breadcrumb py={[40, 80]} mb={[60, null, 100]} pageTitle="Customer Login"/>

            <PageContent>
                <Container>
                    <Row>
                        <Col lg={7}>
                            <FurnsPanel>
                                <PanelTitle>{error ? "Login Redirect Failed" : "Redirecting To Keycloak"}</PanelTitle>
                                <PanelSubtitle>
                                    {error || "Please wait while we send you to Keycloak for customer login."}
                                </PanelSubtitle>
                            </FurnsPanel>
                        </Col>
                    </Row>
                </Container>
            </PageContent>
        </Layout>
    );
};

export default LoginPage;
