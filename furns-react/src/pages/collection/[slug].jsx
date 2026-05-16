import Head from "next/head";
import settings from "@data/settings";
import Layout from "@components/layout";
import ShopProductsFeed from "@components/shop";
import EmptyProduct from "@components/ui/empty";
import Breadcrumb from "@components/ui/breadcrumb";
import {fetchCollection} from "@services/api";

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

    return {
        props: {
            collection: await fetchCollection(slug, {sort}),
        }
    };
};

export default CollectionPage;
