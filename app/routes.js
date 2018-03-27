import {Switch, Route} from 'react-router-dom';
import {logoutRedirect} from './commons/utils/auth';
import {isTokenSet} from './commons/utils/tokens';
import {getUserData} from './commons/utils/user-service';
import {getUser} from './commons/utils/user-data';

import Authentication from './authentication/authentication';
import Dashboard from './dashboard/dashboard';
import Init from './dashboard/init';

export default function() {

	const PrivateRoute = ({component: Component, init, ...rest}) => {
		if(init) {
			const {id, email} = getUser();
			console.log("getUser", getUser());
			return <Route {...rest} render={props => (id && !email) ? <Component {...props} /> : <Authentication />} />
		} else {
			//request check if token is valid
			return <Route {...rest} render={props => isTokenSet() ? <Component {...props} /> : <Authentication />} />
		}
	}

	return (
		<Switch>
			<PrivateRoute exact path='/' component={Dashboard} />
			<PrivateRoute exact path='/indecsi' component={Dashboard} />
			<PrivateRoute exact path='/guestbook' component={Dashboard} />
			<PrivateRoute exact path='/contul-meu' component={Dashboard} />
			<PrivateRoute exact path='/init' init={true} component={Init} />
			<Route component={() => (<div>404 - GTFO</div>)} />
		</Switch>
	)
}