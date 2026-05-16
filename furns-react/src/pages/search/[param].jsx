import Head from "next/head";
import settings from "@data/settings";
import Layout from "@components/layout";
import ShopProductsFeed from "@components/shop";
import EmptyProduct from "@components/ui/empty";
import Breadcrumb from "@components/ui/breadcrumb";
import {fetchProducts} from "@services/api";

const SearchPage = ({products}) => {
    return (
        <Layout>
            <Head>
                <title>{"Search: " + products?.length + " Products found " + settings?.title}</title>
                <meta name="description" content={settings?.title}/>
            </Head>

            <Breadcrumb
                py={[40, 80]}
                mb={[60, null, 100]}
                pageTitle="Search"
            />

            {products?.length ? (
                <ShopProductsFeed products={products}/>
            ) : (
                <EmptyProduct/>
            )}
        </Layout>
    );
};

export const getServerSideProps = async ({params, query}) => {
    const {param} = params;
    const {sort} = query;

    return {
        props: {
            products: await fetchProducts({sort, search: param, limit: 20})
        }
    };
};

export default SearchPage;
