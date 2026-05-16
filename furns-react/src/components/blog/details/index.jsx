import Link from "next/link";
import PropTypes from "prop-types";
import parse from "react-html-parser";
import Image from "@components/ui/image";
import {formatDate} from "@utils/method";
import {Container, Col, Row} from "@bootstrap";
import {
    BlogList,
    BlogPostText,
    BlogPostThumb,
    BlogPostFooter,
    BlogPostContent,
    BlogPostFooterItem,
    PostDetailsContentWrapper
} from "@components/blog/details/post.details.style";
import {PostMeta, PostTitle} from "@components/blog/post/post.style";

const PostDetailsContent = ({post}) => {
    const {title, image, contentHtml, handle, authorV2, publishedAt, tags} = post;

    return (
        <PostDetailsContentWrapper>
            <Container>
                <Row>
                    <Col lg={9} className="m-auto">
                        <div>
                            <BlogPostThumb>
                                <Image
                                    width={900}
                                    height={500}
                                    alt={title}
                                    objectFit="cover"
                                    src={image?.originalSrc}
                                />
                            </BlogPostThumb>

                            <BlogPostContent>
                                <PostMeta>
                                    By <span>{authorV2?.name},</span>
                                    <span>{formatDate(publishedAt)}</span>
                                </PostMeta>

                                <PostTitle>
                                    {title}
                                </PostTitle>

                                <BlogPostText>
                                    {parse(contentHtml)}
                                </BlogPostText>
                            </BlogPostContent>

                            <BlogPostFooter>
                                <BlogPostFooterItem>
                                    <span>Tags: </span>
                                    <BlogList tags={true}>
                                        {tags?.map(tag => (
                                            <li key={tag}><Link href={`/blog/${handle}`}>{tag}</Link></li>
                                        ))}
                                    </BlogList>
                                </BlogPostFooterItem>
                            </BlogPostFooter>
                        </div>
                    </Col>
                </Row>
            </Container>
        </PostDetailsContentWrapper>
    );
};

PostDetailsContent.propTypes = {
    post: PropTypes.object.isRequired
};


export default PostDetailsContent;
