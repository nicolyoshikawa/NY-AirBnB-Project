import Modal from 'react-modal';
import LoginFormPage from "./index.js";
import "./LoginForm.css";

const LoginFormModal = () => {
    return(
        <Modal isOpen={true}>
            <LoginFormPage/>
        </Modal>
    )
}
export default LoginFormModal;
