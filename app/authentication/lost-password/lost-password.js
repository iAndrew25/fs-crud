import classNames from 'classnames';

export default function({email, handleChange, handleLostPass, lostPassResp, toggleComponentDisplay, disabled = false}) {
	const {success, message} = lostPassResp;
	return(
		<div>
			<h1 className="center-text">Recuperează-ți contul</h1>
			{message && <div className={classNames('alert', 'alert-dismissible', success ? 'alert-success' : 'alert-danger')}>{message}</div>}
			{!success && <div>
				<div className="form-group">
					<label htmlFor="lost-pass-email">Adresa de e-mail/Numele de utilizator</label>
					<input type="email" className="form-control" id="lost-pass-email" placeholder="E-mail Address" value={email} onChange={e => handleChange('email', e.target.value)}/>
				</div>
				<button className="btn btn-primary btn-submit" onClick={handleLostPass} disabled={disabled}>Trimite o nouă parolă</button>
			</div>}
			<small className="form-text text-muted back-to-login" onClick={toggleComponentDisplay}>Înapoi la login.</small>
		</div>
	)
}