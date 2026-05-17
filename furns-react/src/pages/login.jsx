import Head from "next/head";
import {useEffect, useState} from "react";
import settings from "@data/settings";
import Layout from "@components/layout";
import Breadcrumb from "@components/ui/breadcrumb";
import {loginWithKeycloak} from "@services/auth";
import {Col, Container, Row} from "@bootstrap";
import {FurnsPanel, PageContent, PanelSubtitle, PanelTitle} from "@components/furns/furns.style";

const LoginPage = () => {
    const [error, setError] = useState("");

    useEffect(() => {
        loginWithKeycloak("/account").catch((err) => {
            setError(err.message || "Unable to redirect to Keycloak.");
        });
    }, []);

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
