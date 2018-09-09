import React, { Component } from 'react';
import { getSocket } from '../../socket';
import styled from 'styled-components';

import { fetching, fetched, fetchCandle, updateCandle } from '../../actions';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import TradingPair from '../../components/TradingPair';
import CandelChart from '../../components/CandelChart';

import { TitleBlk, Title } from '../../styledComponents/common';
import Back from '../../image/back.svg';


const BackIcon = styled.span`
    display: inline-block;
    width: 20px;
    height: 20px;
    background-image: url(${Back});
    background-size: cover;
`;

const mapStateToProps = (state) => {
	return {
        candles: state.candles,
        loading: state.loading
    };
};

const mapDispatchToProps = (dispatch) => ({
	dispathFetching: () => {
        dispatch(fetching());
    },
    dispathFetched: () => {
        dispatch(fetched());
    },
    dispatchFetchCandle: pairId => {
        dispatch(fetchCandle(pairId));
    }
});

class TradingPairContainer extends Component {
    constructor(props) {
        super(props);
        this.socket = null;
        this.isLoading = true;
        this.state = {
            tickerData: {}
        };
    }

    componentDidMount() {
        const { match, dispathFetching, dispathFetched, dispatchFetchCandle } = this.props;
        const pair = match.params.pair;
        this.socket = getSocket();
        dispathFetching();
        dispatchFetchCandle(pair);
        this.socket.onopen = e => {
            this.socket.send(JSON.stringify({
                'action': 'subscribe',
                'type': 'ticker',
                'trading_pair_id': pair
            }));
        }

        this.socket.onmessage = e => {
            let { data } = e;
            data = JSON.parse(data);
            if (data.h[2] === 's' && this.isLoading) {
                dispathFetched();
                this.isLoading = false;
            }
            this.setState({
                tickerData: {
                    'timestamp': data.d[0],
                    'highest_bid': data.d[1],
                    'lowest_ask': data.d[2],
                    '24h_volume': data.d[3],
                    '24h_high': data.d[4],
                    '24h_low': data.d[5],
                    '24h_open': data.d[6],
                    'last_trade_price': data.d[7]
                }
            })
        }
    }

    componentWillUnmount() {
        updateCandle([]); //clear candle data
        this.socket.close();
        this.socket = null;
    }

    render() {
        const { match, loading, candles } = this.props;
        return (
            <div>
                <Link to='/'><BackIcon/></Link>
                <TitleBlk>
                    <Title>{match.params.pair}</Title>
                </TitleBlk>
                <TradingPair loading={loading} tickerData={this.state.tickerData}/>
                <CandelChart candles={candles}/>
            </div>
        );
    }
}

export default  connect(mapStateToProps, mapDispatchToProps)(TradingPairContainer);