import Head from "next/head";
import Layout from "@components/layout";
import settings from "@data/settings.json";
import LatestBlog from "@components/blog/posts";
import Promotions from "@components/promotions";
import Categories from "@components/categories";
import sliderData from "@data/slider/home-2.json";
import {ProductsTab} from "@components/product/feed";
import {SliderTwo as Slider} from "@components/slider";
import {collectionEdges, getProducts, postEdges} from "@data/catalog";

const HomeTwo = ({blogs, products, collections}) => {
    return (
        <Layout bg="gray250">
            <Head>
                <title>{"Home 2 :: " + settings?.title}</title>
                <meta name="description" content={settings?.description}/>
            </Head>

            <Slider
                animate={true}
                data={sliderData}
                settings={{effect: "fade", speed: 1000}}
            />

            <Categories categories={collections}/>

            <ProductsTab products={products} limit={8}/>

            <Promotions fluid={true}/>

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

export default HomeTwo;
