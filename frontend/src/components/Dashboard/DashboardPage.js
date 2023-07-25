import { ModalApp } from "../UI/ModalApp";
import { FaHistory } from "react-icons/fa";
import { AuthContext } from "../../hooks/context/AuthContext";
import { FormBooking } from "./FormBooking";
import { useFetchApi } from "../../hooks/useFetchApi";
import { EmployeePage } from "./EmployeePage";
import { HistoryReservations } from "./HistoryReservations";
import { Col, Card, Row, Button } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";


export const DashboardPage = () => {

    const { useInfoUser } = useContext(AuthContext);
    const { actionMethodConnect, useDataRecord, setDataRecord } = useFetchApi(true);
    const [useInputSearchClient, setInputSearchClient] = useState("");

    const [useOpenHistory, setOpenHistory] = useState(false);

    useEffect(() => {
        if (useInputSearchClient === "") {

            if (Object.keys(useInfoUser).length > 0) {
                actionMethodConnect("RESERVATIONS", "GET",
                    useInfoUser?.type_account === "Employee" && "GET_ALL" ||
                    useOpenHistory && useInfoUser?.type_account === "Client" && "GET_RESERVATIONS_BY_USER",
                    useOpenHistory && useInfoUser?.type_account === "Client" && useInfoUser?.id);

                if (!useDataRecord.isLoading) {
                    setDataRecord({
                        data: [],
                        message: "",
                        isLoading: true
                    });
                }
            }

        } else {
            if (useInfoUser.type_account === "Employee") {
                if (!useDataRecord.isLoading) {
                    setDataRecord({
                        data: [],
                        message: "",
                        isLoading: true
                    });
                }
                actionMethodConnect("RESERVATIONS", "GET", "QUERY", useInputSearchClient);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [useInputSearchClient, useInfoUser, useOpenHistory]);


    const onOpenModal = () => {
        setOpenHistory(true);
    }

    const onCloseModal = () => {
        setOpenHistory(false);
    }

    return <>
        {
            useInfoUser.type_account === "Employee" && <EmployeePage
                data={useDataRecord} useSearch={useInputSearchClient} setSearch={setInputSearchClient} />
        }
        {
            useInfoUser.type_account === "Client" && <Card className="form_reservation_card_container">
                <Card.Body>
                    <Row>
                        <Col md={10} className="mx-auto">
                            <div className="form_reservation_card_btn_history">
                                <Button onMouseDown={(e) => e.preventDefault()}
                                    onClick={onOpenModal}>
                                    <FaHistory />
                                </Button>
                            </div>
                            <FormBooking />
                        </Col>
                        <ModalApp useIsOpenModalApp={useOpenHistory} onOpenModal={onOpenModal} onCloseModal={onCloseModal}>
                            <Row>
                                <Col md={12}>
                                    <HistoryReservations data={useDataRecord} isOpenModal={useOpenHistory} />
                                </Col>
                            </Row>
                        </ModalApp>
                    </Row>
                </Card.Body>
            </Card>
        }
    </>;
}