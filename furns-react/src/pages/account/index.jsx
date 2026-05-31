import Head from "next/head";
import {useEffect, useState} from "react";
import settings from "@data/settings";
import Layout from "@components/layout";
import AuthGuard from "@components/auth/guard";
import Button from "@components/ui/button";
import Breadcrumb from "@components/ui/breadcrumb";
import {getMe, normalizeUser} from "@services/api";
import {getAccessToken, getUserProfile} from "@services/auth";
import {Col, Container, Row} from "@bootstrap";
import {Metrics} from "@components/furns";
import {
    ActionRow,
    FurnsPanel,
    MutedText,
    PageContent,
    PanelSubtitle,
    PanelTitle,
    SummaryList,
} from "@components/furns/furns.style";

const AccountPage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const token = getAccessToken();
        const tokenProfile = getUserProfile();
        if (tokenProfile) {
            setUser(normalizeUser(tokenProfile));
        }
        if (!token) {
            setLoading(false);
            return;
        }

        getMe(token)
            .then((data) => setUser(normalizeUser(data)))
            .catch((err) => setError(err.message || "Unable to load account details."))
            .finally(() => setLoading(false));
    }, []);

    return (
        <Layout>
            <Head>
                <title>{"Account :: " + settings?.title}</title>
            </Head>

            <Breadcrumb py={[40, 80]} mb={[60, null, 100]} pageTitle="My Account"/>

            <PageContent>
                <Container>
                    <AuthGuard returnTo="/account">
                        <FurnsPanel>
                            <PanelTitle>Customer Profile</PanelTitle>
                            {loading && <MutedText>Loading your account.</MutedText>}
                            {!loading && error && <MutedText>{error}</MutedText>}
                            {!loading && !error && user && (
                                <SummaryList>
                                    <dt>Name</dt>
                                    <dd>{user.name}</dd>
                                    <dt>Email</dt>
                                    <dd>{user.email}</dd>
                                    <dt>Role</dt>
                                    <dd>{user.role}</dd>
                                </SummaryList>
                            )}
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
                            <Col lg={12}>
                                <FurnsPanel>
                                    <PanelTitle>Account Activity</PanelTitle>
                                    <PanelSubtitle>
                                        The account area represents authenticated frontend requests to internal order services.
                                    </PanelSubtitle>
                                    <Metrics
                                        items={[
                                            {label: "Profile", value: user ? "Loaded" : "Pending"},
                                            {label: "Orders", value: "Private"},
                                            {label: "Payment Status", value: "Private"},
                                            {label: "Notifications", value: "Private"},
                                        ]}
                                    />
                                </FurnsPanel>
                            </Col>
                        </Row>
                    </AuthGuard>
                </Container>
            </PageContent>
        </Layout>
    );
};

export default AccountPage;
