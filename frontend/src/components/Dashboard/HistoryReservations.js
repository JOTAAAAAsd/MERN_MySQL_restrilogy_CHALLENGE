import { Alerts } from "../UI/Alerts";
import { Spinner } from "../UI/Spinner";
import { Card, Row, Col } from "react-bootstrap";


export const HistoryReservations = ({ data, isOpenModal }) => {

    return <div className="history_reservations_container">
        {
            isOpenModal && data.data.length === 0 ? null : data.data.map((e, i) => <div className="mb-2" key={i}>
                <Card>
                    <Card.Body style={{ textAlign: "center" }}>
                        <Row>
                            <Col md={6}>
                                {e.reservation_date} <br />
                                <small>{e.reservation_time}</small>
                            </Col>
                            <Col md={6}>
                                Persons: {e.persons} <br />
                                <small>Tables: {e.tables}</small>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </div>)
        }
        {
            isOpenModal && data.isLoading ? <Spinner classSpinner="spinner1" /> : null
        }
        {
            !data.isLoading && data.data.length === 0 ? <Alerts message={data.message} /> : null
        }
    </div>;
}