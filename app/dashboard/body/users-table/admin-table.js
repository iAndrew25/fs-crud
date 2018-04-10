import {toMMMMYYYY, disableEditId, disableAddId, sortByDate, sortByMonth, getUniqueYears} from '../../../commons/utils/tools';

export default class AdminTable extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
		this.init = this.init.bind(this);
		this.handleDateChange = this.handleDateChange.bind(this);
	}

	componentDidMount() {
		this.init(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.init(nextProps);
	}

	init(data) {
		const sortedIds = sortByMonth(data.userIds),
			years = getUniqueYears(sortedIds);

		console.log("sortedIds", sortedIds);

		this.setState({
			sortedIds,
			years,
			selectedDate: Object.keys(sortedIds)[0]
		})
	}

	handleDateChange(selectedDate) {
		this.setState({selectedDate})
	}

	render() {
		const {openModal = () => {}} = this.props,
			{sortedIds = {}, selectedDate = ''} = this.state,
			displayedIds = sortedIds[selectedDate] || [];
			console.log("displayedIds", displayedIds);

		return(
			<div className="container">
				{Object.keys(sortedIds).map(dates => <span onClick={() => this.handleDateChange(dates)}>{dates}</span>)}
				<table className="table table-hover">
					<thead>
						<tr>
							<th className="text-center" scope="col" rowSpan="2">Apartament</th>
							<th className="text-center" scope="col" rowSpan="2">Centrală proprie</th>
							<th className="text-center" scope="col" colSpan="3">Indecși apă caldă</th>
							<th className="text-center" scope="col" colSpan="3">Indecși apă rece</th>
							<th className="text-center" scope="col" rowSpan="2">Acțiuni</th>
						</tr>
						<tr>
							<th className="text-center" scope="col">Bucătărie</th>
							<th className="text-center" scope="col">Baia mică</th>
							<th className="text-center" scope="col">Baia mare</th>
							<th className="text-center" scope="col">Bucătărie</th>
							<th className="text-center" scope="col">Baia mică</th>
							<th className="text-center" scope="col">Baia mare</th>
						</tr>
					</thead>
					<tbody>
						{displayedIds.map(({flat, boiler, created_date, ck, csb, cbb, hk, hsb, hbb}) => (
							<tr key={created_date}>
								<td>{flat}</td>
								<td>{parseInt(boiler) ? 'Da' : 'Nu'}</td>
								<td>{hk}</td>
								<td>{hsb}</td>
								<td>{hbb}</td>
								<td>{ck}</td>
								<td>{csb}</td>
								<td>{cbb}</td>
								<td>
									<button type="button" className="btn btn-info btn-sm" disabled={disableEditId(created_date)} onClick={() => openModal('EDIT', created_date, {ck, csb, cbb, hk, hsb, hbb})}>Modifică</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	}
};