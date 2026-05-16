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

const order = mockOrders[0];

const PaymentSuccessPage = () => (
    <Layout>
        <Head>
            <title>{"Payment Success :: " + settings?.title}</title>
        </Head>

        <Breadcrumb py={[40, 80]} mb={[60, null, 100]} pageTitle="Payment Successful"/>

        <PageContent>
            <Container>
                <Row>
                    <Col lg={7}>
                        <FurnsPanel>
                            <PanelTitle>Payment Authorized</PanelTitle>
                            <PanelSubtitle>
                                The page shows the customer-facing result, while the backend webhook remains the source of truth for order status.
                            </PanelSubtitle>
                            <SummaryList>
                                <dt>Order</dt>
                                <dd>{order.id}</dd>
                                <dt>Payment</dt>
                                <dd><StatusPill>{order.paymentStatus}</StatusPill></dd>
                                <dt>Gateway Reference</dt>
                                <dd>{order.gatewayReference}</dd>
                                <dt>Notification</dt>
                                <dd>{order.notificationStatus}</dd>
                            </SummaryList>
                            <ActionRow>
                                <Button tag="a" href={`/account/orders/${order.id}`} bg="primary" color="white" hvrBg="secondary">
                                    View Order
                                </Button>
                                <Button tag="a" href="/shop" bg="secondary" color="white" hvrBg="primary">
                                    Continue Shopping
                                </Button>
                            </ActionRow>
                        </FurnsPanel>
                    </Col>
                    <Col lg={5}>
                        <ServiceFlow flows={[...serviceFlows.payment, ...serviceFlows.notification]}/>
                    </Col>
                </Row>
            </Container>
        </PageContent>
    </Layout>
);

export default PaymentSuccessPage;

