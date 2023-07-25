
import { ROUTES_APP } from "../config/routes_app";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export const AppRouting = () => {
    return <Router>
        <Routes>
            {
                ROUTES_APP.map((route, index) => (
                    <Route key={index} path={route.path} exact={route.exact}
                        element={<route.element routes={route.routes} {...route} />} />
                ))
            }
        </Routes>
    </Router>;
}