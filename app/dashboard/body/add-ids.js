import {getUser} from '../../commons/utils/user-data';
import Modal from '../../commons/components/modal/modal';

export default class AddIds extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			openModal: false
		}

		this.onCloseModal = this.onCloseModal.bind(this);
		this.onSaveModal = this.onSaveModal.bind(this);
	}

/*	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.openModal !== nextState.openModal;
	}*/

	componentWillReceiveProps(nextProps) {
		this.setState(nextProps);
	}

	componentDidMount() {
		console.log('AddIds mounted');
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
		let {openModal} = this.state,
			{user: {name, email, ids}} = this.props;

		return (
			<div>
				<button onClick={() => this.setState({openModal: true})}>click</button>
				<div>Hello, {name || 'unknown'}</div>
				<Modal title="Titlu" open={openModal} onClose={this.onCloseModal} onSave={this.onSaveModal}>
	
					<div>
						Modal content
					</div>

	
				</Modal>
				
			</div>
		)		
	}
}