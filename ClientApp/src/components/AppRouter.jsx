import React,{useContext} from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Error from "./pages/Error";
import { publicRoutes, privateRoutes } from "../router/index";
import { AuthContext } from "../context";
import Loader from "./UI/Loader/Loader";
const AppRouter = () => {
    const {isAuth,setIsAuth, isLoading} = useContext(AuthContext);
   if(isLoading){
       return <Loader />
   }
    return (
        isAuth
            ?
            <Switch>
                {
                    privateRoutes.map(route =>
                        <Route
                            key={route.path}
                            component={route.component}
                            path={route.path}
                            exact={route.exact}
                        />
                    )
                }
                <Route path="/error">
                    <Error />
                </Route>
                <Redirect to="/posts" />
            </Switch>
            :
            <Switch>
                {
                    publicRoutes.map(route =>
                        <Route
                            key={route.path}
                            component={route.component}
                            path={route.path}
                            exact={route.exact}
                        />
                    )
                }
                <Route path="/error">
                    <Error />
                </Route>
                <Redirect to="/login" />
            </Switch>
    );
};

export default AppRouter;