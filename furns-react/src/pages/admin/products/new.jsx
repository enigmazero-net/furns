import Head from "next/head";
import settings from "@data/settings";
import Layout from "@components/layout";
import Input, {TextArea} from "@components/ui/input";
import Button from "@components/ui/button";
import Breadcrumb from "@components/ui/breadcrumb";
import {Col, Container, Row} from "@bootstrap";
import AdminGuard from "@components/admin/guard";
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

const AdminNewProductPage = () => (
    <Layout>
        <Head>
            <title>{"New Product :: " + settings?.title}</title>
        </Head>

        <Breadcrumb py={[40, 80]} mb={[60, null, 100]} pageTitle="New Product"/>

        <PageContent>
            <Container>
                <AdminGuard>
                    <Row>
                    <Col lg={12}>
                        <FurnsPanel>
                            <PanelTitle>Create Product</PanelTitle>
                            <PanelSubtitle>
                                This form is prepared for Product Catalog Service writes in the backend phase.
                            </PanelSubtitle>
                            <FormGrid>
                                <FieldBlock>
                                    <Input id="product-name" label="Product Name" placeholder="New Furns Chair"/>
                                </FieldBlock>
                                <FieldBlock>
                                    <Input id="category" label="Category" placeholder="Chairs"/>
                                </FieldBlock>
                                <FieldBlock>
                                    <Input id="price" label="Price" placeholder="249"/>
                                </FieldBlock>
                                <FieldBlock>
                                    <Input id="stock" label="Stock Quantity" placeholder="12"/>
                                </FieldBlock>
                                <FieldBlock>
                                    <Input id="sku" label="SKU" placeholder="FURNS-CHAIR-001"/>
                                </FieldBlock>
                                <FieldBlock>
                                    <Input id="image" label="Image URL" placeholder="/images/furniture/chair_1.jpeg"/>
                                </FieldBlock>
                                <FullWidth>
                                    <FieldBlock>
                                        <TextArea id="description" label="Description" rows={4} placeholder="Product description for the catalog database."/>
                                    </FieldBlock>
                                </FullWidth>
                            </FormGrid>
                            <ActionRow>
                                <Button tag="button" bg="primary" color="white" hvrBg="secondary">
                                    Save Product
                                </Button>
                                <Button tag="a" href="/admin/products" bg="secondary" color="white" hvrBg="primary">
                                    Cancel
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

export default AdminNewProductPage;
