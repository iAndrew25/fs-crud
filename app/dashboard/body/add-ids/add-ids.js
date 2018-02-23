export default class Account extends React.Component {
	constructor(props) {
		super(props);
		this.state = {}

		this.handleChange = this.handleChange.bind(this);
		this.getState = this.getState.bind(this);
	}

	handleChange(key, value) {
		this.setState({[key]: value});
	}

	componentDidMount() {
		this.props.exposeApi({
			getState: this.getState
		})
	}

	getState() {
		return this.state;
	}

	render() {
		const {ck, csb, cbb, hk, hsb, hbb} = this.state;

		return (
			<div className="row">
				<div className="col-md-6">
					<div className="form-group">
						<label htmlFor="account-ck">Apă rece bucătărie</label>
						<input type="text" className="form-control" id="account-ck" value={ck} onChange={e => this.handleChange('ck', e.target.value)} />
					</div>
					<div className="form-group">
						<label htmlFor="account-csb">Apă rece baia mică</label>
						<input type="text" className="form-control" id="account-csb" value={csb} onChange={e => this.handleChange('csb', e.target.value)} />
					</div>
					<div className="form-group">
						<label htmlFor="account-cbb">Apă rece baia mare</label>
						<input type="text" className="form-control" id="account-cbb" value={cbb} onChange={e => this.handleChange('cbb', e.target.value)} />
					</div>
				</div>
				<div className="col-md-6">
					<div className="form-group">
						<label htmlFor="account-hk">Apă caldă bucătărie</label>
						<input type="text" className="form-control" id="account-hk" value={hk} onChange={e => this.handleChange('hk', e.target.value)} />
					</div>
					<div className="form-group">
						<label htmlFor="account-hsb">Apă caldă baia mică</label>
						<input type="text" className="form-control" id="account-hsb" value={hsb} onChange={e => this.handleChange('hsb', e.target.value)} />
					</div>
					<div className="form-group">
						<label htmlFor="account-hbb">Apă caldă baia mare</label>
						<input type="text" className="form-control" id="account-hbb" value={hbb} onChange={e => this.handleChange('hbb', e.target.value)} />
					</div>
				</div>
			</div>
		)		
	}
}