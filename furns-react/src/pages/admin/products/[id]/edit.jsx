import Head from "next/head";
import {useRouter} from "next/router";
import settings from "@data/settings";
import Layout from "@components/layout";
import Input, {TextArea} from "@components/ui/input";
import Button from "@components/ui/button";
import Breadcrumb from "@components/ui/breadcrumb";
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

const AdminEditProductPage = () => {
    const router = useRouter();
    const product = adminProducts.find((item) => item.id === router.query.id) || adminProducts[0];

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
                                        <Input id="stock" label="Stock Quantity" defaultValue={product.stock}/>
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
                                    <Button tag="button" bg="primary" color="white" hvrBg="secondary">
                                        Save Changes
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

export default AdminEditProductPage;

