
import { useState } from "react";
import { useAuthForm } from "../../hooks/states/useAuthForm";
import { Row, Col, Card, Form, Button } from "react-bootstrap";


export const HomePage = () => {

    const { useAuthLoginForm, onChangeAuthLoginForm, onSubmitAuthLoginForm } = useAuthForm();

    const { username, password, fullname, repeat_password } = useAuthLoginForm;

    const [useIsRegister, setIsRegister] = useState(false);

    const onIsRegister = () => {
        setIsRegister(!useIsRegister);
    }

    return <>
        <Row>
            <Col md={6} className="mx-auto">
                <Card className="auth_card_container">
                    <Card.Body>
                        <div className="auth_card_content_form">
                            <Form onSubmit={(e) => onSubmitAuthLoginForm(e, useIsRegister ? "REGISTER" : "LOGIN")}>

                                <Row>
                                    <Col md={useIsRegister ? 6 : 12}>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label className="auth_card_form_label">Username</Form.Label>
                                            <Form.Control className="auth_card_form_input" type="text" placeholder="Enter username" name="username" value={username} onChange={onChangeAuthLoginForm} />
                                        </Form.Group>
                                    </Col>

                                    {
                                        useIsRegister ? <Col md={useIsRegister && 6}>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                <Form.Label className="auth_card_form_label">Fullname</Form.Label>
                                                <Form.Control className="auth_card_form_input" type="text" placeholder="Enter fullname" name="fullname" value={fullname} onChange={onChangeAuthLoginForm} />
                                            </Form.Group>
                                        </Col> : null
                                    }
                                </Row>

                                <Row>
                                    <Col md={useIsRegister ? 6 : 12}>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                            <Form.Label className="auth_card_form_label">Password</Form.Label>
                                            <Form.Control className="auth_card_form_input" type="password" placeholder="Enter password" name="password" value={password} onChange={onChangeAuthLoginForm} />
                                        </Form.Group>
                                    </Col>

                                    {
                                        useIsRegister ? <Col md={useIsRegister && 6}>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                <Form.Label className="auth_card_form_label">Repeat Password</Form.Label>
                                                <Form.Control className="auth_card_form_input" type="password" placeholder="Enter password" name="repeat_password" value={repeat_password} onChange={onChangeAuthLoginForm} />
                                            </Form.Group>
                                        </Col> : null
                                    }
                                </Row>

                                <div style={{ textAlign: "right" }}>
                                    <Button className="auth_card_form_btn_register"
                                        onMouseDown={(e) => e.preventDefault()}
                                        onClick={onIsRegister}>
                                        {
                                            useIsRegister ? "Sign in" : "Sign up"
                                        }
                                    </Button>

                                    <Button className="auth_card_form_btn_submit"
                                        onMouseDown={(e) => e.preventDefault()}
                                        type="submit">
                                        {
                                            !useIsRegister ? "Access" : "Register"
                                        }
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </>;
}