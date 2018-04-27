import {getUser} from '../../commons/utils/user-data';
import {getUserIds, setUserIds} from './ids-service';
import {getAllUsersData} from '../../commons/utils/user-service';
import Modal from '../../commons/components/modal/modal';
import {getToken} from '../../commons/utils/tokens';
import UsersTable from './users-table/users-table';
import AdminTable from './users-table/admin-table';
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
		console.log("IDS MOUNTED");
			console.log("getUser", getUser());
		this.setState(getUser(), () => {
				console.log("this.state.role", this.state.role);
			if(this.state.role === 'USER') {
				getUserIds().then(({success, payload}) => {
					if(success) {
						this.setState({userIds: payload});
					} else {
						console.error('USER: Error fetching user ids.');
					}
				});
			} else if(this.state.role === 'ADMIN') {
				console.log('admin')
				getAllUsersData().then(({success, payload}) => {
					console.log("payload admin", payload);
					if(success) {
						this.setState({userIds: payload});
					} else {
						console.error('ADMIN: Error fetching user ids.');
					}
				});					
			} else {
				console.error('NO ROLE SPECIFIED');
			}			
		});
	}

	onCloseModal() {
		this.setState({showModal: false}, () => this.addIdsApi.resetState());
	}

	async onSaveModal() {
		let {ck = null, csb = null, cbb = null, hk = null, hsb = null, hbb = null, id} = this.addIdsApi.getState(),
			{created_date, role} = this.state,
			user_id = this.state.id,
			setIdsResp = await setUserIds({ck, csb, cbb, hk, hsb, hbb, created_date, id, user_id, token: getToken(), mode: this.state.modalMode});

		if(setIdsResp.success) {
			if(role === 'USER') {
				let getIdsResp = await getUserIds();
				if(getIdsResp.success) {
					this.setState({userIds: getIdsResp.payload});
					this.onCloseModal();
				} else {
					console.error('Error fetching user ids.');
				}
			} else if(role === 'ADMIN') {
				let getIdsResp = await getAllUsersData(getToken());
				if(getIdsResp.success) {
					this.setState({userIds: getIdsResp.payload});
					this.onCloseModal();
				} else {
					console.error('Error fetching user ids.');
				}
			} else {
				console.error('Unknown role');
			}
		} else {
			console.error('Error setting user ids.');
		}
	}

	getAddIdsApi(api) {
		this.addIdsApi = api;
	}

	openModal(mode = 'ADD', created_date = new Date().getTime(), ids = {}, role) {
		this.setState({
			showModal: true,
			modalMode: mode,
			modalTitle: mode === 'ADD' ? 'Adaugă indecși' : 'Modifică indecși',
			created_date,
			ids,
			role
		});
	}

	render() {
		let {showModal, modalTitle, userIds = [], ids = {}} = this.state;
		console.log("userIds", userIds);

		return (
			<div>
				{this.state.role === 'ADMIN' 
					? <AdminTable userIds={userIds} openModal={this.openModal} />
					: <UsersTable userIds={userIds} openModal={this.openModal} />
				}				
				
				<Modal title={modalTitle} open={showModal} onClose={this.onCloseModal} onSave={this.onSaveModal}>
					<AddIds exposeApi={this.getAddIdsApi} ids={ids} />
				</Modal>
			</div>
		)		
	}
}