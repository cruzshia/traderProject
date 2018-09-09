const defaultState = {
    loading: false,
    pairList: [],
    tradingPair: {},
    candles: []
};

function rootReducer(state = defaultState, action) {
    switch (action.type) {
        case "fetching":
            return {
                ...state,
                loading: true
            }
        case "fetched":
            return {
                ...state,
                loading: false
            }
        case "update_list":
            return {
                ...state,
                pairList: [...action.payload.pairList]
            }
        case "update_candle":
            return {
                ...state,
                candles: [...action.payload.candles]
            }
        default:
            return state;
    }
}

export default rootReducer;