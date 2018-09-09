export function fetching() {
    return {
        type: 'fetching'
    }
}

export function fetched() {
    return {
        type: 'fetched'
    }
}

export function fetchError() {
    return {
        type: 'fetchError'
    }
}

export function updatePairList(pairList) {
    return {
        type: 'update_list',
        payload: {
            pairList
        }
    }
}

export function fetchPairList() {
    return (dispatch) => {
        dispatch(fetching());
        fetch('https://api.cobinhood.com/v1/market/trading_pairs')
            .then(r => r.json())
            .then(r => {
                dispatch(updatePairList(r.result.trading_pairs));
            })
            .catch(() => {
                dispatch(fetchError());
            })
            .then(r => {
                dispatch(fetched());
            });
    };
}

export function updateCandle(candles) {
    return {
        type: 'update_candle',
        payload: {
            candles
        }
    }
}

export function fetchCandle(pairId) {
    let d = new Date();
    d.setMonth(d.getMonth() - 3);
    return (dispatch) => {
        fetch(`https://api.cobinhood.com/v1/chart/candles/${pairId}?timeframe=1D&start_time=${d.valueOf()}`)
            .then(r => r.json())
            .then(r => {
                dispatch(updateCandle(r.result.candles))
            })
            .catch(() => {
                dispatch(fetchError());
            });
    }
}