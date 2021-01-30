const NAME = "name";

export const name = () => ({
    type: NAME
});

const initialState = {
    oppTitle: ""
};

export default (state = initialState, action) => {
    switch (action.type) {
        case NAME:
            return {...state, oppTitle: state.oppTitle = "Test"};
        default:
            return state;
    }
};