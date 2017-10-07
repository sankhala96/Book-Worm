import api from '../api'
import { userLoggedIn} from "./auth";

export const signup = date => dispatch =>
    api.user.signup(date).then(user => {
        localStorage.bookwormJWT = user.token;
        dispatch(userLoggedIn(user));
    });