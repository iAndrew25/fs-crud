import {getUser} from '../../commons/utils/user-data';
import Modal from '../../commons/components/modal/modal';
import UsersTable from './users-table/users-table';
import AddIds from './add-ids/add-ids';
const userIds = [{"ck":23,"csb":24,"cbb":43,"hk":55,"hsb":18,"hbb":67,"date":1251389303788},
	{"ck":80,"csb":45,"cbb":46,"hk":88,"hsb":48,"hbb":97,"date":1150209682260},
	{"ck":56,"csb":88,"cbb":11,"hk":52,"hsb":58,"hbb":59,"date":1521269743812},
	{"ck":41,"csb":98,"cbb":70,"hk":8,"hsb":40,"hbb":86,"date":1203351207145},
	{"ck":12,"csb":93,"cbb":4,"hk":76,"hsb":96,"hbb":77,"date":1827639424443},
	{"ck":26,"csb":31,"cbb":72,"hk":5,"hsb":80,"hbb":26,"date":1158100696468},
	{"ck":58,"csb":88,"cbb":29,"hk":61,"hsb":75,"hbb":77,"date":1587226487345},
	{"ck":59,"csb":26,"cbb":91,"hk":73,"hsb":38,"hbb":21,"date":1811981925498},
	{"ck":53,"csb":72,"cbb":75,"hk":89,"hsb":60,"hbb":63,"date":1509892124437},
	{"ck":50,"csb":7,"cbb":34,"hk":97,"hsb":49,"hbb":74,"date":1764677890320}]
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
		this.setState(this.props);
	}

	onCloseModal() {
		this.setState({showModal: false});
		console.log('Closing modal');
	}

	onSaveModal() {
		console.log('done', this.addIdsApi.getState());
		this.onCloseModal();
	}

	getAddIdsApi(api) {
		this.addIdsApi = api;
	}

	openModal() {
		this.setState({showModal: true});
	}

	render() {
		let {showModal} = this.state;

		return (
			<div>
				<UsersTable userIds={userIds} openModal={this.openModal} disableAddIds={true}/>

				<Modal title="Adaugă indecși" open={showModal} onClose={this.onCloseModal} onSave={this.onSaveModal}>
					<AddIds exposeApi={this.getAddIdsApi}/>
				</Modal>				
			</div>
		)		
	}
}