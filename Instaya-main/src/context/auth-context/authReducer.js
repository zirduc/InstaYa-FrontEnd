
export const authReducer = (state, action) => {

    switch (action.type) {
        case '[AUTH] - Login':
            return {
                ...state,
                isAuthenticated: 'authenticated',
                user: {
                    name: action.payload.nombre,
                    role: action.payload.rol
                }
            }

        default:
            return state;
    }
}