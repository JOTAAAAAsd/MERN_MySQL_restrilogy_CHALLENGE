import { useContext } from "react";
import { AuthContext } from "../../hooks/context/AuthContext";
import { FaChampagneGlasses, FaPowerOff } from "react-icons/fa6";
import { Container, Nav, Navbar, Button } from "react-bootstrap";


export const Header = () => {

    const { useInfoUser } = useContext(AuthContext);

    const onLogout = () => {
        localStorage.removeItem("user_auth_token_logged");
        window.location.replace("/");
    }

    return <Navbar expand="lg" className="mb-5 header_navbar_custom">
        <Container>
            <Navbar.Brand>
                ResTrilogy <FaChampagneGlasses style={{ color: "white", transform: "scale(1.5)" }} />
            </Navbar.Brand>
                {
                    Object.keys(useInfoUser).length === 0 ? null : <Nav className="ms-auto">
                        <Button variant="danger" onClick={onLogout}
                            onMouseDown={(e) => e.preventDefault()}>
                            <FaPowerOff style={{ transform: "scale(1.5" }} />
                        </Button>
                    </Nav>
                }
        </Container>
    </Navbar>;
}

