import Link from "next/link";
import {useEffect, useState} from "react";
import Widget from "@components/ui/widget";
import {Container, Col, Row, Ul, Li,} from "@bootstrap";
import {isAdminUser, isSignedIn} from "@services/auth";
import {WidgetWrapper} from "./footer.style";

const FooterWidget = (props) => {
    const [signedIn, setSignedIn] = useState(null);
    const [adminUser, setAdminUser] = useState(false);

    useEffect(() => {
        setSignedIn(isSignedIn());
        setAdminUser(isAdminUser());
    }, []);

    return (
        <WidgetWrapper
            {...props}
            py={[60, 60, 100]}
        >
            <Container>
                <Row>
                    <Col md={6} lg={4}>
                        <Widget
                            title="FURNS STOREFRONT"
                            mb={[30, null, null, 0]}
                        >
                            <p className="about-text">
                                Furns is configured as a security storefront with customer checkout
                                and account order history.
                            </p>
                        </Widget>
                    </Col>

                    <Col sm={6} lg={3}>
                        <Widget
                            title="CUSTOMER FLOW"
                            mb={[30, null, null, 0]}
                        >
                            <Ul className="widget-list">
                                {signedIn === false && (
                                    <>
                                        <Li><Link href="/login">Login</Link></Li>
                                        <Li><Link href="/register">Register</Link></Li>
                                    </>
                                )}
                                <Li><Link href="/cart">Cart</Link></Li>
                                <Li><Link href="/checkout">Checkout</Link></Li>
                                <Li><Link href="/account/orders">Order History</Link></Li>
                            </Ul>
                        </Widget>
                    </Col>

                    {adminUser && (
                        <Col sm={6} lg={2}>
                            <Widget
                                title="ADMIN"
                                mb={[30, null, null, 0]}
                            >
                                <Ul className="widget-list">
                                    <Li><Link href="/admin">Dashboard</Link></Li>
                                </Ul>
                            </Widget>
                        </Col>
                    )}

                    <Col sm={6} lg={3}>
                        <Widget
                            title="SUPPORT"
                        >
                            <Ul className="widget-list">
                                <Li><Link href="/contact">Contact</Link></Li>
                                <Li><Link href="/about">About</Link></Li>
                            </Ul>
                        </Widget>
                    </Col>
                </Row>
            </Container>
        </WidgetWrapper>
    );
};

export default FooterWidget;
