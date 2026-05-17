import Head from "next/head";
import {useEffect, useState} from "react";
import settings from "@data/settings";
import Layout from "@components/layout";
import Breadcrumb from "@components/ui/breadcrumb";
import {getAdminPayments, normalizePayment} from "@services/api";
import {getAccessToken, isAdminUser} from "@services/auth";
import {Col, Container, Row} from "@bootstrap";
import AdminGuard from "@components/admin/guard";
import {statusVariant} from "@components/furns";
import {
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

    useEffect(() => {
        const token = getAccessToken();
        if (!token || !isAdminUser()) return;

        getAdminPayments(token)
            .then((data) => setPayments(toArray(data).map(normalizePayment)))
            .catch(() => {});
    }, []);

    return (
        <Layout>
            <Head>
                <title>{"Admin Payments :: " + settings?.title}</title>
            </Head>

            <Breadcrumb py={[40, 80]} mb={[60, null, 100]} pageTitle="Admin Payments"/>

            <PageContent>
                <Container>
                    <AdminGuard>
                        <Row>
                        <Col lg={12}>
                            <FurnsPanel>
                                <PanelTitle>Payment Transactions</PanelTitle>
                                <PanelSubtitle>
                                    Payment records load after administrator access is verified.
                                </PanelSubtitle>
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
                        </Row>
                    </AdminGuard>
                </Container>
            </PageContent>
        </Layout>
    );
};

export default AdminPaymentsPage;
