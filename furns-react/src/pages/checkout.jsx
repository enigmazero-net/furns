import Head from "next/head";
import {useSelector} from "react-redux";
import settings from "@data/settings";
import Layout from "@components/layout";
import Input, {TextArea} from "@components/ui/input";
import Button from "@components/ui/button";
import Breadcrumb from "@components/ui/breadcrumb";
import {Col, Container, Row} from "@bootstrap";
import {CURRENCY} from "@utils/constant";
import {getCartTotalPrice} from "@utils/product";
import {ServiceFlow} from "@components/furns";
import {serviceFlows} from "@data/furns";
import {
    ActionRow,
    FieldBlock,
    FormGrid,
    FullWidth,
    FurnsPanel,
    FurnsTable,
    FurnsTableWrap,
    MutedText,
    PageContent,
    PanelSubtitle,
    PanelTitle,
    StepList,
} from "@components/furns/furns.style";

const fallbackItems = [
    {title: "Aurora Fabric Sofa", quantity: 1, price: 899},
    {title: "Studio Computer Desk", quantity: 1, price: 359},
];

const CheckoutPage = () => {
    const cart = useSelector((state) => state.shoppingCart);
    const cartItems = cart.length > 0 ? cart : fallbackItems;
    const subtotal = cart.length > 0
        ? getCartTotalPrice(cart)
        : fallbackItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryFee = 70;
    const total = subtotal + deliveryFee;

    return (
        <Layout>
            <Head>
                <title>{"Checkout :: " + settings?.title}</title>
            </Head>

            <Breadcrumb py={[40, 80]} mb={[60, null, 100]} pageTitle="Checkout"/>

            <PageContent>
                <Container>
                    <Row>
                        <Col lg={8}>
                            <FurnsPanel>
                                <PanelTitle>Shipping And Contact Details</PanelTitle>
                                <PanelSubtitle>
                                    Checkout collects order details, then sends order creation and payment requests to internal services.
                                </PanelSubtitle>

                                <FormGrid>
                                    <FieldBlock>
                                        <Input id="first-name" label="First Name" placeholder="Furns"/>
                                    </FieldBlock>
                                    <FieldBlock>
                                        <Input id="last-name" label="Last Name" placeholder="Customer"/>
                                    </FieldBlock>
                                    <FieldBlock>
                                        <Input id="email" type="email" label="Email" placeholder="customer@furns.local"/>
                                    </FieldBlock>
                                    <FieldBlock>
                                        <Input id="phone" label="Phone" placeholder="+94 77 000 0000"/>
                                    </FieldBlock>
                                    <FullWidth>
                                        <FieldBlock>
                                            <TextArea id="address" label="Shipping Address" rows={4} placeholder="42 Workshop Lane, Colombo"/>
                                        </FieldBlock>
                                    </FullWidth>
                                </FormGrid>
                            </FurnsPanel>

                            <FurnsPanel>
                                <PanelTitle>Mock Payment Gateway</PanelTitle>
                                <PanelSubtitle>
                                    Card details are not collected here. The payment service will create an AcquireMock invoice and redirect the customer to the mock gateway.
                                </PanelSubtitle>
                                <StepList>
                                    <li>Checkout Service creates a pending order.</li>
                                    <li>Payment Processing Service sends an authorization request to AcquireMock.</li>
                                    <li>AcquireMock returns the payment result to the backend webhook.</li>
                                    <li>Order Management Service updates the order and triggers notification.</li>
                                </StepList>
                            </FurnsPanel>
                        </Col>

                        <Col lg={4}>
                            <FurnsPanel>
                                <PanelTitle>Order Summary</PanelTitle>
                                <FurnsTableWrap>
                                    <FurnsTable>
                                        <thead>
                                            <tr>
                                                <th>Item</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cartItems.map((item) => (
                                                <tr key={item.cartId || item.title}>
                                                    <td>{item.title} x {item.quantity}</td>
                                                    <td>{CURRENCY}{Number((item.price || item.variations?.priceV2?.amount || 0) * item.quantity).toFixed(2)}</td>
                                                </tr>
                                            ))}
                                            <tr>
                                                <td>Delivery</td>
                                                <td>{CURRENCY}{deliveryFee.toFixed(2)}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Total</strong></td>
                                                <td><strong>{CURRENCY}{total.toFixed(2)}</strong></td>
                                            </tr>
                                        </tbody>
                                    </FurnsTable>
                                </FurnsTableWrap>
                                <ActionRow>
                                    <Button tag="a" href="/payment/processing" bg="primary" color="white" hvrBg="secondary">
                                        Place Order / Pay Now
                                    </Button>
                                </ActionRow>
                                <MutedText>Backend will replace this with invoice creation and gateway redirect.</MutedText>
                            </FurnsPanel>

                            <ServiceFlow flows={[...serviceFlows.checkout, ...serviceFlows.payment]}/>
                        </Col>
                    </Row>
                </Container>
            </PageContent>
        </Layout>
    );
};

export default CheckoutPage;
