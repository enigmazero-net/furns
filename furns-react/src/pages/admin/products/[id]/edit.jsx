import Head from "next/head";
import {useState} from "react";
import cogoToast from "cogo-toast";
import settings from "@data/settings";
import Layout from "@components/layout";
import Input, {TextArea} from "@components/ui/input";
import Button from "@components/ui/button";
import Breadcrumb from "@components/ui/breadcrumb";
import {fetchProductById, normalizeAdminProduct, updateAdminProductStock} from "@services/api";
import {getAccessToken, isAdminUser, loginWithKeycloak} from "@services/auth";
import {Col, Container, Row} from "@bootstrap";
import AdminGuard from "@components/admin/guard";
import {adminProducts} from "@data/furns";
import {
    ActionRow,
    FieldBlock,
    FormGrid,
    FullWidth,
    FurnsPanel,
    PageContent,
    PanelSubtitle,
    PanelTitle,
} from "@components/furns/furns.style";

const AdminEditProductPage = ({product}) => {
    const [stock, setStock] = useState(product.stock);
    const [isSaving, setIsSaving] = useState(false);

    const onSaveHandler = async () => {
        const token = getAccessToken();
        if (!token) {
            await loginWithKeycloak(`/admin/products/${product.id}/edit`);
            return;
        }

        if (!isAdminUser()) {
            cogoToast.error("Your account does not have an administrator role.", {
                position: "top-right",
                heading: "Admin Access Required",
                hideAfter: 4,
            });
            return;
        }

        setIsSaving(true);

        try {
            await updateAdminProductStock(token, product.id, stock);
            cogoToast.success("Product stock updated.", {
                position: "top-right",
                heading: "Saved",
                hideAfter: 3,
            });
        } catch (error) {
            cogoToast.error(error.message || "Stock update failed.", {
                position: "top-right",
                heading: "Save Failed",
                hideAfter: 4,
            });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Layout>
            <Head>
                <title>{`Edit ${product.name} :: ${settings?.title}`}</title>
            </Head>

            <Breadcrumb py={[40, 80]} mb={[60, null, 100]} pageTitle="Edit Product"/>

            <PageContent>
                <Container>
                    <AdminGuard>
                        <Row>
                        <Col lg={12}>
                            <FurnsPanel>
                                <PanelTitle>{product.name}</PanelTitle>
                                <PanelSubtitle>
                                    Update product details and stock for the storefront.
                                </PanelSubtitle>
                                <FormGrid>
                                    <FieldBlock>
                                        <Input id="product-name" label="Product Name" defaultValue={product.name}/>
                                    </FieldBlock>
                                    <FieldBlock>
                                        <Input id="category" label="Category" defaultValue={product.category}/>
                                    </FieldBlock>
                                    <FieldBlock>
                                        <Input id="price" label="Price" defaultValue={product.price}/>
                                    </FieldBlock>
                                    <FieldBlock>
                                        <Input
                                            id="stock"
                                            label="Stock Quantity"
                                            value={stock}
                                            onChange={(event) => setStock(event.target.value)}
                                        />
                                    </FieldBlock>
                                    <FieldBlock>
                                        <Input id="status" label="Status" defaultValue={product.status}/>
                                    </FieldBlock>
                                    <FieldBlock>
                                        <Input id="image" label="Image URL" placeholder="/images/furniture/couch_1.jpeg"/>
                                    </FieldBlock>
                                    <FullWidth>
                                        <FieldBlock>
                                            <TextArea id="description" label="Description" rows={4} defaultValue="Catalog description prepared for backend storage."/>
                                        </FieldBlock>
                                    </FullWidth>
                                </FormGrid>
                                <ActionRow>
                                    <Button
                                        tag="button"
                                        bg="primary"
                                        color="white"
                                        hvrBg="secondary"
                                        loading={isSaving}
                                        onClick={onSaveHandler}
                                    >
                                        Save Stock
                                    </Button>
                                    <Button tag="a" href="/admin/products" bg="secondary" color="white" hvrBg="primary">
                                        Back To Products
                                    </Button>
                                </ActionRow>
                            </FurnsPanel>
                        </Col>
                        </Row>
                    </AdminGuard>
                </Container>
            </PageContent>
        </Layout>
    );
};

export const getServerSideProps = async ({params}) => {
    const apiProduct = await fetchProductById(params.id);
    const fallback = adminProducts.find((item) => item.id === params.id) || adminProducts[0];

    return {
        props: {
            product: apiProduct ? normalizeAdminProduct(apiProduct) : fallback,
        },
    };
};

export default AdminEditProductPage;
