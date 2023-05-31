// import { NavLink } from 'react-router-dom';
import Modal from 'react-modal';
// import * as React from 'react';
import LoginFormPage from "../LoginFormPage"

const LoginFormModal = () => {
    console.log("Login Form Modal")
    return (
        <Modal isOpen={true}>
            <LoginFormPage/>
        </Modal>
    )
}

export default LoginFormModal;
