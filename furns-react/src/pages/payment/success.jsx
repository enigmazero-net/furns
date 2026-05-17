import Head from "next/head";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import settings from "@data/settings";
import Layout from "@components/layout";
import Button from "@components/ui/button";
import Breadcrumb from "@components/ui/breadcrumb";
import {Col, Container, Row} from "@bootstrap";
import {getAccessToken} from "@services/auth";
import {
    ActionRow,
    FurnsPanel,
    MutedText,
    PageContent,
    PanelSubtitle,
    PanelTitle,
    StatusPill,
    SummaryList,
} from "@components/furns/furns.style";

const getValue = (value, fallback = "Pending") => (
    Array.isArray(value) ? value[0] : value
) || fallback;

const PaymentSuccessPage = () => {
    const router = useRouter();
    const [hasToken, setHasToken] = useState(null);
    const paymentId = getValue(router.query.payment_id || router.query.paymentId, "Confirmed");
    const orderId = getValue(router.query.order_id || router.query.orderId, "Available after login");
    const destination = orderId !== "Available after login"
        ? `/account/orders/${encodeURIComponent(orderId)}`
        : "/account/orders";

    useEffect(() => {
        if (!router.isReady) return;

        const token = getAccessToken();
        setHasToken(Boolean(token));

        const target = token
            ? destination
            : `/login?returnTo=${encodeURIComponent(destination)}`;
        const timeout = window.setTimeout(() => {
            router.replace(target);
        }, 1600);

        return () => window.clearTimeout(timeout);
    }, [destination, router, router.isReady]);

    return (
        <Layout>
            <Head>
                <title>{"Payment Success :: " + settings?.title}</title>
            </Head>

            <Breadcrumb py={[40, 80]} mb={[60, null, 100]} pageTitle="Payment Successful"/>

            <PageContent>
                <Container>
                    <Row>
                        <Col lg={12}>
                            <FurnsPanel>
                                <PanelTitle>Payment Authorized</PanelTitle>
                                <PanelSubtitle>
                                    Your payment was accepted. Login is required before showing private order details.
                                </PanelSubtitle>
                                <SummaryList>
                                    <dt>Order</dt>
                                    <dd>{orderId}</dd>
                                    <dt>Payment</dt>
                                    <dd><StatusPill>Success</StatusPill></dd>
                                    <dt>Gateway Reference</dt>
                                    <dd>{paymentId}</dd>
                                    <dt>Next Step</dt>
                                    <dd>{hasToken ? "Opening order history" : "Redirecting to login"}</dd>
                                </SummaryList>
                                <ActionRow>
                                    <Button tag="a" href={hasToken ? destination : `/login?returnTo=${encodeURIComponent(destination)}`} bg="primary" color="white" hvrBg="secondary">
                                        {hasToken ? "View Order" : "Login To View Order"}
                                    </Button>
                                    <Button tag="a" href="/shop" bg="secondary" color="white" hvrBg="primary">
                                        Continue Shopping
                                    </Button>
                                </ActionRow>
                                <MutedText>
                                    You will be redirected automatically.
                                </MutedText>
                            </FurnsPanel>
                        </Col>
                    </Row>
                </Container>
            </PageContent>
        </Layout>
    );
};

export default PaymentSuccessPage;
