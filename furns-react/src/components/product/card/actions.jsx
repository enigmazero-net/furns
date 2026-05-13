import PropTypes from 'prop-types';
import Tooltip from "@components/ui/tooltip";
import {ActionButton} from "./product.style";
import {AiOutlineFullscreen} from "react-icons/ai";

const ProductActions = ({product, onQuickViewHandler}) => {
    const {id} = product;

    return (
        <>
            <div className="btn-action">
                <ActionButton
                    className="quickview"
                    id={`quickview-button-${id}`}
                    onClick={() => onQuickViewHandler()}
                >
                    <AiOutlineFullscreen/>
                </ActionButton>
                <Tooltip target={`quickview-button-${id}`}>Quick View</Tooltip>
            </div>
        </>
    );
};

ProductActions.propTypes = {
    product: PropTypes.object.isRequired,
    onQuickViewHandler: PropTypes.func.isRequired,
};


export default ProductActions;
