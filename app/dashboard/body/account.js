import {getUser} from '../../commons/utils/user-data';

export default class Account extends React.Component {
	constructor(props) {
		super(props);
		this.state = {}

		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		const userData = getUser();
		if(userData) {
			const {email = '', name = '', phone = ''} = userData;
			this.setState({email, name, phone});
		} else {
			console.error('NO USER FOUND');
		}
	}

	handleChange(key, value) {
		this.setState({[key]: value});
	}

	render() {
		const {email, name, phone, password} = this.state;

		return (
			<div className="card border-primary mb-3" style={{maxWidth: '20rem', margin: '50px auto'}}>
				<div class="card-header">Schimbă datele</div>
				<div className="card-body">
					<div className="form-group">
						<label htmlFor="account-name">Nume</label>
						<input type="text" className="form-control" id="account-name" value={name} readOnly />
					</div>
					<div className="form-group">
						<label htmlFor="account-phone">Număr de telefon</label>
						<input type="text" className="form-control" id="account-phone" value={phone} onChange={e => this.handleChange('phone', e.target.value)} />
					</div>
					<div className="form-group">
						<label htmlFor="account-email">Email</label>
						<input type="email" className="form-control" id="account-email" value={email} onChange={e => this.handleChange('email', e.target.value)} />
					</div>
					<div className="form-group">
						<label htmlFor="account-password">Parolă nouă</label>
						<input type="password" className="form-control" id="account-password" value={password} onChange={e => this.handleChange('password', e.target.value)} />
					</div>
					<button className="btn btn-primary btn-submit">Schimbă</button>
				</div>
			</div>
		)		
	}
}