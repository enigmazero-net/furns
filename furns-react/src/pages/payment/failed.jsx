import Head from "next/head";
import settings from "@data/settings";
import Layout from "@components/layout";
import Button from "@components/ui/button";
import Breadcrumb from "@components/ui/breadcrumb";
import {Col, Container, Row} from "@bootstrap";
import {ServiceFlow} from "@components/furns";
import {mockOrders, serviceFlows} from "@data/furns";
import {
    ActionRow,
    FurnsPanel,
    PageContent,
    PanelSubtitle,
    PanelTitle,
    StatusPill,
    SummaryList,
} from "@components/furns/furns.style";

const order = mockOrders[2];

const PaymentFailedPage = () => (
    <Layout>
        <Head>
            <title>{"Payment Failed :: " + settings?.title}</title>
        </Head>

        <Breadcrumb py={[40, 80]} mb={[60, null, 100]} pageTitle="Payment Failed"/>

        <PageContent>
            <Container>
                <Row>
                    <Col lg={7}>
                        <FurnsPanel>
                            <PanelTitle>Payment Was Not Authorized</PanelTitle>
                            <PanelSubtitle>
                                Failed payments stay visible so the customer can retry and the payment transaction store can keep the failed attempt.
                            </PanelSubtitle>
                            <SummaryList>
                                <dt>Order</dt>
                                <dd>{order.id}</dd>
                                <dt>Payment</dt>
                                <dd><StatusPill variant="danger">{order.paymentStatus}</StatusPill></dd>
                                <dt>Gateway Reference</dt>
                                <dd>{order.gatewayReference}</dd>
                                <dt>Notification</dt>
                                <dd>{order.notificationStatus}</dd>
                            </SummaryList>
                            <ActionRow>
                                <Button tag="a" href="/payment/processing" bg="primary" color="white" hvrBg="secondary">
                                    Retry Payment
                                </Button>
                                <Button tag="a" href="/cart" bg="secondary" color="white" hvrBg="primary">
                                    Back To Cart
                                </Button>
                            </ActionRow>
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

export default PaymentFailedPage;

