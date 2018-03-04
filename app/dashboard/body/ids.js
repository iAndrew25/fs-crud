import {getUser} from '../../commons/utils/user-data';
import {getUserIds, setUserIds} from './ids-service';
import Modal from '../../commons/components/modal/modal';
import {getToken} from '../../commons/utils/tokens';
import UsersTable from './users-table/users-table';
import AddIds from './add-ids/add-ids';

export default class Ids extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showModal: false
		}

		this.onCloseModal = this.onCloseModal.bind(this);
		this.onSaveModal = this.onSaveModal.bind(this);
		this.getAddIdsApi = this.getAddIdsApi.bind(this);
		this.openModal = this.openModal.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState(nextProps);
	}

	componentDidMount() {
		console.log('AddIds mounted');
		getUserIds().then(({success, payload}) => {
			if(success) {
				this.setState({userIds: payload});
			} else {
				console.error('Error fetching user ids.');
			}
		});
		this.setState(this.props);
	}

	onCloseModal() {
		this.setState({showModal: false}, () => this.addIdsApi.resetState());
	}

	async onSaveModal() {
		let {ck = null, csb = null, cbb = null, hk = null, hsb = null, hbb = null} = this.addIdsApi.getState(),
			{created_date} = this.state,
			user_id = getUser().id,
			setIdsResp = await setUserIds({ck, csb, cbb, hk, hsb, hbb, created_date, user_id, token: getToken(), mode: this.state.modalMode});

		if(setIdsResp.success) {
			let getIdsResp = await getUserIds();
			if(getIdsResp.success) {
				this.setState({userIds: getIdsResp.payload});
				this.onCloseModal();
			} else {
				console.error('Error fetching user ids.');
			}
		} else {
			console.error('Error setting user ids.');
		}
	}

	getAddIdsApi(api) {
		this.addIdsApi = api;
	}

	openModal(mode = 'ADD', created_date = new Date().getTime(), ids = {}) {
		this.setState({
			showModal: true,
			modalMode: mode,
			modalTitle: mode === 'ADD' ? 'Adaugă indecși' : 'Modifică indecși',
			created_date,
			ids
		});
	}

	render() {
		let {showModal, modalTitle, userIds = [], ids = {}} = this.state;

		return (
			<div>
				<UsersTable userIds={userIds} openModal={this.openModal} />

				<Modal title={modalTitle} open={showModal} onClose={this.onCloseModal} onSave={this.onSaveModal}>
					<AddIds exposeApi={this.getAddIdsApi} ids={ids} />
				</Modal>
			</div>
		)		
	}
}