import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './index.js';
function LoginFormModal() {
// //   const [showModal, setShowModal] = useState(false);
//   return (
//     // <>
//       {/* <button onClick={() => setShowModal(true)}>Log In</button> */}
//       {/* {showModal && (
//         <Modal onClose={() => setShowModal(false)}>
//           <LoginForm />
//         </Modal>
//       )} */}
//       <Modal isOpen={true} className="Modal" ariaHideApp={false}>
//             <LoginForm/>
//         </Modal>
//     // </>
//   );
// }
return (
    <Modal isOpen={true} className="Modal" ariaHideApp={false}>
        <LoginForm/>
    </Modal>
)
}
export default LoginFormModal;
