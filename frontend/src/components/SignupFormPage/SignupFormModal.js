import Modal from 'react-modal';
import SignupFormPage from "./index.js";
import "./SignupForm.css";

const SignupFormModal = () => {
    return (
        <Modal isOpen={true} className="Modal" ariaHideApp={false}>
            <SignupFormPage/>
        </Modal>
    )
}

export default SignupFormModal;
