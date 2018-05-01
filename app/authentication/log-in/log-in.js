export default function({email, password, handleChange, handleLogin, toggleComponentDisplay, loginResp = {}, disabled = false}) {
	let {message} = loginResp;

	return(
		<div>
			<h1 className="center-text">Accesează-ți contul</h1>
			{message && <div className="alert alert-dismissible alert-danger">{message}</div>}
			<div className="form-group">
				<label htmlFor="login-email">Adresa de e-mail/Numele de utilizator</label>
				<input type="email" className="form-control" id="login-email" placeholder="E-mail Address" value={email} onChange={e => handleChange('email', e.target.value)}/>
			</div>
			<div className="form-group">
				<label htmlFor="login-password">Parola</label>
				<input type="password" className="form-control" id="login-password" placeholder="Password" value={password} onChange={e => handleChange('password', e.target.value)}/>
				<small className="form-text text-muted forgot-password" onClick={toggleComponentDisplay}>Am uitat parola.</small>
			</div>
			<button className="btn btn-primary btn-submit" onClick={handleLogin} disabled={disabled}>Intră în cont</button>
		</div>
	)
}