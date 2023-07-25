import { Modal } from 'react-bootstrap';

export const ModalApp = ({ children, useIsOpenModalApp, onCloseModal }) => {
    return <Modal show={useIsOpenModalApp} keyboard onHide={onCloseModal}>
        <Modal.Body>
            {children}
        </Modal.Body>
    </Modal>;
}