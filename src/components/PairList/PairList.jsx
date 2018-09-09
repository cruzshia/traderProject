import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import _ from 'lodash';
import Coin from '../../image/coin.svg';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import { Spinner, Pair, TitleBlk, Title, WaringBlk } from '../../styledComponents/common';

const categoryList = ['BTC', 'ETH', 'USDT', 'COB'];

const CoinIcon = styled.span`
    display: inline-block;
    width: 20px;
    height: 20px;
    background-image: url(${Coin});
    background-size: cover;
`;

const SearchBox = styled.input`
    width: 50%;
    padding: 5px 10px;
    line-height: 24px;
    font-size: 16px;
`;

const ReminBlock = styled.div`
    color: #9e9e9e;
    font-size: 12px;
    text-align: center;
    margin: 10px;
`;

const styles = theme => ({
    pairBox: {
        border: '1px solid rgba(0, 0, 0, 0.12)',
        borderRadius: '5px 5px 0 0',
        margin: '15px 0',
    },
    divider: {
        margin: '0 10px'
    },
    root: {
        width: '100%',
        maxWidth: 600,
        margin: '0 auto',
        backgroundColor: theme.palette.background.paper,
    },
    navBlock: {
        maxHeight: '400px',
        overflowY: 'auto'
    },
    loading: {
        textAlign: 'center'
    }
});

class PairList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            displayData: [],
            searchTxt: ''
        };
    }

    onChange = e => {
        let val = e.target.value.trim();
        this.setState({
            searchTxt: val.toUpperCase()
        });
    }

    groupPairData() {
        let { pairData } = this.props;

        let substrings = [this.state.searchTxt];
        if (this.state.searchTxt) {
            substrings.push(this.state.searchTxt.split("-").reverse().join("-"));
        }

        pairData = pairData.filter(pair => new RegExp(substrings.join("|")).test(pair.id));
        const length = pairData.length;
        const groupedData = {};
        for (let i = 0; i < length; i++) {
            const category = categoryList.find(category => pairData[i].id.indexOf(category) !== -1);
            groupedData[category] = groupedData[category] || [];
            groupedData[category].push(pairData[i]);
        }

        return groupedData;
    }

    render() {
        const { classes, loading, error } = this.props;
        const groupData = this.groupPairData();
        return (
            <div className={classes.root}>
                { error ? <WaringBlk/> : null }
                <TitleBlk>
                    <Title>交易對列表</Title>
                </TitleBlk>
                <ReminBlock>點擊交易對以查看更多細節</ReminBlock>
                <SearchBox placeholder="輸入欲搜尋的幣 e.g. ETH" onChange={this.onChange}/>
                { loading ? <div className={classes.loading}><Spinner/></div> : null }
                {
                    _.keys(groupData).map(key => {
                        return (
                            <div key={key} className={classes.pairBox}>
                                <List component="nav">
                                    <ListItem>
                                        <ListItemIcon>
                                            <CoinIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={key} />
                                    </ListItem>
                                </List>
                                <Divider className={classes.divider}/>
                                <List className={classes.navBlock} component="nav">
                                    {
                                        groupData[key].map(pair => {
                                            return (
                                                <Link to={`/${pair.id}`} key={pair.id}>
                                                    <ListItem button>
                                                        <ListItemIcon>
                                                            <Pair/>
                                                        </ListItemIcon>
                                                        <ListItemText primary={pair.id} />
                                                    </ListItem>
                                                </Link>
                                            )
                                        })
                                    }
                                </List>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}

PairList.propTypes = {
    classes: PropTypes.object.isRequired,
    pairData: PropTypes.array.isRequired,
    loading: PropTypes.bool,
    error: PropTypes.bool
};

export default withStyles(styles)(PairList);