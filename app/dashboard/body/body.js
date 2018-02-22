import {getUser} from '../../commons/utils/user-data';

export default class Body extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {}
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState(nextProps);
	}

	componentDidMount() {
		this.setState(this.props);
	}

	render() {
		let {email, name} = this.state.user;
		
		return (
			<div>
				Hello, {name || 'unknown'}
			</div>
		)		
	}
}