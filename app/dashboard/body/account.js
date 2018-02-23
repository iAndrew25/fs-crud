import {getUser} from '../../commons/utils/user-data';

export default class Account extends React.Component {
	constructor(props) {
		super(props);
		this.state = {}

		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		if(this.props.firstLog === true) return;
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
		const {email, name, phone, password} = this.state,
			{firstLog} = this.props;

		return (
			<div className="card border-primary mb-3" style={{maxWidth: '20rem', margin: '50px auto'}}>
				<div className="card-header">
					{firstLog ? 'Bine ai venit! Ești la prima autentificare.' : 'Schimbă datele'}
				</div>
				<div className="card-body">
					{firstLog && <h4 className="card-title text-center">Completează câmpurile de mai jos cu informații despre tine. :-)</h4>}
					<div className="form-group">
						<label htmlFor="account-name">Nume {firstLog && '*'}</label>
						<input type="text" className="form-control" id="account-name" value={name} readOnly={!firstLog} />
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
					<button className="btn btn-primary btn-submit">{firstLog ? 'Salvează' : 'Schimbă'}</button>
				</div>
			</div>
		)		
	}
}