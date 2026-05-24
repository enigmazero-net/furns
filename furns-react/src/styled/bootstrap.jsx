import { useEffect, useRef } from "react";
import {
  Col,
  Container,
  Form,
  Modal as ReactBootstrapModal,
  ModalBody,
  Overlay,
  Row,
  Table,
  Tooltip as ReactBootstrapTooltip,
} from "react-bootstrap";

const BootstrapProvider = ({ children }) => children;

const Modal = ({
  isOpen,
  toggle,
  modalClassName,
  onHide,
  children,
  ...props
}) => (
  <ReactBootstrapModal
    show={isOpen}
    onHide={onHide || toggle}
    dialogClassName={modalClassName}
    {...props}
  >
    {children}
  </ReactBootstrapModal>
);

const Input = ({ label, id, className, ...props }) => (
  <>
    {label && <Form.Label htmlFor={id}>{label}</Form.Label>}
    <Form.Control id={id} className={className} {...props} />
  </>
);

const Tooltip = ({ children, isOpen, target, placement = "left", toggle }) => {
  const targetRef = useRef(null);

  useEffect(() => {
    if (!target) return undefined;

    const element = document.getElementById(target);
    targetRef.current = element;

    if (!element || !toggle) return undefined;

    element.addEventListener("mouseenter", toggle);
    element.addEventListener("mouseleave", toggle);
    element.addEventListener("focus", toggle);
    element.addEventListener("blur", toggle);

    return () => {
      element.removeEventListener("mouseenter", toggle);
      element.removeEventListener("mouseleave", toggle);
      element.removeEventListener("focus", toggle);
      element.removeEventListener("blur", toggle);
    };
  }, [target, toggle]);

  return (
    <Overlay show={isOpen} target={() => targetRef.current} placement={placement}>
      {(props) => (
        <ReactBootstrapTooltip {...props}>{children}</ReactBootstrapTooltip>
      )}
    </Overlay>
  );
};

Tooltip.defaultProps = {
  theme: {},
};

const FormGroup = Form.Group;
const Label = Form.Label;
const Thead = (props) => <thead {...props} />;
const Tbody = (props) => <tbody {...props} />;
const Tr = (props) => <tr {...props} />;
const Th = (props) => <th {...props} />;
const Td = (props) => <td {...props} />;
const H3 = (props) => <h3 {...props} />;
const Ul = (props) => <ul {...props} />;
const Li = (props) => <li {...props} />;

export {
  Col,
  Container,
  Form,
  FormGroup,
  H3,
  Input,
  Label,
  Li,
  Modal,
  ModalBody,
  Row,
  Table,
  Tbody,
  Td,
  Thead,
  Th,
  Tooltip,
  Tr,
  Ul,
};

export default BootstrapProvider;
