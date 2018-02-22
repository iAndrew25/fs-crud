import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Routes from './app/routes';
import './style.scss';

ReactDOM.render((
	<BrowserRouter>
		<Routes />
	</BrowserRouter>
), document.getElementById('root'));