import {Redirect} from 'react-router-dom';
import Header from './header/header';
import Body from './body/body';
import Overlay from './../commons/components/overlay/overlay';

import {getUserData} from './../commons/utils/user-service';
import {logoutRedirect} from './../commons/utils/auth';
import {isTokenSet} from './../commons/utils/tokens';
import {getUser} from './../commons/utils/user-data';

export default class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			text: 'Dashboard',
			forceLogout: false,
			loading: true
		}
	}

	componentDidMount() {
		if(!getUser()) {
			getUserData().then(({payload}) => this.setState({user: payload, loading: false}));
		} else {
			this.setState({user: getUser(), loading: false});
		}
	}

	render() {
		const {forceLogout, user, loading} = this.state;
    	if(forceLogout) return <Redirect to='/' />

		return (
			<div className="dashboard">
				{loading ? <Overlay /> : <div>
					<Header logout={() => logoutRedirect(() => this.setState({forceLogout: true}))} />
					<Body user={this.state.user} />
				</div>}
			</div>
		)
	}
}