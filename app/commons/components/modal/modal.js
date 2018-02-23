import ReactDOM from 'react-dom';
import classNames from 'classnames';

export default function({title, open, children, onClose = () => {}, onSave = () => {}}) {
	return ReactDOM.createPortal(
		<div className={classNames('modal', {'open': open})}>
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">{title}</h5>
						<button type="button" className="close" onClick={() => onClose()}>
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div className="modal-body">
						{children}
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-primary" onClick={() => onSave()}>Salvează</button>
					</div>
				</div>
			</div>
		</div>,
	document.querySelector('#modal'));
}