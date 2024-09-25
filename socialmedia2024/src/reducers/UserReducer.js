import cookie from "react-cookies";

const ReducerUser = (currentState, action) => {
    switch(action.type){
        case "login":
            return action.payload;
        case "logout":
            cookie.remove("token");
            cookie.remove("user");
            return null;
        default:
            return currentState;
    }
}

export default ReducerUser;