export default function({email, password, handleChange, handleLogin, toggleDisplay, loginResp = {}}) {
	let {message} = loginResp;

	return(
		<div>
			<h1 className="center-text">Log in</h1>
			{message && <div className="alert alert-dismissible alert-danger">{message}</div>}
			<div className="form-group">
				<label htmlFor="login-email">Email address</label>
				<input type="email" className="form-control" id="login-email" placeholder="E-mail Address" value={email} onChange={e => handleChange('email', e.target.value)}/>
			</div>
			<div className="form-group">
				<label htmlFor="login-password">Password</label>
				<input type="password" className="form-control" id="login-password" placeholder="Password" value={password} onChange={e => handleChange('password', e.target.value)}/>
				<small className="form-text text-muted forgot-password">Forgot password.</small>
			</div>
			<button className="btn btn-primary btn-submit" onClick={() => handleLogin()}>Log in</button>
			<div className="toggle-display" onClick={() => toggleDisplay()}>
				Don't have an account yet? Signup Now!
			</div>
		</div>
	)
}