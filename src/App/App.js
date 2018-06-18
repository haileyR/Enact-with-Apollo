import { ApolloProvider } from "react-apollo";
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {ActivityPanels} from '@enact/moonstone/Panels';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';

import Detail from '../views/Detail';
import Search from '../views/Search';

import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
	request: operation => {
    operation.setContext({
      headers: {
        authorization: `Bearer 7b660af50f12eb710c5a3af8743ef29dbb46262b`,
      },
    });
  },
});

class AppBase extends Component {
	constructor(props){
		super(props);
		this.formData = {
			userId: '',
			repo: false,
			fol: false,
			org: false
		};

		this.state = {
			data: {},
			index: this.props.index
		}
	};

	static propTypes = {
		index: PropTypes.number,
		userId: PropTypes.string,
		onNavigate: PropTypes.func,
		onSearch: PropTypes.func,
	};

	static defaultProps = {
		index: 0,
	};

	handleSelectBreadcrumb = ({index}) => {
    this.setState({index, formData: {userId: '',
			repo: false,
			fol: false,
			org: false}})
  };

	onChange = (target, value) => {
		this.formData[target] = value;
	};

	onSearch = () => {
		this.setState({ index: 1, data: this.formData });
	};

	render() {
		const { index, data } = this.state;

		return (
			<ApolloProvider client={client}>
				<ActivityPanels {...this.props} onSelectBreadcrumb={this.handleSelectBreadcrumb} index={index}>
						<Search onChange={this.onChange} onSearch={this.onSearch}/>
						<Detail formData={data}/>
				</ActivityPanels>
			</ApolloProvider>);
		}
}

const App =	MoonstoneDecorator(AppBase);

export default App;
export {App, AppBase};
