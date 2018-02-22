import {getUser} from '../../commons/utils/user-data';
import Modal from '../../commons/components/modal/modal';

export default class Body extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {},
			openModal: false
		}

		this.onCloseModal = this.onCloseModal.bind(this);
		this.onSaveModal = this.onSaveModal.bind(this);
	}

	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.openModal !== nextState.openModal;
	}

	componentWillReceiveProps(nextProps) {
		this.setState(nextProps);
	}

	componentDidMount() {
		this.setState(this.props);
	}

	onCloseModal() {
		this.setState({openModal: false});
		console.log('Closing modal');
	}

	onSaveModal() {
		console.log('done');
		this.onCloseModal();
	}

	render() {
		let {user: {email = '', name = ''}, openModal} = this.state,
			{page = '/'} = this.props;
		
		return (
			<div>
				<button onClick={() => this.setState({openModal: true})}>click</button>
				<div>You're on the {page} page</div>
				<Modal title="Titlu" open={openModal} onClose={this.onCloseModal} onSave={this.onSaveModal}>
	
					<div>
						Hello, {name || 'unknown'}
					</div>

	
				</Modal>
				
			</div>
		)		
	}
}