import Head from "next/head";
import settings from "@data/settings";
import Layout from "@components/layout";
import Breadcrumb from "@components/ui/breadcrumb";
import ShopProductsFeed from "@components/shop";
import {getProducts} from "@data/catalog";

const ShopPage = ({products}) => {
    return (
        <Layout>
            <Head>
                <title>{"Products :: " + settings?.title}</title>
                <meta name="description" content={settings?.title}/>
            </Head>

            <Breadcrumb py={[40, 80]} mb={[60, null, 100]} pageTitle="Products"/>

            <ShopProductsFeed products={products}/>
        </Layout>
    );
};

export const getServerSideProps = async ({query}) => {
    const {sort} = query;

    return {
        props: {
            products: getProducts({sort, limit: 20}),
        },
    };
};

export default ShopPage;
