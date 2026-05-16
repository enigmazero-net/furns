import Head from "next/head";
import {useState} from "react";
import cogoToast from "cogo-toast";
import settings from "@data/settings";
import Layout from "@components/layout";
import Input, {TextArea} from "@components/ui/input";
import Button from "@components/ui/button";
import Breadcrumb from "@components/ui/breadcrumb";
import {fetchProductById, normalizeAdminProduct, updateAdminProductStock} from "@services/api";
import {getAccessToken, loginWithKeycloak} from "@services/auth";
import {Col, Container, Row} from "@bootstrap";
import {ServiceFlow} from "@components/furns";
import {adminProducts, serviceFlows} from "@data/furns";
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
                    <Row>
                        <Col lg={8}>
                            <FurnsPanel>
                                <PanelTitle>{product.name}</PanelTitle>
                                <PanelSubtitle>
                                    Admin catalog edits will later write to the Product Catalog Database and record an audit event.
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
                        <Col lg={4}>
                            <ServiceFlow flows={[serviceFlows.admin[3], serviceFlows.admin[1]]}/>
                        </Col>
                    </Row>
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
