import Head from "next/head";
import Link from "next/link";
import settings from "@data/settings";
import Layout from "@components/layout";
import Input from "@components/ui/input";
import Button from "@components/ui/button";
import Breadcrumb from "@components/ui/breadcrumb";
import {Col, Container, Row} from "@bootstrap";
import {ServiceFlow, statusVariant} from "@components/furns";
import {adminProducts, serviceFlows} from "@data/furns";
import {
    ActionRow,
    FieldBlock,
    FormGrid,
    FurnsPanel,
    FurnsTable,
    FurnsTableWrap,
    PageContent,
    PanelSubtitle,
    PanelTitle,
    StatusPill,
} from "@components/furns/furns.style";

const AdminProductsPage = () => (
    <Layout>
        <Head>
            <title>{"Admin Products :: " + settings?.title}</title>
        </Head>

        <Breadcrumb py={[40, 80]} mb={[60, null, 100]} pageTitle="Admin Products"/>

        <PageContent>
            <Container>
                <Row>
                    <Col lg={8}>
                        <FurnsPanel>
                            <PanelTitle>Product Catalog Management</PanelTitle>
                            <PanelSubtitle>
                                Product reads and updates represent admin access to the Product Catalog Database.
                            </PanelSubtitle>
                            <FormGrid>
                                <FieldBlock>
                                    <Input id="product-search" label="Search Product" placeholder="Sofa, desk, chair"/>
                                </FieldBlock>
                                <FieldBlock>
                                    <Input id="category-filter" label="Category Filter" placeholder="Living Room"/>
                                </FieldBlock>
                            </FormGrid>
                            <ActionRow>
                                <Button tag="a" href="/admin/products/new" bg="primary" color="white" hvrBg="secondary">
                                    Add Product
                                </Button>
                            </ActionRow>

                            <FurnsTableWrap>
                                <FurnsTable>
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Category</th>
                                            <th>Price</th>
                                            <th>Stock</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {adminProducts.map((product) => (
                                            <tr key={product.id}>
                                                <td>{product.name}</td>
                                                <td>{product.category}</td>
                                                <td>${product.price.toFixed(2)}</td>
                                                <td>{product.stock}</td>
                                                <td><StatusPill variant={statusVariant(product.status)}>{product.status}</StatusPill></td>
                                                <td>
                                                    <Link href={`/admin/products/${product.id}/edit`}>
                                                        <a>Edit</a>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </FurnsTable>
                            </FurnsTableWrap>
                        </FurnsPanel>
                    </Col>
                    <Col lg={4}>
                        <ServiceFlow flows={[serviceFlows.admin[0], serviceFlows.admin[3], serviceFlows.admin[1]]}/>
                    </Col>
                </Row>
            </Container>
        </PageContent>
    </Layout>
);

export default AdminProductsPage;

