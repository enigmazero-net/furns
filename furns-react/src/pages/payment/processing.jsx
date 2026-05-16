import Head from "next/head";
import settings from "@data/settings";
import Layout from "@components/layout";
import Button from "@components/ui/button";
import Breadcrumb from "@components/ui/breadcrumb";
import {Col, Container, Row} from "@bootstrap";
import {ServiceFlow} from "@components/furns";
import {serviceFlows} from "@data/furns";
import {
    ActionRow,
    FurnsPanel,
    MutedText,
    PageContent,
    PanelSubtitle,
    PanelTitle,
    StepList,
} from "@components/furns/furns.style";

const PaymentProcessingPage = () => (
    <Layout>
        <Head>
            <title>{"Payment Processing :: " + settings?.title}</title>
        </Head>

        <Breadcrumb py={[40, 80]} mb={[60, null, 100]} pageTitle="Payment Processing"/>

        <PageContent>
            <Container>
                <Row>
                    <Col lg={7}>
                        <FurnsPanel>
                            <PanelTitle>Redirecting To Mock Gateway</PanelTitle>
                            <PanelSubtitle>
                                In the backend phase this page will receive the AcquireMock checkout URL from the Payment Processing Service.
                            </PanelSubtitle>
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
                        </FurnsPanel>
                    </Col>
                    <Col lg={5}>
                        <ServiceFlow flows={serviceFlows.payment}/>
                    </Col>
                </Row>
            </Container>
        </PageContent>
    </Layout>
);

export default PaymentProcessingPage;

