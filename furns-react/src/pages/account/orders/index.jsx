import Head from "next/head";
import {useEffect, useState} from "react";
import settings from "@data/settings";
import Layout from "@components/layout";
import Breadcrumb from "@components/ui/breadcrumb";
import {getOrders, normalizeOrder} from "@services/api";
import {getAccessToken} from "@services/auth";
import {Col, Container, Row} from "@bootstrap";
import {OrdersTable, ServiceFlow} from "@components/furns";
import {mockOrders, serviceFlows} from "@data/furns";
import {FurnsPanel, PageContent, PanelSubtitle, PanelTitle} from "@components/furns/furns.style";

const toArray = (data) => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.items)) return data.items;
    if (Array.isArray(data?.data)) return data.data;
    return [];
};

const OrdersPage = () => {
    const [orders, setOrders] = useState(mockOrders);

    useEffect(() => {
        const token = getAccessToken();
        if (!token) return;

        getOrders(token)
            .then((data) => {
                const nextOrders = toArray(data).map(normalizeOrder);
                if (nextOrders.length) setOrders(nextOrders);
            })
            .catch(() => {});
    }, []);

    return (
        <Layout>
            <Head>
                <title>{"Order History :: " + settings?.title}</title>
            </Head>

            <Breadcrumb py={[40, 80]} mb={[60, null, 100]} pageTitle="Order History"/>

            <PageContent>
                <Container>
                    <Row>
                        <Col lg={8}>
                            <FurnsPanel>
                                <PanelTitle>Customer Orders</PanelTitle>
                                <PanelSubtitle>
                                    This page reads order status through the Order Management Service after login.
                                </PanelSubtitle>
                                <OrdersTable orders={orders}/>
                            </FurnsPanel>
                        </Col>
                        <Col lg={4}>
                            <ServiceFlow flows={serviceFlows.order}/>
                        </Col>
                    </Row>
                </Container>
            </PageContent>
        </Layout>
    );
};

export default OrdersPage;
