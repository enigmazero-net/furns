import Head from "next/head";
import {useState} from "react";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import cogoToast from "cogo-toast";
import settings from "@data/settings";
import Layout from "@components/layout";
import Input, {TextArea} from "@components/ui/input";
import Button from "@components/ui/button";
import Breadcrumb from "@components/ui/breadcrumb";
import {createCheckout, createPayment} from "@services/api";
import {getAccessToken, loginWithKeycloak, registerWithKeycloak} from "@services/auth";
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
    const router = useRouter();
    const cart = useSelector((state) => state.shoppingCart);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
    });
    const cartItems = cart.length > 0 ? cart : fallbackItems;
    const subtotal = cart.length > 0
        ? getCartTotalPrice(cart)
        : fallbackItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryFee = 70;
    const total = subtotal + deliveryFee;

    const onInputChange = (event) => {
        const {name, value} = event.target;
        setForm((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const onPlaceOrderHandler = async () => {
        if (!cart.length) {
            cogoToast.warn("Add products to your cart before checkout.", {
                position: "top-right",
                heading: "Cart Empty",
                hideAfter: 3,
            });
            return;
        }

        const token = getAccessToken();
        if (!token) {
            cogoToast.warn("Please login or create an account before payment.", {
                position: "top-right",
                heading: "Login Required",
                hideAfter: 3,
            });
            await loginWithKeycloak("/checkout");
            return;
        }

        setIsSubmitting(true);

        try {
            const checkout = await createCheckout(token, {
                items: cart.map((item) => ({
                    product_id: item.id,
                    quantity: item.quantity,
                    variant_id: item.variations?.id,
                })),
                customer: {
                    first_name: form.firstName,
                    last_name: form.lastName,
                    email: form.email,
                    phone: form.phone,
                },
                shipping_address: form.address,
                delivery_fee: deliveryFee,
            });
            const orderId = checkout?.id || checkout?.order_id || checkout?.order?.id;
            const payment = await createPayment(token, {
                order_id: orderId,
                amount: total,
                currency: "USD",
            });
            const checkoutUrl = payment?.checkout_url || payment?.checkoutUrl || payment?.url;

            if (checkoutUrl) {
                window.location.assign(checkoutUrl);
            } else {
                router.push("/payment/processing");
            }
        } catch (error) {
            cogoToast.error(error.message || "Checkout failed.", {
                position: "top-right",
                heading: "Checkout Error",
                hideAfter: 4,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

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
                                        <Input id="first-name" name="firstName" label="First Name" placeholder="Furns" value={form.firstName} onChange={onInputChange}/>
                                    </FieldBlock>
                                    <FieldBlock>
                                        <Input id="last-name" name="lastName" label="Last Name" placeholder="Customer" value={form.lastName} onChange={onInputChange}/>
                                    </FieldBlock>
                                    <FieldBlock>
                                        <Input id="email" name="email" type="email" label="Email" placeholder="customer@furns.local" value={form.email} onChange={onInputChange}/>
                                    </FieldBlock>
                                    <FieldBlock>
                                        <Input id="phone" name="phone" label="Phone" placeholder="+94 77 000 0000" value={form.phone} onChange={onInputChange}/>
                                    </FieldBlock>
                                    <FullWidth>
                                        <FieldBlock>
                                            <TextArea id="address" name="address" label="Shipping Address" rows={4} placeholder="42 Workshop Lane, Colombo" value={form.address} onChange={onInputChange}/>
                                        </FieldBlock>
                                    </FullWidth>
                                </FormGrid>
                            </FurnsPanel>

                            <FurnsPanel>
                                <PanelTitle>Payment</PanelTitle>
                                <PanelSubtitle>
                                    Payment is available only after customer login. Create an account first if you do not already have one.
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
                                    <Button
                                        tag="button"
                                        bg="primary"
                                        color="white"
                                        hvrBg="secondary"
                                        loading={isSubmitting}
                                        onClick={onPlaceOrderHandler}
                                    >
                                        Place Order / Pay Now
                                    </Button>
                                    <Button tag="button" bg="secondary" color="white" hvrBg="primary" onClick={() => loginWithKeycloak("/checkout")}>
                                        Login
                                    </Button>
                                    <Button tag="button" bg="secondary" color="white" hvrBg="primary" onClick={() => registerWithKeycloak("/checkout")}>
                                        Sign Up
                                    </Button>
                                </ActionRow>
                                <MutedText>You must be signed in before an order or payment request is sent.</MutedText>
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
