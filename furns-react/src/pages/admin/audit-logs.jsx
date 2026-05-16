import Head from "next/head";
import {useEffect, useState} from "react";
import settings from "@data/settings";
import Layout from "@components/layout";
import Breadcrumb from "@components/ui/breadcrumb";
import {getAdminAuditLogs, normalizeAuditEvent} from "@services/api";
import {getAccessToken} from "@services/auth";
import {Col, Container, Row} from "@bootstrap";
import {ServiceFlow} from "@components/furns";
import {auditEvents, serviceFlows} from "@data/furns";
import {
    FurnsPanel,
    FurnsTable,
    FurnsTableWrap,
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

const AdminAuditLogsPage = () => {
    const [events, setEvents] = useState(auditEvents);

    useEffect(() => {
        const token = getAccessToken();
        if (!token) return;

        getAdminAuditLogs(token)
            .then((data) => {
                const nextEvents = toArray(data).map(normalizeAuditEvent);
                if (nextEvents.length) setEvents(nextEvents);
            })
            .catch(() => {});
    }, []);

    return (
        <Layout>
            <Head>
                <title>{"Audit Logs :: " + settings?.title}</title>
            </Head>

            <Breadcrumb py={[40, 80]} mb={[60, null, 100]} pageTitle="Audit Logs"/>

            <PageContent>
                <Container>
                    <Row>
                        <Col lg={8}>
                            <FurnsPanel>
                                <PanelTitle>Audit Log Store</PanelTitle>
                                <PanelSubtitle>
                                    Audit entries show security, order, payment, and administrative activity from the internal services.
                                </PanelSubtitle>
                                <FurnsTableWrap>
                                    <FurnsTable>
                                        <thead>
                                            <tr>
                                                <th>Time</th>
                                                <th>Actor</th>
                                                <th>Action</th>
                                                <th>Target</th>
                                                <th>Result</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {events.map((event) => (
                                                <tr key={`${event.time}-${event.action}-${event.target}`}>
                                                    <td>{event.time}</td>
                                                    <td>{event.actor}</td>
                                                    <td>{event.action}</td>
                                                    <td>{event.target}</td>
                                                    <td>{event.result}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </FurnsTable>
                                </FurnsTableWrap>
                            </FurnsPanel>
                        </Col>
                        <Col lg={4}>
                            <ServiceFlow flows={serviceFlows.audit}/>
                        </Col>
                    </Row>
                </Container>
            </PageContent>
        </Layout>
    );
};

export default AdminAuditLogsPage;
