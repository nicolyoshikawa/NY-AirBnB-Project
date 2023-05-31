import Modal from 'react-modal';
import SignupFormPage from "../SignupFormPage"

const SignupFormModal = () => {
    return (
        <Modal isOpen={true}>
            <SignupFormPage/>
        </Modal>
    )
}

export default SignupFormModal;
