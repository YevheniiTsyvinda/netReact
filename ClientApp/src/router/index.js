import About from "../components/pages/About";
import Login from "../components/pages/Login";
import PostIdPage from "../components/pages/PostIdPage";
import Posts from "../components/pages/Posts";

export const privateRoutes = [
    {path: '/about',component: About, exact: true},
    {path: '/posts',component: Posts, exact: true},
    {path: '/posts/:id',component: PostIdPage, exact: true}
];

export const publicRoutes = [
    {path: '/about',component: About, exact: true},
    {path: '/login',component: Login, exact: true}
];