import Head from "next/head";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import settings from "@data/settings";
import Layout from "@components/layout";
import Breadcrumb from "@components/ui/breadcrumb";
import {getOrder, normalizeOrder} from "@services/api";
import {getAccessToken} from "@services/auth";
import {Col, Container, Row} from "@bootstrap";
import {statusVariant} from "@components/furns";
import {getMockOrder} from "@data/furns";
import {
    FurnsPanel,
    FurnsTable,
    FurnsTableWrap,
    PageContent,
    PanelSubtitle,
    PanelTitle,
    StatusPill,
    SummaryList,
} from "@components/furns/furns.style";

const OrderDetailsPage = () => {
    const router = useRouter();
    const [order, setOrder] = useState(getMockOrder(router.query.id));

    useEffect(() => {
        if (!router.isReady) return;

        const nextOrder = getMockOrder(router.query.id);
        setOrder(nextOrder);

        const token = getAccessToken();
        if (!token) return;

        getOrder(token, router.query.id)
            .then((data) => setOrder(normalizeOrder(data)))
            .catch(() => {});
    }, [router.isReady, router.query.id]);

    return (
        <Layout>
            <Head>
                <title>{`${order.id} :: ${settings?.title}`}</title>
            </Head>

            <Breadcrumb py={[40, 80]} mb={[60, null, 100]} pageTitle={order.id}/>

            <PageContent>
                <Container>
                    <Row>
                        <Col lg={12}>
                            <FurnsPanel>
                                <PanelTitle>Order Details</PanelTitle>
                                <PanelSubtitle>
                                    Payment, order, and notification status stay separate so the gateway webhook can update the order later.
                                </PanelSubtitle>
                                <SummaryList>
                                    <dt>Order Status</dt>
                                    <dd><StatusPill variant={statusVariant(order.status)}>{order.status}</StatusPill></dd>
                                    <dt>Payment Status</dt>
                                    <dd>{order.paymentStatus}</dd>
                                    <dt>Gateway Reference</dt>
                                    <dd>{order.gatewayReference}</dd>
                                    <dt>Notification Status</dt>
                                    <dd>{order.notificationStatus}</dd>
                                    <dt>Shipping Address</dt>
                                    <dd>{order.shippingAddress}</dd>
                                </SummaryList>
                            </FurnsPanel>

                            <FurnsPanel>
                                <PanelTitle>Items</PanelTitle>
                                <FurnsTableWrap>
                                    <FurnsTable>
                                        <thead>
                                            <tr>
                                                <th>Product</th>
                                                <th>Qty</th>
                                                <th>Price</th>
                                                <th>Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {order.items.map((item) => (
                                                <tr key={item.name}>
                                                    <td>{item.name}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>${item.price.toFixed(2)}</td>
                                                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </FurnsTable>
                                </FurnsTableWrap>
                            </FurnsPanel>
                        </Col>
                    </Row>
                </Container>
            </PageContent>
        </Layout>
    );
};

export default OrderDetailsPage;
