import Head from "next/head";
import {Fragment} from "react";
import settings from "@data/settings";
import Layout from "@components/layout";
import Loader from "@components/ui/loader";
import Breadcrumb from "@components/ui/breadcrumb";
import PostDetailsContent from "@components/blog/details";
import {getPostByHandle} from "@data/catalog";

const BlogDetailsPage = ({post}) => {
    return (
        <Layout>
            <Head>
                <title>{post?.title + ' :: ' + settings?.title}</title>
                <meta name="description" content={settings?.title}/>
            </Head>

            <Breadcrumb
                py={[60, 80]}
                mb={[60, null, 100]}
                pageTitle={post?.title}
            />

            {!post && <Loader/>}

            {post && (
                <Fragment>
                    <PostDetailsContent post={post}/>
                </Fragment>
            )}
        </Layout>
    );
};

export const getServerSideProps = async ({params}) => {
    const {slug} = params;
    const post = getPostByHandle(slug);

    if (!post) {
        return {
            notFound: true
        };
    }

    return {
        props: {
            post
        }
    }
}

export default BlogDetailsPage;
