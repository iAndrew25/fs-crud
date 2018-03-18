export default function({email, password, handleChange, handleLogin, toggleDisplay, loginResp = {}}) {
	let {message} = loginResp;

	return(
		<div>
			<h1 className="center-text">Loghează-te</h1>
			{message && <div className="alert alert-dismissible alert-danger">{message}</div>}
			<div className="form-group">
				<label htmlFor="login-email">Adresa de e-mail/Numele de utilizator</label>
				<input type="email" className="form-control" id="login-email" placeholder="E-mail Address" value={email} onChange={e => handleChange('email', e.target.value)}/>
			</div>
			<div className="form-group">
				<label htmlFor="login-password">Parola</label>
				<input type="password" className="form-control" id="login-password" placeholder="Password" value={password} onChange={e => handleChange('password', e.target.value)}/>
				<small className="form-text text-muted forgot-password">Am uitat parola.</small>
			</div>
			<button className="btn btn-primary btn-submit" onClick={() => handleLogin()}>Loghează-te</button>
		</div>
	)
}