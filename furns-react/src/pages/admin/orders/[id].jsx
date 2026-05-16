import Head from "next/head";
import {useRouter} from "next/router";
import settings from "@data/settings";
import Layout from "@components/layout";
import Input from "@components/ui/input";
import Button from "@components/ui/button";
import Breadcrumb from "@components/ui/breadcrumb";
import {Col, Container, Row} from "@bootstrap";
import {ServiceFlow, statusVariant} from "@components/furns";
import {getMockOrder, serviceFlows} from "@data/furns";
import {
    ActionRow,
    FieldBlock,
    FormGrid,
    FurnsPanel,
    FurnsTable,
    FurnsTableWrap,
    PageContent,
    PanelSubtitle,
    PanelTitle,
    StatusPill,
    SummaryList,
} from "@components/furns/furns.style";

const AdminOrderDetailsPage = () => {
    const router = useRouter();
    const order = getMockOrder(router.query.id);

    return (
        <Layout>
            <Head>
                <title>{`Admin ${order.id} :: ${settings?.title}`}</title>
            </Head>

            <Breadcrumb py={[40, 80]} mb={[60, null, 100]} pageTitle={`Admin ${order.id}`}/>

            <PageContent>
                <Container>
                    <Row>
                        <Col lg={8}>
                            <FurnsPanel>
                                <PanelTitle>Order Review</PanelTitle>
                                <SummaryList>
                                    <dt>Customer</dt>
                                    <dd>{order.customer}</dd>
                                    <dt>Email</dt>
                                    <dd>{order.email}</dd>
                                    <dt>Payment Status</dt>
                                    <dd>{order.paymentStatus}</dd>
                                    <dt>Order Status</dt>
                                    <dd><StatusPill variant={statusVariant(order.status)}>{order.status}</StatusPill></dd>
                                    <dt>Gateway Reference</dt>
                                    <dd>{order.gatewayReference}</dd>
                                </SummaryList>
                            </FurnsPanel>

                            <FurnsPanel>
                                <PanelTitle>Update Status</PanelTitle>
                                <PanelSubtitle>
                                    Status updates will write an administrative audit event before the backend is connected.
                                </PanelSubtitle>
                                <FormGrid>
                                    <FieldBlock>
                                        <Input id="status" label="New Status" placeholder="Confirmed"/>
                                    </FieldBlock>
                                    <FieldBlock>
                                        <Input id="reason" label="Reason" placeholder="Payment authorized by mock gateway"/>
                                    </FieldBlock>
                                </FormGrid>
                                <ActionRow>
                                    <Button tag="button" bg="primary" color="white" hvrBg="secondary">
                                        Save Status
                                    </Button>
                                    <Button tag="a" href="/admin/audit-logs" bg="secondary" color="white" hvrBg="primary">
                                        View Audit Event
                                    </Button>
                                </ActionRow>
                            </FurnsPanel>

                            <FurnsPanel>
                                <PanelTitle>Order Items</PanelTitle>
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
                        <Col lg={4}>
                            <ServiceFlow flows={[serviceFlows.admin[0], serviceFlows.admin[2], serviceFlows.admin[1]]}/>
                        </Col>
                    </Row>
                </Container>
            </PageContent>
        </Layout>
    );
};

export default AdminOrderDetailsPage;

