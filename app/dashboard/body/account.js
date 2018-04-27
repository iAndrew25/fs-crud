import {getUser, setUser} from '../../commons/utils/user-data';
import {setUserData, getUserData} from '../../commons/utils/user-service';
import {Redirect} from 'react-router-dom';

export default class Account extends React.Component {
	constructor(props) {
		super(props);
		this.state = {}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		if(this.props.firstLog === true) {
			this.setState(getUser());
			return;
		}

		this.setState(getUser());
	}

	handleChange(key, value) {
		this.setState({[key]: value});
	}

	handleSubmit() {
		const {name = '', phone = '', email = '', password = '', id = ''} = this.state;

		if(this.props.firstLog) {
			if(password && name && phone && email) {
				setUserData({name, phone, email, password, id, mode: 'FIRST_LOG'}).then(({success}) => this.setState({success}));
			}
		} else  {
			if(name && phone && email) {
				if(password !== '') {
					setUserData({name, phone, email, password, id, mode: 'CHANGE_PASSWORD'}).then(({success}) => this.setState({success}));
				} else {
					setUserData({name, phone, email, password, id, mode: 'CHANGE_INFO'}).then(({success}) => this.setState({success}));
				}
			} else {
				console.error('WTF');
			}			
		}
	}

	render() {
		const {email, name, phone, password, success} = this.state,
			{firstLog} = this.props;

		if(firstLog && success) {
			return <Redirect to='/' />
		}

		return (
			<div className="card border-primary mb-3" style={{maxWidth: '20rem', margin: '50px auto'}}>
				<div className="card-header">
					{firstLog ? 'Bine ai venit! Ești la prima autentificare.' : 'Schimbă datele'}
				</div>
				<div className="card-body">
					{firstLog && <h4 className="card-title text-center">Completează câmpurile de mai jos cu informații despre tine. :-)</h4>}
					{success && <div className="alert alert-success">Informațiile au fost salvate.</div>}
					<div className="form-group">
						<label htmlFor="account-name">Nume {firstLog && '*'}</label>
						<input type="text" className="form-control" id="account-name" value={name} onChange={e => this.handleChange('name', e.target.value)} readOnly={!firstLog} />
					</div>
					<div className="form-group">
						<label htmlFor="account-phone">Număr de telefon *</label>
						<input type="text" className="form-control" id="account-phone" value={phone} onChange={e => this.handleChange('phone', e.target.value)} />
					</div>
					<div className="form-group">
						<label htmlFor="account-email">Email *</label>
						<input type="email" className="form-control" id="account-email" value={email} onChange={e => this.handleChange('email', e.target.value)} />
					</div>
					<div className="form-group">
						<label htmlFor="account-password">
							{firstLog ? 'Parolă *' : 'Parolă nouă'}
						</label>
						<input type="password" className="form-control" id="account-password" value={password} onChange={e => this.handleChange('password', e.target.value)} />
						<small className="form-text text-muted forgot-password">Câmpurile marcate cu * sunt obligatorii</small>
					</div>
					<button className="btn btn-primary btn-submit" onClick={() => this.handleSubmit()}>{firstLog ? 'Salvează' : 'Schimbă'}</button>
				</div>
			</div>
		)		
	}
}