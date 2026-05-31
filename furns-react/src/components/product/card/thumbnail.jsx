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
                <div className="thumb">
                    <Image
                        alt={title}
                        fill
                        sizes="(max-width: 767px) 50vw, (max-width: 1199px) 33vw, 25vw"
                        style={{objectFit: "cover"}}
                        src={thumb?.originalSrc || placeholder}
                    />
                </div>
            </Link>
        </ProductImage>
    );
};

ProductThumbnail.propTypes = {
    product: PropTypes.object.isRequired
};

export default ProductThumbnail;
