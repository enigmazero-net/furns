import Head from "next/head";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import settings from "@data/settings";
import Layout from "@components/layout";
import Breadcrumb from "@components/ui/breadcrumb";
import {isAdminUser, isSignedIn, loginWithKeycloak} from "@services/auth";
import {Col, Container, Row} from "@bootstrap";
import {FurnsPanel, PageContent, PanelSubtitle, PanelTitle} from "@components/furns/furns.style";

const AdminLoginPage = () => {
    const router = useRouter();
    const [error, setError] = useState("");

    useEffect(() => {
        if (isSignedIn()) {
            router.replace(isAdminUser() ? "/admin" : "/account");
            return;
        }

        loginWithKeycloak("/admin").catch((err) => {
            setError(err.message || "Unable to redirect to Keycloak.");
        });
    }, [router]);

    return (
        <Layout>
            <Head>
                <title>{"Admin Login :: " + settings?.title}</title>
            </Head>

            <Breadcrumb py={[40, 80]} mb={[60, null, 100]} pageTitle="Admin Login"/>

            <PageContent>
                <Container>
                    <Row>
                        <Col lg={7}>
                            <FurnsPanel>
                                <PanelTitle>{error ? "Admin Redirect Failed" : "Redirecting To Keycloak"}</PanelTitle>
                                <PanelSubtitle>
                                    {error || "Please wait while we send you to Keycloak for admin login."}
                                </PanelSubtitle>
                            </FurnsPanel>
                        </Col>
                    </Row>
                </Container>
            </PageContent>
        </Layout>
    );
};

export default AdminLoginPage;
