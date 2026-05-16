import Head from "next/head";
import {useEffect, useState} from "react";
import settings from "@data/settings";
import Layout from "@components/layout";
import Button from "@components/ui/button";
import Breadcrumb from "@components/ui/breadcrumb";
import {getMe, normalizeUser} from "@services/api";
import {getAccessToken, getUserProfile} from "@services/auth";
import {Col, Container, Row} from "@bootstrap";
import {Metrics, ServiceFlow} from "@components/furns";
import {mockOrders, mockUser, serviceFlows} from "@data/furns";
import {
    ActionRow,
    FurnsPanel,
    PageContent,
    PanelSubtitle,
    PanelTitle,
    SummaryList,
} from "@components/furns/furns.style";

const AccountPage = () => {
    const [user, setUser] = useState(mockUser);

    useEffect(() => {
        const token = getAccessToken();
        const tokenProfile = getUserProfile();
        if (tokenProfile) {
            setUser(normalizeUser(tokenProfile));
        }
        if (!token) return;

        getMe(token)
            .then((data) => setUser(normalizeUser(data)))
            .catch(() => {});
    }, []);

    return (
        <Layout>
            <Head>
                <title>{"Account :: " + settings?.title}</title>
            </Head>

            <Breadcrumb py={[40, 80]} mb={[60, null, 100]} pageTitle="My Account"/>

            <PageContent>
                <Container>
                    <FurnsPanel>
                        <PanelTitle>Customer Profile</PanelTitle>
                        <SummaryList>
                            <dt>Name</dt>
                            <dd>{user.name}</dd>
                            <dt>Email</dt>
                            <dd>{user.email}</dd>
                            <dt>Role</dt>
                            <dd>{user.role}</dd>
                        </SummaryList>
                        <ActionRow>
                            <Button tag="a" href="/account/orders" bg="primary" color="white" hvrBg="secondary">
                                View Orders
                            </Button>
                            <Button tag="a" href="/checkout" bg="secondary" color="white" hvrBg="primary">
                                Checkout
                            </Button>
                        </ActionRow>
                    </FurnsPanel>

                    <Row>
                        <Col lg={8}>
                            <FurnsPanel>
                                <PanelTitle>Account Activity</PanelTitle>
                                <PanelSubtitle>
                                    The account area represents authenticated frontend requests to internal order services.
                                </PanelSubtitle>
                                <Metrics
                                    items={[
                                        {label: "Orders", value: mockOrders.length},
                                        {label: "Latest Order", value: mockOrders[0].id},
                                        {label: "Payment Status", value: "Authorized"},
                                        {label: "Notifications", value: "Queued"},
                                    ]}
                                />
                            </FurnsPanel>
                        </Col>
                        <Col lg={4}>
                            <ServiceFlow flows={[...serviceFlows.auth, ...serviceFlows.order]}/>
                        </Col>
                    </Row>
                </Container>
            </PageContent>
        </Layout>
    );
};

export default AccountPage;
