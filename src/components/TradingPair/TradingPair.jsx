import React, { PureComponent } from 'react';
import Moment from 'moment';

import { Spinner } from '../../styledComponents/common';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
    container: {
        textAlign: 'center'
    },
    card: {
        display: 'inline-block',
        width: 250,
        marginTop: 20,
        marginRight: 10
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};

function formatNumber(num) {
    if (!num) {
        return '--'
    }
    num = Number(num);
    if (num >= 1000) {
        num /= 1000;
        return num.toFixed(4) + 'K';
    }
    return num.toFixed(4);
}

class TradingPair extends PureComponent {
    render() {
        const { tickerData, classes, loading } = this.props;
        
        return (
            <div className={classes.container}>
                {
                    loading ? <Spinner/> : null
                }
                <p>
                    { tickerData['timestamp'] ? '更新時間： ' + Moment(Number(tickerData['timestamp'])).format('YYYY/M/D hh:mm:ss') : null }
                </p>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary">
                            24小時最高價
                        </Typography>
                        <Typography component="p">
                            { tickerData['24h_high'] }
                        </Typography>
                    </CardContent>
                </Card>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary">
                            24小時最低價
                        </Typography>
                        <Typography component="p">
                            { tickerData['24h_low'] }
                        </Typography>
                    </CardContent>
                </Card>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary">
                            24小時交易量
                        </Typography>
                        <Typography component="p">
                            { tickerData['24h_volume'] ? formatNumber(tickerData['24h_volume']) : null }
                        </Typography>
                    </CardContent>
                </Card>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary">
                            目前最佳買入價
                        </Typography>
                        <Typography component="p">
                            { tickerData['highest_bid'] || null }
                        </Typography>
                    </CardContent>
                </Card>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary">
                            最低詢價
                        </Typography>
                        <Typography component="p">
                            { tickerData['lowest_ask'] || null }
                        </Typography>
                    </CardContent>
                </Card>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary">
                            最新一筆成交價
                        </Typography>
                        <Typography component="p">
                            { tickerData['last_trade_price'] || null }
                        </Typography>
                    </CardContent>
                </Card>
            </div>
            );
    }
} 

TradingPair.propTypes = {
    classes: PropTypes.object.isRequired,
    tickerData: PropTypes.object.isRequired,
    loading: PropTypes.bool
};

export default withStyles(styles)(TradingPair);