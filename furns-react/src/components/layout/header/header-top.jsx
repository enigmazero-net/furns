import cn from "classnames";
import Link from "next/link";
import PropTypes from "prop-types";
import {Col, Container, Row} from "@bootstrap";
import {HeaderTopWrap, HeaderTopMessage, HeaderTopSetLanCurr} from "@components/layout/header/header.style";

const HeaderTop = ({className}) => {
    return (
        <HeaderTopWrap className={cn(className)}>
            <Container>
                <Row>
                    <Col md={5} lg={3} className="text-center text-md-left">
                        <HeaderTopMessage>
                            Furns security storefront
                        </HeaderTopMessage>
                    </Col>

                    <Col md={7} lg={9}>
                        <HeaderTopSetLanCurr className="mt-2 mt-md-0">
                            <Link href="/checkout">Checkout</Link>
                            <Link href="/account/orders">Orders</Link>
                        </HeaderTopSetLanCurr>
                    </Col>
                </Row>
            </Container>
        </HeaderTopWrap>
    );
};

HeaderTop.propTypes = {
    bg: PropTypes.string,
    className: PropTypes.string
};


export default HeaderTop;
