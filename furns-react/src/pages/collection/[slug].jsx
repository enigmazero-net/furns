import Head from "next/head";
import settings from "@data/settings";
import Layout from "@components/layout";
import ShopProductsFeed from "@components/shop";
import EmptyProduct from "@components/ui/empty";
import Breadcrumb from "@components/ui/breadcrumb";
import {getCollectionByHandle, getProducts} from "@data/catalog";

const CollectionPage = ({collection}) => {
    return (
        <Layout>
            <Head>
                <title>{collection?.title + " Products :: " + settings?.title}</title>
                <meta name="description" content={settings?.title}/>
            </Head>

            <Breadcrumb
                py={[40, 80]}
                mb={[60, null, 100]}
                pageTitle={collection?.title}
            />

            {collection?.products?.length ? (
                <ShopProductsFeed products={collection?.products}/>
            ) : (
                <EmptyProduct/>
            )}
        </Layout>
    );
};

export const getServerSideProps = async ({params, query}) => {
    const {slug} = params;
    const {sort} = query;
    const collection = getCollectionByHandle(slug);

    return {
        props: {
            collection: {
                title: collection?.title || slug,
                products: getProducts({sort}).filter(({node}) => (
                    node.collections.edges.some(({node: item}) => item?.handle === slug)
                )),
            },
        }
    };
};

export default CollectionPage;
