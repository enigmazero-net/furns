import Head from "next/head";
import {useEffect, useState} from "react";
import settings from "@data/settings";
import Layout from "@components/layout";
import Button from "@components/ui/button";
import Breadcrumb from "@components/ui/breadcrumb";
import {getAdminPayments, normalizePayment} from "@services/api";
import {getAccessToken, loginWithKeycloak} from "@services/auth";
import {Col, Container, Row} from "@bootstrap";
import {ServiceFlow, statusVariant} from "@components/furns";
import {serviceFlows} from "@data/furns";
import {
    ActionRow,
    FurnsPanel,
    FurnsTable,
    FurnsTableWrap,
    PageContent,
    PanelSubtitle,
    PanelTitle,
    StatusPill,
} from "@components/furns/furns.style";

const toArray = (data) => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.items)) return data.items;
    if (Array.isArray(data?.data)) return data.data;
    return [];
};

const AdminPaymentsPage = () => {
    const [payments, setPayments] = useState([]);
    const [hasToken, setHasToken] = useState(false);

    useEffect(() => {
        const token = getAccessToken();
        setHasToken(Boolean(token));
        if (!token) return;

        getAdminPayments(token)
            .then((data) => setPayments(toArray(data).map(normalizePayment)))
            .catch(() => {});
    }, []);

    const onLoginHandler = () => loginWithKeycloak("/admin/payments");

    return (
        <Layout>
            <Head>
                <title>{"Admin Payments :: " + settings?.title}</title>
            </Head>

            <Breadcrumb py={[40, 80]} mb={[60, null, 100]} pageTitle="Admin Payments"/>

            <PageContent>
                <Container>
                    <Row>
                        <Col lg={8}>
                            <FurnsPanel>
                                <PanelTitle>Payment Transactions</PanelTitle>
                                <PanelSubtitle>
                                    Payment records load from the protected Admin Management Service after Keycloak login.
                                </PanelSubtitle>
                                {!hasToken && (
                                    <ActionRow>
                                        <Button tag="button" bg="primary" color="white" hvrBg="secondary" onClick={onLoginHandler}>
                                            Login With Keycloak
                                        </Button>
                                    </ActionRow>
                                )}
                                <FurnsTableWrap>
                                    <FurnsTable>
                                        <thead>
                                            <tr>
                                                <th>Payment</th>
                                                <th>Order</th>
                                                <th>Status</th>
                                                <th>Amount</th>
                                                <th>Gateway Reference</th>
                                                <th>Created</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {payments.map((payment) => (
                                                <tr key={payment.id}>
                                                    <td>{payment.id}</td>
                                                    <td>{payment.orderId}</td>
                                                    <td><StatusPill variant={statusVariant(payment.status)}>{payment.status}</StatusPill></td>
                                                    <td>{payment.currency} {payment.amount.toFixed(2)}</td>
                                                    <td>{payment.gatewayReference}</td>
                                                    <td>{payment.createdAt}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </FurnsTable>
                                </FurnsTableWrap>
                            </FurnsPanel>
                        </Col>
                        <Col lg={4}>
                            <ServiceFlow flows={[serviceFlows.admin[0], ...serviceFlows.payment]}/>
                        </Col>
                    </Row>
                </Container>
            </PageContent>
        </Layout>
    );
};

export default AdminPaymentsPage;
