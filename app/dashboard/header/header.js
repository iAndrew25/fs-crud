export default function({logout}) {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<a className="navbar-brand" href="#">Dashboard</a>
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>

			<div className="collapse navbar-collapse" id="navbarColor03">
				<ul className="navbar-nav mr-auto">
					<li className="nav-item active">
					<a className="nav-link blind" href="#">Page 1</a>
					</li>
						<li className="nav-item">
					<a className="nav-link blind" href="#">Page 2</a>
						</li>
					<li className="nav-item">
						<a className="nav-link blind" href="#">Page 3</a>
					</li>
					<li className="nav-item">
						<a className="nav-link blind" href="#">Page 4</a>
					</li>
				</ul>
				<div className="my-2 my-lg-0 blind" onClick={() => logout()}>Logout</div>
			</div>
		</nav>
	)
}