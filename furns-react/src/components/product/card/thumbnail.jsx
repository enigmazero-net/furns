import Link from "next/link";
import PropTypes from 'prop-types';
import Image from "@components/ui/image";
import {placeholder} from "@utils/constant";
import {ProductImage} from "./product.style";

const ProductThumbnail = ({product}) => {
    const {title, images, handle} = product;
    const thumb = images?.edges?.[0]?.node;

    return (
        <ProductImage>
            <Link href={`/product/${handle}`}>
                <a>
                    {thumb ? (
                        <div className="thumb">
                            <Image
                                alt={title}
                                width={270}
                                height={318}
                                layout="responsive"
                                objectFit="cover"
                                src={thumb.originalSrc}
                            />
                        </div>
                    ) : (
                        <Image
                            alt={title}
                            width={270}
                            height={318}
                            layout="responsive"
                            objectFit="cover"
                            src={placeholder}
                        />
                    )}
                </a>
            </Link>
        </ProductImage>
    );
};

ProductThumbnail.propTypes = {
    product: PropTypes.object.isRequired
};

export default ProductThumbnail;
