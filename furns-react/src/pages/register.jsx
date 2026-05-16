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
    FormGrid,
    FurnsPanel,
    LinkText,
    PageContent,
    PanelSubtitle,
    PanelTitle,
} from "@components/furns/furns.style";

const RegisterPage = () => (
    <Layout>
        <Head>
            <title>{"Register :: " + settings?.title}</title>
        </Head>

        <Breadcrumb py={[40, 80]} mb={[60, null, 100]} pageTitle="Create Account"/>

        <PageContent>
            <Container>
                <Row>
                    <Col lg={7}>
                        <FurnsPanel>
                            <PanelTitle>Customer Registration</PanelTitle>
                            <PanelSubtitle>
                                Registration data will later be persisted through the Authentication Service into the User Database.
                            </PanelSubtitle>

                            <FormGrid>
                                <FieldBlock>
                                    <Input id="name" label="Full Name" placeholder="Furns Customer"/>
                                </FieldBlock>
                                <FieldBlock>
                                    <Input id="email" type="email" label="Email Address" placeholder="customer@furns.local"/>
                                </FieldBlock>
                                <FieldBlock>
                                    <Input id="password" type="password" label="Password" placeholder="Create password"/>
                                </FieldBlock>
                                <FieldBlock>
                                    <Input id="confirm-password" type="password" label="Confirm Password" placeholder="Confirm password"/>
                                </FieldBlock>
                            </FormGrid>

                            <ActionRow>
                                <Button tag="a" href="/account" bg="primary" color="white" hvrBg="secondary">
                                    Create Account
                                </Button>
                                <span>
                                    Already registered?{" "}
                                    <Link href="/login" passHref>
                                        <LinkText>Login</LinkText>
                                    </Link>
                                </span>
                            </ActionRow>
                        </FurnsPanel>
                    </Col>
                    <Col lg={5}>
                        <ServiceFlow flows={serviceFlows.auth}/>
                    </Col>
                </Row>
            </Container>
        </PageContent>
    </Layout>
);

export default RegisterPage;

