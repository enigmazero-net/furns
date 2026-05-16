import Head from "next/head";
import Link from "next/link";
import settings from "@data/settings";
import Layout from "@components/layout";
import Input from "@components/ui/input";
import Button from "@components/ui/button";
import Breadcrumb from "@components/ui/breadcrumb";
import {Col, Container, Row} from "@bootstrap";
import {ServiceFlow} from "@components/furns";
import {serviceFlows} from "@data/furns";
import {
    ActionRow,
    FieldBlock,
    FurnsPanel,
    LinkText,
    PageContent,
    PanelSubtitle,
    PanelTitle,
} from "@components/furns/furns.style";

const AdminLoginPage = () => (
    <Layout>
        <Head>
            <title>{"Admin Login :: " + settings?.title}</title>
        </Head>

        <Breadcrumb py={[40, 80]} mb={[60, null, 100]} pageTitle="Admin Login"/>

        <PageContent>
            <Container>
                <Row>
                    <Col lg={7}>
                        <FurnsPanel>
                            <PanelTitle>Admin Access</PanelTitle>
                            <PanelSubtitle>
                                Admin users enter through a separate boundary before managing orders, catalog data, and audit records.
                            </PanelSubtitle>
                            <FieldBlock>
                                <Input id="admin-email" type="email" label="Admin Email" placeholder="admin@furns.local"/>
                            </FieldBlock>
                            <FieldBlock>
                                <Input id="admin-password" type="password" label="Password" placeholder="Enter password"/>
                            </FieldBlock>
                            <ActionRow>
                                <Button tag="a" href="/admin" bg="primary" color="white" hvrBg="secondary">
                                    Login As Admin
                                </Button>
                                <span>
                                    Customer area?{" "}
                                    <Link href="/login" passHref>
                                        <LinkText>Customer Login</LinkText>
                                    </Link>
                                </span>
                            </ActionRow>
                        </FurnsPanel>
                    </Col>
                    <Col lg={5}>
                        <ServiceFlow flows={serviceFlows.admin}/>
                    </Col>
                </Row>
            </Container>
        </PageContent>
    </Layout>
);

export default AdminLoginPage;

