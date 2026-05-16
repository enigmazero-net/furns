import Head from "next/head";
import settings from "@data/settings";
import Layout from "@components/layout";
import Button from "@components/ui/button";
import Breadcrumb from "@components/ui/breadcrumb";
import {Col, Container, Row} from "@bootstrap";
import {Metrics, OrdersTable, ServiceFlow} from "@components/furns";
import {adminProducts, auditEvents, mockOrders, serviceFlows} from "@data/furns";
import {
    ActionRow,
    FurnsPanel,
    PageContent,
    PanelSubtitle,
    PanelTitle,
} from "@components/furns/furns.style";

const AdminDashboardPage = () => (
    <Layout>
        <Head>
            <title>{"Admin Dashboard :: " + settings?.title}</title>
        </Head>

        <Breadcrumb py={[40, 80]} mb={[60, null, 100]} pageTitle="Admin Dashboard"/>

        <PageContent>
            <Container>
                <FurnsPanel>
                    <PanelTitle>Admin Management Service</PanelTitle>
                    <PanelSubtitle>
                        This dashboard represents the administrator boundary from the threat diagram.
                    </PanelSubtitle>
                    <Metrics
                        items={[
                            {label: "Orders", value: mockOrders.length},
                            {label: "Products", value: adminProducts.length},
                            {label: "Audit Events", value: auditEvents.length},
                            {label: "Pending Payments", value: 1},
                        ]}
                    />
                    <ActionRow>
                        <Button tag="a" href="/admin/orders" bg="primary" color="white" hvrBg="secondary">
                            Manage Orders
                        </Button>
                        <Button tag="a" href="/admin/products" bg="secondary" color="white" hvrBg="primary">
                            Manage Products
                        </Button>
                        <Button tag="a" href="/admin/audit-logs" bg="primary" color="white" hvrBg="secondary">
                            View Audit Logs
                        </Button>
                    </ActionRow>
                </FurnsPanel>

                <Row>
                    <Col lg={8}>
                        <FurnsPanel>
                            <PanelTitle>Recent Orders</PanelTitle>
                            <OrdersTable orders={mockOrders} admin/>
                        </FurnsPanel>
                    </Col>
                    <Col lg={4}>
                        <ServiceFlow flows={serviceFlows.admin}/>
                    </Col>
                </Row>
            </Container>
        </PageContent>
    </Layout>
);

export default AdminDashboardPage;

