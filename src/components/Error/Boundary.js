import React, { Component } from 'react';

import Error from './index';
import { Location } from '@reach/router';
import Layout from '@components/Layout';

class Boundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
        };
    }

    componentDidCatch = (error, errorInfo) => {
        console.log('ERROR');
        console.log(errorInfo);
        this.setState({ error });
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.error && prevProps.location?.pathname !== this.props.location?.pathname) {
            this.setState({ error: null });
        }
    }

    render() {
        if (this.state.error) {
            return <Layout><Error error={this.state.error} /></Layout>;
        }

        return this.props.children;
    }
}

export default props => (
    <Location>{locationContext => <Boundary {...locationContext} {...props} />}</Location>
);
