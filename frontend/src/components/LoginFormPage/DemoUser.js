import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./LoginForm.css";

const DemoUser = () => {
    const credential = 'Demo-lition';
    const password = 'password';
    const dispatch = useDispatch();
    const history = useHistory();

    const clickHandler = async () => {
       const loggedInUser = await dispatch(sessionActions.login({ credential, password }));

      if (loggedInUser) {
        history.push("/");
      };
    }
    return (
        <a href="#" onClick={clickHandler}>Demo User</a>
    )

}
export default DemoUser;
