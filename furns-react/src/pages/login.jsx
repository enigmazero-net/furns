import Head from "next/head";
import Link from "next/link";
import {useState} from "react";
import settings from "@data/settings";
import Layout from "@components/layout";
import Input from "@components/ui/input";
import Button from "@components/ui/button";
import Breadcrumb from "@components/ui/breadcrumb";
import {loginWithKeycloak} from "@services/auth";
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

const LoginPage = () => {
    const [isLoading, setIsLoading] = useState(false);

    const onLoginHandler = async () => {
        setIsLoading(true);
        await loginWithKeycloak("/account");
    };

    return (
        <Layout>
            <Head>
                <title>{"Login :: " + settings?.title}</title>
            </Head>

            <Breadcrumb py={[40, 80]} mb={[60, null, 100]} pageTitle="Customer Login"/>

            <PageContent>
                <Container>
                    <Row>
                        <Col lg={7}>
                            <FurnsPanel>
                                <PanelTitle>Sign In</PanelTitle>
                                <PanelSubtitle>
                                    Customer authentication starts here before checkout and order history requests.
                                </PanelSubtitle>

                                <FieldBlock>
                                    <Input id="email" type="email" label="Email Address" placeholder="customer@furns.local"/>
                                </FieldBlock>
                                <FieldBlock>
                                    <Input id="password" type="password" label="Password" placeholder="Enter password"/>
                                </FieldBlock>

                                <ActionRow>
                                    <Button
                                        tag="button"
                                        bg="primary"
                                        color="white"
                                        hvrBg="secondary"
                                        loading={isLoading}
                                        onClick={onLoginHandler}
                                    >
                                        Login With Keycloak
                                    </Button>
                                    <span>
                                        Need an account?{" "}
                                        <Link href="/register" passHref>
                                            <LinkText>Register</LinkText>
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
};

export default LoginPage;
