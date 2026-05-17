import Head from "next/head";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import cogoToast from "cogo-toast";
import settings from "@data/settings";
import Layout from "@components/layout";
import Input, {TextArea} from "@components/ui/input";
import Button from "@components/ui/button";
import Breadcrumb from "@components/ui/breadcrumb";
import {createCheckout, createPayment, getPaymentRedirectUrl, syncCartItems} from "@services/api";
import {getAccessToken, isSignedIn, loginWithKeycloak, registerWithKeycloak} from "@services/auth";
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

const CheckoutPage = () => {
    const router = useRouter();
    const cart = useSelector((state) => state.shoppingCart);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [signedIn, setSignedIn] = useState(null);
    const [form, setForm] = useState({
        recipientName: "",
        phone: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        province: "",
        postalCode: "",
        country: "Sri Lanka",
    });
    const cartItems = cart;
    const subtotal = getCartTotalPrice(cart);
    const deliveryFee = 0;
    const total = subtotal + deliveryFee;

    useEffect(() => {
        setSignedIn(isSignedIn());
    }, []);

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

        const shippingDetails = {
            recipient_name: form.recipientName.trim(),
            phone: form.phone.trim(),
            address_line1: form.addressLine1.trim(),
            address_line2: form.addressLine2.trim(),
            city: form.city.trim(),
            province: form.province.trim(),
            postal_code: form.postalCode.trim(),
            country: form.country.trim() || "Sri Lanka",
        };
        const missingRequiredFields = [
            shippingDetails.recipient_name,
            shippingDetails.phone,
            shippingDetails.address_line1,
            shippingDetails.city,
            shippingDetails.province,
            shippingDetails.postal_code,
            shippingDetails.country,
        ].some((value) => !value);

        if (missingRequiredFields) {
            cogoToast.warn("Complete the required shipping details before checkout.", {
                position: "top-right",
                heading: "Shipping Required",
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
            await syncCartItems(token, cart);
            const checkout = await createCheckout(token, {
                shipping_details: shippingDetails,
            });
            const orderId = checkout?.id || checkout?.order_id || checkout?.order?.id;
            if (!orderId) {
                throw new Error("Checkout did not return an order ID.");
            }

            const payment = await createPayment(token, {
                order_id: orderId,
            });
            const checkoutUrl = getPaymentRedirectUrl(payment);

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
                                        <Input id="recipient-name" name="recipientName" label="Recipient Name" placeholder="Test Customer" value={form.recipientName} onChange={onInputChange}/>
                                    </FieldBlock>
                                    <FieldBlock>
                                        <Input id="phone" name="phone" label="Phone" placeholder="+94770000000" value={form.phone} onChange={onInputChange}/>
                                    </FieldBlock>
                                    <FieldBlock>
                                        <Input id="city" name="city" label="City" placeholder="Colombo" value={form.city} onChange={onInputChange}/>
                                    </FieldBlock>
                                    <FieldBlock>
                                        <Input id="province" name="province" label="Province" placeholder="Western" value={form.province} onChange={onInputChange}/>
                                    </FieldBlock>
                                    <FieldBlock>
                                        <Input id="postal-code" name="postalCode" label="Postal Code" placeholder="00100" value={form.postalCode} onChange={onInputChange}/>
                                    </FieldBlock>
                                    <FieldBlock>
                                        <Input id="country" name="country" label="Country" placeholder="Sri Lanka" value={form.country} onChange={onInputChange}/>
                                    </FieldBlock>
                                    <FullWidth>
                                        <FieldBlock>
                                            <TextArea id="address-line1" name="addressLine1" label="Address Line 1" rows={3} placeholder="No. 123, Test Street" value={form.addressLine1} onChange={onInputChange}/>
                                        </FieldBlock>
                                    </FullWidth>
                                    <FullWidth>
                                        <FieldBlock>
                                            <TextArea id="address-line2" name="addressLine2" label="Address Line 2" rows={2} placeholder="Apartment 4" value={form.addressLine2} onChange={onInputChange}/>
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
                                            {cartItems.length ? (
                                                cartItems.map((item) => (
                                                    <tr key={item.cartId || item.title}>
                                                        <td>{item.title} x {item.quantity}</td>
                                                        <td>{CURRENCY}{Number((item.price || item.variations?.priceV2?.amount || 0) * item.quantity).toFixed(2)}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={2}>Your cart is empty.</td>
                                                </tr>
                                            )}
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
                                    {signedIn === false && (
                                        <>
                                            <Button tag="button" bg="secondary" color="white" hvrBg="primary" onClick={() => loginWithKeycloak("/checkout")}>
                                                Login
                                            </Button>
                                            <Button tag="button" bg="secondary" color="white" hvrBg="primary" onClick={() => registerWithKeycloak("/checkout")}>
                                                Sign Up
                                            </Button>
                                        </>
                                    )}
                                </ActionRow>
                                {signedIn === false && (
                                    <MutedText>You must be signed in before an order or payment request is sent.</MutedText>
                                )}
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
