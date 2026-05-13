import {CURRENCY} from "@utils/constant";
import Button from "@components/ui/button";
import Coupon from "@components/cart/coupon";
import {getCartTotalPrice} from "@utils/product";
import CartItem from "@components/cart/cart-product";
import {useDispatch, useSelector} from "react-redux";
import {clearCartAction} from "@global/actions/cartAction";
import {CartUpdateAction} from "@components/cart/cart.style";
import {Container, Thead, Tbody, Tr, Td, Col, Row} from "@bootstrap";
import {
    GrandPrice,
    TableHeading,
    CartListTable,
    TableResponsive,
    CartProductsList,
    CartCouponActions,
} from "@components/cart/listing/style";

const CartList = (props) => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.shoppingCart);
    const totalProductsPrice = getCartTotalPrice(cart);

    const onCheckoutHandler = () => {
        dispatch(clearCartAction());
    };

    return (
        <CartProductsList {...props}>
            <Container>
                <TableResponsive responsive={true}>
                    <CartListTable>
                        <Thead>
                            <Tr>
                                <TableHeading>Image</TableHeading>
                                <TableHeading>Product Name</TableHeading>
                                <TableHeading>Until Price</TableHeading>
                                <TableHeading>Qty</TableHeading>
                                <TableHeading>Subtotal</TableHeading>
                                <TableHeading>Action</TableHeading>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {cart.map((product) => (
                                <CartItem product={product} key={product?.cartId}/>
                            ))}
                            <Tr>
                                <Td colSpan={6}>
                                    <GrandPrice>
                                        Grand Total:{" "}
                                        <span>{CURRENCY + totalProductsPrice.toFixed(2)}</span>
                                    </GrandPrice>
                                </Td>
                            </Tr>
                        </Tbody>
                    </CartListTable>
                </TableResponsive>

                <CartCouponActions mt={20}>
                    <Row className="align-items-lg-center">
                        <Col lg={6}>
                            <Coupon/>
                        </Col>

                        <Col lg={6}>
                            <CartUpdateAction mt={[20, null, null, 0]}>
                                <Button
                                    tag="button"
                                    bg="primary"
                                    color="white"
                                    fontSize={13}
                                    hvrBg="secondary"
                                    borderRadius="sm"
                                    onClick={() => dispatch(clearCartAction())}
                                >
                                    CLEAR CART
                                </Button>

                                <Button
                                    tag="button"
                                    bg="secondary"
                                    fontSize={13}
                                    color="white"
                                    hvrBg="primary"
                                    hvrColor="white"
                                    borderRadius="sm"
                                    onClick={() => onCheckoutHandler()}
                                    className="btn-checkout mt-3 mt-sm-0"
                                >
                                    PROCEED TO CHECKOUT
                                </Button>
                            </CartUpdateAction>
                        </Col>
                    </Row>
                </CartCouponActions>
            </Container>
        </CartProductsList>
    );
};

export default CartList;
