
export const singleReducer = (state, action) => {
    switch (action.type) {
        case 'HOME':
            return {
                ...state,
                isInHome: true,
                isInLogin: false,
                isInRegister: false,
                isInAdmin: false,
                isInOrder: false,
            }

        case 'LOGIN':
            return {
                ...state,
                isInHome: false,
                isInLogin: true,
                isInRegister: false,
                isInAdmin: false,
                isInOrder: false,
                isInListOrder: false
            }

        case 'REGISTER':
            return {
                ...state,
                isInHome: false,
                isInLogin: false,
                isInRegister: true,
                isInAdmin: false,
                isInOrder: false,
                isInListOrder: false
            }

        case 'ORDER':
            return {
                ...state,
                isInHome: false,
                isInLogin: false,
                isInRegister: false,
                isInAdmin: false,
                isInOrder: true,
                isInListOrder: false,
            }

        case 'LIST-ORDER':
            return {
                ...state,
                isInHome: false,
                isInLogin: false,
                isInRegister: false,
                isInAdmin: false,
                isInOrder: false,
                isInListOrder: true,
            }

        case 'ADMIN':
            return {
                ...state,
                isInHome: false,
                isInLogin: false,
                isInRegister: false,
                isInAdmin: true,
                isInOrder: false,
                isInListOrder: false,
            }

        default:
            return state;
    }
}