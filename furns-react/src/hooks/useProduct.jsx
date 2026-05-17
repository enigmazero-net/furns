import {useState, useMemo} from "react";
import {useSelector} from "react-redux";
import {getCartProduct, getCartProductQuantity} from "@utils/product";

const getVariantState = (variant) => ({
    sku: variant?.sku,
    size: variant?.selectedOptions?.[0]?.value,
    color: variant?.selectedOptions?.[1]?.value,
    material: variant?.selectedOptions?.[2]?.value,
    stock: variant?.quantityAvailable || 0,
    price: variant?.priceV2?.amount || 0,
    variations: variant ? {id: variant.id, title: variant.title} : {},
    compareAtPrice: variant?.compareAtPriceV2?.amount || 0,
    isDiscounted: Boolean(variant?.compareAtPriceV2),
});

const useProduct = (product) => {
    const variants = product?.variants?.edges;
    const initialVariant = variants?.[0]?.node;
    const initialVariantState = useMemo(() => getVariantState(initialVariant), [initialVariant]);

    const [variantState, setVariantState] = useState(initialVariantState);
    const [quantity, setQuantity] = useState(1);
    const [isShowQuickView, setIsShowQuickView] = useState(false);

    const shoppingCart = useSelector((state) => state.shoppingCart);
    const {stock, variations} = variantState;

    const isInCart = Boolean(getCartProduct(shoppingCart, product, variations));
    const cartProductQuantity = getCartProductQuantity(shoppingCart, product, variations);
    const isStock = Boolean(stock === cartProductQuantity);

    const onVariantHandler = (selectedOptions) => {
        const selectedVariantTitle = Object.values(selectedOptions).map(item => item.value).sort().toString()
        const selectedVariant = variants?.find(({node}) => node?.title.split(" / ").sort().toString() === selectedVariantTitle)?.node;

        if (selectedVariant) {
            setVariantState(getVariantState(selectedVariant));
        }
    };

    const onQuickViewHandler = () => setIsShowQuickView((prevState) => !prevState);
    const onDecrementQuantity = () => setQuantity((prevState) => (prevState > 1 ? (prevState -= 1) : 1));
    const onIncrementQuantity = () => setQuantity((prevState) => prevState < stock - cartProductQuantity ? (prevState += 1) : prevState);

    return {
        ...variantState,
        isStock,
        isInCart,
        quantity,
        setQuantity,
        isShowQuickView,
        onVariantHandler,
        onQuickViewHandler,
        cartProductQuantity,
        onDecrementQuantity,
        onIncrementQuantity,
    };
};

export default useProduct;
