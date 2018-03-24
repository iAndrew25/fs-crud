import Login from './log-in/log-in';
import LostPassword from './lost-password/lost-password';
import {login, lostPassword} from './authentication-service';
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
			forceRedirect: false,
			lostPassword: false,
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
		this.handleLostPass = this.handleLostPass.bind(this);
		this.toggleComponentDisplay = this.toggleComponentDisplay.bind(this);
	}

	handleLogin() {
		const {email, password} = this.state;
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

	toggleComponentDisplay() {
		this.setState(prevState => ({lostPassword: !prevState.lostPassword, lostPassResp: {}, email: ''}));
	}

	handleChange(key, value) {
		this.setState({[key]: value});
	}

	handleLostPass() {
		const {email} = this.state;
		lostPassword(email)
			.then(({message, success}) => {
				this.setState({
					lostPassResp: {
						message,
						success
					},
					email: ''
				})
			})
			.catch(({message, success}) => {
				this.setState({
					lostPassResp: {
						message,
						success
					},
					email: ''
				})			
			})
	}
 
	render() {
		const {email, password, forceRedirect, loginResp, lostPassword, lostPassResp = {}} = this.state;

		if(forceRedirect === 'DASHBOARD') {
			return <Redirect to='/' />
		} else if(forceRedirect === 'INIT') {
			return <Redirect to='/init' />
		}

		return(
			<div className="card border-primary authenticate-box">
				<div className="card-body text-primary">
					{lostPassword ? <LostPassword 
						email={email}
						toggleComponentDisplay={this.toggleComponentDisplay}
						handleChange={this.handleChange}
						lostPassResp={lostPassResp}
						handleLostPass={this.handleLostPass} />
					: <Login 
						email={email}
						password={password}
						toggleComponentDisplay={this.toggleComponentDisplay}
						handleLogin={this.handleLogin}
						loginResp={loginResp}
						handleChange={this.handleChange} />
					}
					{this.state.toLogin ? <Redirect to="/dashboard" /> : ''}
				</div>
			</div>
		)		
	}
}