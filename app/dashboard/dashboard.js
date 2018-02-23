import {Redirect} from 'react-router-dom';
import Header from './header/header';

import Overlay from './../commons/components/overlay/overlay';
import Ids from './body/ids';
import Account from './body/account';

import {getUserData} from './../commons/utils/user-service';
import {logoutRedirect} from './../commons/utils/auth';
import {isTokenSet} from './../commons/utils/tokens';
import {getUser, setUser} from './../commons/utils/user-data';

export default class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			text: 'Dashboard',
			forceLogout: false,
			loading: true
		}

		this.renderPage = this.renderPage.bind(this);
	}

	componentDidMount() {
		console.log("componentDidMount, Dashboard", this.props);
		let {location: {pathname}} = this.props;
		if(!getUser()) {
			getUserData().then(({payload}) => {
				this.setState({...payload, loading: false, pathname});
				setUser(payload);
			});
		} else {
			this.setState({...getUser(), loading: false, pathname});
		}
	}

	renderPage() {
		let {pathname = '/', email = '', name = '', phone = '', ids = {}} = this.state;
		console.log('render page', this.state);

		switch(pathname) {
			case '/':
			case '/contul-meu':
				return <Account user={{email, name, phone}} />
			case '/indecsi':
				return <Ids user={{email, name, phone, ids}} />
			case '/guestbook':
				return <div>Chat</div>
			case '/init':
				return <Account firstLog={true} />
			default:
				return null;
		}
	}

	render() {
		const {forceLogout, loading, pathname} = this.state;
    	if(forceLogout) return <Redirect to='/' />

		return (
			<div className="dashboard">
				{loading ? <Overlay /> : <div>
					<Header logout={() => logoutRedirect(() => this.setState({forceLogout: true}))} pathname={pathname}/>
					{this.renderPage()}
				</div>}
			</div>
		)
	}
}