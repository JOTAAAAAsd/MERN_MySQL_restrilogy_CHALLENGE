import { Row, Container } from "react-bootstrap";
import { Routes, Route, Navigate } from "react-router-dom";

export const LayoutPublic = ({ routes }) => {

    if (localStorage.getItem("user_auth_token_logged") === null) {
        return <Container>
            <Routes>
                {
                    routes.map((route) => (
                        <Route key={route.path} path={route.path}
                            exact={route.exact} element={<route.element />} />
                    ))
                }
                <Route path='*' element={<Navigate to='/' />} />
            </Routes>
        </Container>;
    } else {
        window.location.replace("/admin");
    }
}


export const LayoutPrivate = ({ routes }) => {

    if (localStorage.getItem("user_auth_token_logged")) {
        return <Container>
            <Row>
                <Routes>
                    {
                        routes.map((route) => (
                            <Route key={route.path} path={route.path}
                                exact={route.exact} element={<route.element />} />
                        ))
                    }

                    <Route path='*' element={<Navigate to='/admin' />} />

                </Routes>
            </Row>
        </Container>;

    } else {
        window.location.replace("/");
    }
}