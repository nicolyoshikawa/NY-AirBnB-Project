import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./LoginForm.css";

const DemoUser = () => {
    const credential = 'Demo-lition';
    const password = 'password';
    const dispatch = useDispatch();

    const clickHandler = () => {
       dispatch(sessionActions.login({ credential, password }))
    }
    return (
        <a href="#" onClick={clickHandler}>Demo User</a>
    )

}
export default DemoUser;
