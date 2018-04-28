import {toMMMMYYYY, disableEditId, disableAddId, sortByDate} from '../../../commons/utils/tools';

export default function({userIds = [], openModal = () => {}}) {
	let sortedIds = sortByDate(userIds);
	
	return(
		<div className="container">
			<button type="button" className="btn btn-outline-primary add-ids-btn" disabled={disableAddId()} onClick={() => openModal('ADD')}>Adaugă indecși</button>
			<table className="table table-hover">
				<thead>
					<tr>
						<th className="text-center" scope="col" rowSpan="2">Luna</th>
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
					{sortedIds.map(({created_date, ck, csb, cbb, hk, hsb, hbb, id}) => (
						<tr key={created_date}>
							<th>{toMMMMYYYY(created_date)}</th>
							<td>{hk}</td>
							<td>{hsb}</td>
							<td>{hbb}</td>
							<td>{ck}</td>
							<td>{csb}</td>
							<td>{cbb}</td>
							<td>
								<button type="button" className="btn btn-info btn-sm" disabled={disableEditId(created_date)} onClick={() => openModal('EDIT', created_date, {ck, csb, cbb, hk, id, hsb, hbb})}>Modifică</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};