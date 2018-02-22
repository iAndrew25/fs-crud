import {Switch, Route} from 'react-router-dom';
import {logoutRedirect} from './commons/utils/auth';
import {isTokenSet} from './commons/utils/tokens';
import {getUser, setUser} from './commons/utils/user-data';
import {getUserData} from './commons/utils/user-service';

import Authentication from './authentication/authentication';
import Dashboard from './dashboard/dashboard';

export default function() {

	const PrivateRoute = ({component: Component, ...rest}) => {
		console.log('private router accessed');

		//request check if token is valid
		return <Route {...rest} render={props => isTokenSet() ? <Component {...props} /> : <Authentication />} />
	}

	return (
		<Switch>
			<PrivateRoute exact path='/' component={Dashboard} />
			<Route exact path='/logout' component={() => logoutRedirect()} />			
			<Route component={() => (<div>404 - GTFO</div>)} />
		</Switch>
	)
}