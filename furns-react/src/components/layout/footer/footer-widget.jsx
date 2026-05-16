import Link from "next/link";
import Widget from "@components/ui/widget";
import {Container, Col, Row, Ul, Li,} from "@bootstrap";
import {WidgetWrapper} from "./footer.style";

const FooterWidget = (props) => {

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
                                Furns is configured as a security storefront with customer checkout,
                                mock payment, admin management, and audit-log screens.
                            </p>
                        </Widget>
                    </Col>

                    <Col sm={6} lg={3}>
                        <Widget
                            title="CUSTOMER FLOW"
                            mb={[30, null, null, 0]}
                        >
                            <Ul className="widget-list">
                                <Li><Link href="/login">Login</Link></Li>
                                <Li><Link href="/register">Register</Link></Li>
                                <Li><Link href="/cart">Cart</Link></Li>
                                <Li><Link href="/checkout">Checkout</Link></Li>
                                <Li><Link href="/account/orders">Order History</Link></Li>
                            </Ul>
                        </Widget>
                    </Col>

                    <Col sm={6} lg={2}>
                        <Widget
                            title="ADMIN"
                            mb={[30, null, null, 0]}
                        >
                            <Ul className="widget-list">
                                <Li><Link href="/admin/login">Admin Login</Link></Li>
                                <Li><Link href="/admin/orders">Orders</Link></Li>
                                <Li><Link href="/admin/products">Products</Link></Li>
                                <Li><Link href="/admin/audit-logs">Audit Logs</Link></Li>
                            </Ul>
                        </Widget>
                    </Col>

                    <Col sm={6} lg={3}>
                        <Widget
                            title="EXTERNAL MOCKS"
                        >
                            <Ul className="widget-list">
                                <Li><Link href="/checkout">Checkout</Link></Li>
                                <Li><Link href="/payment/success">Payment Success</Link></Li>
                                <Li><Link href="/payment/failed">Payment Failure</Link></Li>
                            </Ul>
                        </Widget>
                    </Col>
                </Row>
            </Container>
        </WidgetWrapper>
    );
};

export default FooterWidget;
