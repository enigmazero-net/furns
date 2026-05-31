import Head from "next/head";
import {useEffect, useState} from "react";
import settings from "@data/settings";
import Layout from "@components/layout";
import AuthGuard from "@components/auth/guard";
import Breadcrumb from "@components/ui/breadcrumb";
import {getOrders, normalizeOrder} from "@services/api";
import {getAccessToken} from "@services/auth";
import {Col, Container, Row} from "@bootstrap";
import {OrdersTable} from "@components/furns";
import {FurnsPanel, MutedText, PageContent, PanelSubtitle, PanelTitle} from "@components/furns/furns.style";

const toArray = (data) => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.items)) return data.items;
    if (Array.isArray(data?.data)) return data.data;
    return [];
};

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const token = getAccessToken();
        if (!token) {
            setLoading(false);
            return;
        }

        getOrders(token)
            .then((data) => {
                const nextOrders = toArray(data).map(normalizeOrder);
                setOrders(nextOrders);
            })
            .catch((err) => setError(err.message || "Unable to load orders."))
            .finally(() => setLoading(false));
    }, []);

    return (
        <Layout>
            <Head>
                <title>{"Order History :: " + settings?.title}</title>
            </Head>

            <Breadcrumb py={[40, 80]} mb={[60, null, 100]} pageTitle="Order History"/>

            <PageContent>
                <Container>
                    <AuthGuard returnTo="/account/orders">
                        <Row>
                            <Col lg={12}>
                                <FurnsPanel>
                                    <PanelTitle>Customer Orders</PanelTitle>
                                    <PanelSubtitle>
                                        This page reads order status through the Order Management Service after login.
                                    </PanelSubtitle>
                                    {loading && <MutedText>Loading your orders.</MutedText>}
                                    {!loading && error && <MutedText>{error}</MutedText>}
                                    {!loading && !error && orders.length > 0 && <OrdersTable orders={orders}/>}
                                    {!loading && !error && orders.length === 0 && <MutedText>No orders are available for this account.</MutedText>}
                                </FurnsPanel>
                            </Col>
                        </Row>
                    </AuthGuard>
                </Container>
            </PageContent>
        </Layout>
    );
};

export default OrdersPage;
