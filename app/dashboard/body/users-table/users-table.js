import {toMMMMYYYY, disableEditId, disableAddId} from '../../../commons/utils/tools';

export default function({userIds = [], disableAddIds = false, openModal = () => {}}) {
    console.log("user", userIds);
	return(
		<div className="container">
			<button type="button" className="btn btn-outline-primary add-ids-btn" disabled={disableAddId()} onClick={() => openModal()}>Adaugă indecși</button>
			<table className="table table-hover">
				<thead>
					<tr>
						<th className="text-center" scope="col" rowSpan="2">Luna</th>
						<th className="text-center" scope="col" colSpan="3">Indecși apă caldă</th>
						<th className="text-center" scope="col" colSpan="3">Indecși apă rece</th>
						<th className="text-center" scope="col" rowSpan="2">Acțiuni</th>
					</tr>
					<tr>
						<th className="text-center" scope="col">Apă caldă bucătărie</th>
						<th className="text-center" scope="col">Apă caldă baia mică</th>
						<th className="text-center" scope="col">Apă caldă baia mare</th>
						<th className="text-center" scope="col">Apă rece bucătărie</th>
						<th className="text-center" scope="col">Apă rece baia mică</th>
						<th className="text-center" scope="col">Apă rece baia mare</th>
					</tr>
				</thead>
				<tbody>
					{userIds.map(({date, ck, csb, cbb, hk, hsb, hbb}) => (
						<tr key={date}>
							<th>{toMMMMYYYY(date)}</th>
							<td>{hk}</td>
							<td>{hsb}</td>
							<td>{hbb}</td>
							<td>{ck}</td>
							<td>{csb}</td>
							<td>{cbb}</td>
							<td>
								<button type="button" className="btn btn-info btn-sm" disabled={disableEditId(date)} onClick={() => console.log('remove')}>Modifică</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};