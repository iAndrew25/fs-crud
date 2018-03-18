import {Switch, Route} from 'react-router-dom';
import {logoutRedirect} from './commons/utils/auth';
import {isTokenSet} from './commons/utils/tokens';
import {getUserData} from './commons/utils/user-service';

import Authentication from './authentication/authentication';
import Dashboard from './dashboard/dashboard';
import Init from './dashboard/init';

export default function() {

	const PrivateRoute = ({component: Component, ...rest}) => {
		console.log('private router accessed', isTokenSet());

		//request check if token is valid
		return <Route {...rest} render={props => isTokenSet() ? <Component {...props} /> : <Authentication />} />
	}

	return (
		<Switch>
			<Route exact path='/init' component={Init} />
			<PrivateRoute exact path='/' component={Dashboard} />
			<PrivateRoute exact path='/contul-meu' component={Dashboard} />
			<PrivateRoute exact path='/indecsi' component={Dashboard} />
			<PrivateRoute exact path='/guestbook' component={Dashboard} />
			<Route component={() => (<div>404 - GTFO</div>)} />
		</Switch>
	)
}