// icons
import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/BarChartOutlined';
import CodeIcon from '@material-ui/icons/CodeOutlined';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import GitHubIcon from '@material-ui/icons/GitHub';
import PrivateIcon from '@material-ui/icons/LockOutlined';
import PublicIcon from '@material-ui/icons/LockOpenOutlined';

// components
 import Home from '../pages/Home';
 import Dashboard from '../pages/Dashboard';
 import Login from '../views/Login';


// interface
import RouteItem from '../models/RouteItem.model';

// define app routes
export const routes: Array<RouteItem> = [
    {
        key: "router-login",
        title: "Login ",
        tooltip: "Login",
        path: "/login",
        enabled: true,
        component: Login,
    },
    {
        key: "router-logout",
        title: "Logout ",
        tooltip: "Logout",
        path: "/logout",
        enabled: true,
        component: Home,
    },

]