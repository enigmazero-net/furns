import Head from "next/head";
import {useEffect, useState} from "react";
import settings from "@data/settings";
import Layout from "@components/layout";
import Input from "@components/ui/input";
import Breadcrumb from "@components/ui/breadcrumb";
import {getAdminOrders, normalizeOrder} from "@services/api";
import {getAccessToken, isAdminUser} from "@services/auth";
import {Col, Container, Row} from "@bootstrap";
import AdminGuard from "@components/admin/guard";
import {OrdersTable} from "@components/furns";
import {mockOrders} from "@data/furns";
import {
    FieldBlock,
    FormGrid,
    FurnsPanel,
    PageContent,
    PanelSubtitle,
    PanelTitle,
} from "@components/furns/furns.style";

const toArray = (data) => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.items)) return data.items;
    if (Array.isArray(data?.data)) return data.data;
    return [];
};

const AdminOrdersPage = () => {
    const [orders, setOrders] = useState(mockOrders);

    useEffect(() => {
        const token = getAccessToken();
        if (!token || !isAdminUser()) return;

        getAdminOrders(token)
            .then((data) => {
                const nextOrders = toArray(data).map(normalizeOrder);
                if (nextOrders.length) setOrders(nextOrders);
            })
            .catch(() => {});
    }, []);

    return (
        <Layout>
            <Head>
                <title>{"Admin Orders :: " + settings?.title}</title>
            </Head>

            <Breadcrumb py={[40, 80]} mb={[60, null, 100]} pageTitle="Admin Orders"/>

            <PageContent>
                <Container>
                    <AdminGuard>
                        <Row>
                        <Col lg={12}>
                            <FurnsPanel>
                                <PanelTitle>Order Management</PanelTitle>
                                <PanelSubtitle>
                                    Review and manage customer orders.
                                </PanelSubtitle>
                                <FormGrid>
                                    <FieldBlock>
                                        <Input id="order-search" label="Search Order" placeholder="ORD-1007"/>
                                    </FieldBlock>
                                    <FieldBlock>
                                        <Input id="status-filter" label="Status Filter" placeholder="Pending, Authorized, Failed"/>
                                    </FieldBlock>
                                </FormGrid>
                                <OrdersTable orders={orders} admin/>
                            </FurnsPanel>
                        </Col>
                        </Row>
                    </AdminGuard>
                </Container>
            </PageContent>
        </Layout>
    );
};

export default AdminOrdersPage;
