// icons
import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/BarChartOutlined';

// components
 import Home from '../pages/Home';
 import Dashboard from '../pages/Dashboard';
 import Login from '../views/Login';
 import Page404 from '../views/Page404';


// interface
import RouteItem from '../models/RouteItem.model';
import QuizApp from '../views/PageQuiz';


// define app routes
export const routes: Array<RouteItem> = [
    {
        key: "router-dashboard",
        title: "Dashboard",
        tooltip: "Dashboard",
        path: "/dashboard",
        enabled: true,
        component: Dashboard,
        icon: DashboardIcon
    },
    {
        key: "router-home",
        title: "Home",
        tooltip: "Home",
        path: "/home",
        enabled: true,
        component: Home,
        icon: HomeIcon
    },
    {
        key: "router-login",
        title: "login",
        tooltip: "login",
        path: "/login",
        enabled: true,
        component: Login,
    },
    {
        key: "router-quizapp",
        title: "quizapp",
        tooltip: "quizapp",
        path: "/quizapp",
        enabled: true,
        component: QuizApp,
    },
    {
        key: "router-40t",
        title: "40t",
        tooltip: "40t",
        path: "/404",
        enabled: Page404,
    }
    // {
    //     key: "router-gh",
    //     title: "GitHub",
    //     tooltip: "GitHub",
    //     enabled: true,
    //     icon: GitHubIcon,
    //     subRoutes: [
    //         {
    //             key: "router-gh-private",
    //             title: "Private Repos",
    //             tooltip: "Private Repos",
    //             path: "/gh/private",
    //             enabled: true,
    //             component: GHPrivate,
    //             icon: PrivateIcon
    //         }
    //         , {
    //             key: "router-gh-public",
    //             title: "Public Repos",
    //             tooltip: "Public Repos",
    //             path: "/gh/public",
    //             enabled: false,
    //             component: GHPublic,
    //             icon: PublicIcon
    //         }
    //     ]
    // },
    // {
    //     key: "router-code",
    //     title: "Code Editor",
    //     tooltip: "Code Editor",
    //     path: "/code-editor",
    //     enabled: true,
    //     component: CodeEditor,
    //     icon: CodeIcon,
    //     appendDivider: true
    // },
    // {
    //     key: "router-settings",
    //     title: "Settings",
    //     tooltip: "Settings",
    //     path: "/settings",
    //     enabled: true,
    //     component: Settings,
    //     icon: SettingsIcon
    // },
]