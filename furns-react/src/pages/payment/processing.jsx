import Head from "next/head";
import {useEffect, useState} from "react";
import settings from "@data/settings";
import Layout from "@components/layout";
import Button from "@components/ui/button";
import Breadcrumb from "@components/ui/breadcrumb";
import {getAccessToken, loginWithKeycloak, registerWithKeycloak} from "@services/auth";
import {Col, Container, Row} from "@bootstrap";
import {
    ActionRow,
    FurnsPanel,
    MutedText,
    PageContent,
    PanelSubtitle,
    PanelTitle,
    StepList,
} from "@components/furns/furns.style";

const PaymentProcessingPage = () => {
    const [hasToken, setHasToken] = useState(null);

    useEffect(() => {
        setHasToken(Boolean(getAccessToken()));
    }, []);

    return (
        <Layout>
            <Head>
                <title>{"Payment Processing :: " + settings?.title}</title>
            </Head>

            <Breadcrumb py={[40, 80]} mb={[60, null, 100]} pageTitle="Payment Processing"/>

            <PageContent>
                <Container>
                    <Row>
                        <Col lg={12}>
                            <FurnsPanel>
                                <PanelTitle>
                                    {hasToken === null
                                        ? "Checking Session"
                                        : hasToken
                                            ? "Redirecting To Mock Gateway"
                                            : "Login Required"}
                                </PanelTitle>
                                <PanelSubtitle>
                                    {hasToken === null
                                        ? "Checking your customer session before payment."
                                        : hasToken
                                            ? "The payment service will create an AcquireMock invoice and redirect you to the mock gateway."
                                            : "You must login before making a payment. Create an account first if you do not already have one."}
                                </PanelSubtitle>
                                {hasToken === true ? (
                                    <>
                                        <StepList>
                                            <li>Payment Processing Service creates an AcquireMock invoice.</li>
                                            <li>Customer completes payment in the external mock gateway boundary.</li>
                                            <li>Gateway returns success, failure, or cancellation to the application.</li>
                                        </StepList>
                                        <ActionRow>
                                            <Button tag="a" href="/payment/success" bg="primary" color="white" hvrBg="secondary">
                                                Simulate Success
                                            </Button>
                                            <Button tag="a" href="/payment/failed" bg="secondary" color="white" hvrBg="primary">
                                                Simulate Failure
                                            </Button>
                                        </ActionRow>
                                        <MutedText>No card fields are stored in the frontend.</MutedText>
                                    </>
                                ) : hasToken === false ? (
                                    <ActionRow>
                                        <Button tag="button" bg="primary" color="white" hvrBg="secondary" onClick={() => loginWithKeycloak("/payment/processing")}>
                                            Login
                                        </Button>
                                        <Button tag="button" bg="secondary" color="white" hvrBg="primary" onClick={() => registerWithKeycloak("/checkout")}>
                                            Sign Up
                                        </Button>
                                    </ActionRow>
                                ) : null}
                            </FurnsPanel>
                        </Col>
                    </Row>
                </Container>
            </PageContent>
        </Layout>
    );
};

export default PaymentProcessingPage;
