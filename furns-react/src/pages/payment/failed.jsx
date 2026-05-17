import Head from "next/head";
import {useRouter} from "next/router";
import settings from "@data/settings";
import Layout from "@components/layout";
import Button from "@components/ui/button";
import Breadcrumb from "@components/ui/breadcrumb";
import {Col, Container, Row} from "@bootstrap";
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

const getValue = (value, fallback = "Unavailable") => (
    Array.isArray(value) ? value[0] : value
) || fallback;

const PaymentFailedPage = () => {
    const router = useRouter();
    const paymentId = getValue(router.query.payment_id || router.query.paymentId);
    const reason = getValue(router.query.reason || router.query.error, "Payment was declined or cancelled.");

    return (
        <Layout>
            <Head>
                <title>{"Payment Failed :: " + settings?.title}</title>
            </Head>

            <Breadcrumb py={[40, 80]} mb={[60, null, 100]} pageTitle="Payment Failed"/>

            <PageContent>
                <Container>
                    <Row>
                        <Col lg={12}>
                            <FurnsPanel>
                                <PanelTitle>Payment Was Not Authorized</PanelTitle>
                                <PanelSubtitle>
                                    The payment did not complete. You can retry checkout or login to review your orders.
                                </PanelSubtitle>
                                <SummaryList>
                                    <dt>Payment</dt>
                                    <dd><StatusPill variant="danger">Failed</StatusPill></dd>
                                    <dt>Gateway Reference</dt>
                                    <dd>{paymentId}</dd>
                                    <dt>Reason</dt>
                                    <dd>{reason}</dd>
                                    <dt>Next Step</dt>
                                    <dd>Retry payment or login to check order status.</dd>
                                </SummaryList>
                                <ActionRow>
                                    <Button tag="a" href="/checkout" bg="primary" color="white" hvrBg="secondary">
                                        Retry Checkout
                                    </Button>
                                    <Button tag="a" href="/login?returnTo=%2Faccount%2Forders" bg="secondary" color="white" hvrBg="primary">
                                        Login
                                    </Button>
                                    <Button tag="a" href="/cart" bg="secondary" color="white" hvrBg="primary">
                                        Back To Cart
                                    </Button>
                                </ActionRow>
                                <MutedText>
                                    Failed payments are not confirmed until the backend records a successful gateway result.
                                </MutedText>
                            </FurnsPanel>
                        </Col>
                    </Row>
                </Container>
            </PageContent>
        </Layout>
    );
};

export default PaymentFailedPage;
