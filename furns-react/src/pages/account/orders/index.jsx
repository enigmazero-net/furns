import Head from "next/head";
import settings from "@data/settings";
import Layout from "@components/layout";
import Breadcrumb from "@components/ui/breadcrumb";
import {Col, Container, Row} from "@bootstrap";
import {OrdersTable, ServiceFlow} from "@components/furns";
import {mockOrders, serviceFlows} from "@data/furns";
import {FurnsPanel, PageContent, PanelSubtitle, PanelTitle} from "@components/furns/furns.style";

const OrdersPage = () => (
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
                                This page will later read order status through the Order Management Service.
                            </PanelSubtitle>
                            <OrdersTable orders={mockOrders}/>
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

export default OrdersPage;

