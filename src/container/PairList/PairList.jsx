import React, { Component } from 'react';
import { fetchPairList } from '../../actions'

import { connect } from 'react-redux';
import PairList from '../../components/PairList';

const mapStateToProps = (state) => {
	return {
        error: state.error,
        loading: state.loading,
        pairList: [...state.pairList]
    };
};

const mapDispatchToProps = (dispatch) => ({
	dispathFetchPairList: () => {
        dispatch(fetchPairList());
    }
});

class PairListContainer extends Component {
    componentDidMount() {
        const { dispathFetchPairList } = this.props;
        dispathFetchPairList();
    }

    render() {
        const { loading, error } = this.props;
        return (<PairList pairData={this.props.pairList} loading={loading} error={error}/>);
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PairListContainer);