import Head from "next/head";
import Layout from "@components/layout";
import settings from "@data/settings.json";
import LatestBlog from "@components/blog/posts";
import Promotions from "@components/promotions";
import Categories from "@components/categories";
import sliderData from "@data/slider/home-1.json";
import {ProductsTab} from "@components/product/feed";
import {SliderOne as Slider} from "@components/slider";
import {collectionEdges, getProducts, postEdges} from "@data/catalog";

const Home = ({blogs, products, collections}) => {
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

            <LatestBlog posts={blogs} pt={[60, 60, 100]}/>
        </Layout>
    );
};

export const getStaticProps = async () => ({
    props: {
        blogs: postEdges,
        products: getProducts({limit: 50}),
        collections: collectionEdges.slice(0, 5),
    },
});

export default Home;
