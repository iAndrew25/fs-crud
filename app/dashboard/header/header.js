import {Link} from 'react-router-dom';

export default function({logout}) {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<a className="navbar-brand" href="#">Dashboard</a>
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>

			<div className="collapse navbar-collapse" id="navbarColor03">
				<div className="mr-auto"></div>
				<div className="my-2 my-lg-0 blind" >
					<ul className="navbar-nav mr-auto">
						<li className="nav-item nav-link blind">
							<Link to={`/contul-meu`}><span>Contul meu</span></Link>
						</li>
						<li className="nav-item nav-link blind">
							<Link to={`/modificare-indecsi`}><span>Modificare indecși</span></Link>
						</li>
						<li className="nav-item nav-link blind">
							<Link to={`/guestbook`}><span>Guestbook</span></Link>
						</li>
						<li className="nav-item nav-link blind">
							<span onClick={() => logout()}>Ieșire</span>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	)
}