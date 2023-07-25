import { Alerts } from "../UI/Alerts";
import { Spinner } from "../UI/Spinner";
import { MdLoupe } from "react-icons/md";
import { ModalApp } from "../UI/ModalApp";
import { GrContact } from "react-icons/gr";
import { useContext } from "react";
import { ModalAppContext } from "../../hooks/context/ModalAppContext";
import { Button, Row, Col, Card, Table, InputGroup, Form } from "react-bootstrap";

export const EmployeePage = ({ data, useSearch, setSearch }) => {


    const { onOpenModal, useContentBody, setContentBody, useIsOpenModalApp, onCloseModal } = useContext(ModalAppContext);


    const onShowContact = (contact) => {
        setContentBody({
            type_contact: contact.type_contact,
            data_contact: contact.data_contact
        });
        onOpenModal();
    }

    return <Row>
        <Col md={7}>
            <Table striped bordered className="table_list_container">
                <thead>
                    <tr className="table_list_tr">
                        <th>Reservation date</th>
                        <th>Fullname</th>
                        <th>Persons</th>
                        <th>Tables</th>
                        <th>Contacto</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.data.length === 0 ? null : data.data.map((e, i) => <tr key={i} className="table_list_tr">
                            <td>{e.reservation_date} | {e.reservation_time} </td>
                            <td>{e.fullname}</td>
                            <td style={{ textAlign: "center" }}>{e.persons}</td>
                            <td style={{ textAlign: "center" }}>{e.tables}</td>
                            <td style={{ textAlign: "center" }}>
                                <Button className="table_list_td_btn" size="sm" onClick={() => onShowContact(e)}>
                                    <GrContact />
                                </Button>
                            </td>
                        </tr>)
                    }
                </tbody>
            </Table>
            {
                data.isLoading ? <Spinner classSpinner="spinner2" /> : null
            }
            {
                !data.isLoading && data.data.length === 0 ? <Alerts message={data.message} /> : null
            }
        </Col>
        <Col md={5}>
            <Card className="table_list_card_search_form">
                <Card.Body>
                    <InputGroup className="mb-3">
                        <Form.Control
                            className="table_list_card_search_form_input"
                            onChange={(e) => setSearch(e.target.value)}
                            value={useSearch}
                            placeholder="Search by name or lastname" />
                        <InputGroup.Text className="table_list_card_search_form_input_icon">
                            <MdLoupe />
                        </InputGroup.Text>
                    </InputGroup>
                </Card.Body>
            </Card>
        </Col>

        <ModalApp useIsOpenModalApp={useIsOpenModalApp} onCloseModal={onCloseModal}>
            <div className="mb-2">
                <Card>
                    <Card.Body style={{ textAlign: "center" }}>
                        <Row>
                            <Col md={12}>
                                <h3>{useContentBody.type_contact}</h3> <br />
                                <h4>{useContentBody.data_contact}</h4>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </div>
        </ModalApp>
    </Row>;
}