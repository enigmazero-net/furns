import Head from "next/head";
import Layout from "@components/layout";
import settings from "@data/settings.json";
import Promotions from "@components/promotions";
import Categories from "@components/categories";
import sliderData from "@data/slider/home-1.json";
import {ProductsTab} from "@components/product/feed";
import {SliderOne as Slider} from "@components/slider";
import {collectionEdges, getProducts} from "@data/catalog";

const Home = ({products, collections}) => {
    return (
        <Layout>
            <Head>
                <title>{settings?.title}</title>
                <meta name="description" content={settings?.description}/>
            </Head>

            <Slider animate={true} data={sliderData}/>

            <Categories categories={collections}/>

            <ProductsTab products={products} limit={8}/>

            <Promotions/>
        </Layout>
    );
};

export const getStaticProps = async () => ({
    props: {
        products: getProducts({limit: 50}),
        collections: collectionEdges,
    },
});

export default Home;
