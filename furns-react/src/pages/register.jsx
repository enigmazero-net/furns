import Head from "next/head";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import settings from "@data/settings";
import Layout from "@components/layout";
import Breadcrumb from "@components/ui/breadcrumb";
import {isSignedIn, registerWithKeycloak} from "@services/auth";
import {Col, Container, Row} from "@bootstrap";
import {FurnsPanel, PageContent, PanelSubtitle, PanelTitle} from "@components/furns/furns.style";

const RegisterPage = () => {
    const router = useRouter();
    const [error, setError] = useState("");

    useEffect(() => {
        if (isSignedIn()) {
            router.replace("/account");
            return;
        }

        registerWithKeycloak("/account").catch((err) => {
            setError(err.message || "Unable to redirect to Keycloak.");
        });
    }, [router]);

    return (
        <Layout>
            <Head>
                <title>{"Register :: " + settings?.title}</title>
            </Head>

            <Breadcrumb py={[40, 80]} mb={[60, null, 100]} pageTitle="Create Account"/>

            <PageContent>
                <Container>
                    <Row>
                        <Col lg={7}>
                            <FurnsPanel>
                                <PanelTitle>{error ? "Sign Up Redirect Failed" : "Redirecting To Keycloak"}</PanelTitle>
                                <PanelSubtitle>
                                    {error || "Please wait while we send you to Keycloak for account registration."}
                                </PanelSubtitle>
                            </FurnsPanel>
                        </Col>
                    </Row>
                </Container>
            </PageContent>
        </Layout>
    );
};

export default RegisterPage;
