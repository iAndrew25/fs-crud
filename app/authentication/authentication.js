import Login from './log-in/log-in';
import {login} from './authentication-service';
import {Redirect} from 'react-router-dom';
import {loginRedirect} from '../commons/utils/auth';
import {setUser} from '../commons/utils/user-data';

export default class Authentication extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			name: '',
			forceRedirect: false
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleLogin = this.handleLogin.bind(this)
	}

	handleLogin() {
		let {email, password} = this.state;
		login(email, password).then(({payload}) => {
			setUser(payload);
			if(payload.email) {
				loginRedirect(payload.token, () => this.setState({forceRedirect: 'DASHBOARD'}));
			} else {
				this.setState({forceRedirect: 'INIT'})
			}
		})
		.catch(loginResp => this.setState({loginResp}));
	}

	handleChange(key, value) {
		this.setState({[key]: value});
	}

	render() {
		let {email, password, forceRedirect, loginResp} = this.state;

			console.log("forceRedirect", forceRedirect);
		if(forceRedirect === 'DASHBOARD') {
			return <Redirect to='/' />
		} else if(forceRedirect === 'INIT') {
			return <Redirect to='/init' />
		}

		return(
			<div className="card border-primary authenticate-box">
				<div className="card-body text-primary">
					<Login 
						email={email}
						password={password}
						handleLogin={this.handleLogin}
						loginResp={loginResp}
						handleChange={this.handleChange} />
					{this.state.toLogin ? <Redirect to="/dashboard" /> : ''}
				</div>
			</div>
		)		
	}
}