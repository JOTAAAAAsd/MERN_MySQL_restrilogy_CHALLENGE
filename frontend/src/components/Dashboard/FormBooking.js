import moment from 'moment';
import Calendar from 'react-calendar';

import { ModalApp } from '../UI/ModalApp';
import { MdTableBar } from 'react-icons/md';
import { AuthContext } from '../../hooks/context/AuthContext';
import { HiPlusCircle } from "react-icons/hi2";
import { useBookingForm } from '../../hooks/states/useBookingForm';
import { ModalAppContext } from '../../hooks/context/ModalAppContext';
import { VscSymbolNumeric } from "react-icons/vsc";
import { HiOutlineAtSymbol } from "react-icons/hi";
import { AiFillClockCircle } from "react-icons/ai";
import { useContext, useState } from 'react';
import { InputGroup, Form, Row, Col, Button } from "react-bootstrap";
import { PiArrowCircleLeftDuotone, PiArrowCircleRightDuotone } from 'react-icons/pi';
import { BsFillPersonLinesFill, BsPersonBoundingBox, BsCalendarDateFill } from 'react-icons/bs';

const selector_type_contact = [
    {
        type: "Email",
        icon: "imagen email"
    },
    {
        type: "Cel",
        icon: "imagen cel"
    }
];

const total_persons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const FormBooking = () => {

    // const [useValueCalendar, setValueCalendar] = useState(new Date());

    const { useBookingStateForm, useTotalReservedTable, useValueCalendar, setReservationDate, setValueCalendar,
        onChangeBookingForm, onSubmitBookingForm } = useBookingForm(new Date());

    const { persons, data_contact, reservation_time, type_contact } = useBookingStateForm;

    const { useIsOpenModalApp, onOpenModal, onCloseModal } = useContext(ModalAppContext);

    const { useInfoUser } = useContext(AuthContext);

    const onChangeCalendar = (e) => {
        onCloseModal();
        setReservationDate(e)
        setValueCalendar(e);
    }

    return <div className='form_reservation_container'>
        <div className='form_reservation_title_head'>
            RESERVATION
        </div>
        <form onSubmit={onSubmitBookingForm}>
            <Row>
                <Col md={6} className='mx-auto'>
                    <InputGroup className="mb-3">
                        <InputGroup.Text className="icon_input_group"><BsPersonBoundingBox /></InputGroup.Text>
                        <Form.Control className="entry_input_group entry_input_group_disabled" readOnly placeholder={useInfoUser.fullname} />
                    </InputGroup>
                    <Row>
                        <Col md={6}>
                            <InputGroup className="mb-3">
                                <InputGroup.Text className="icon_input_group"><BsFillPersonLinesFill /></InputGroup.Text>
                                <Form.Select className="entry_input_group" name="persons" value={persons} onChange={onChangeBookingForm}>
                                    {
                                        total_persons.map((e, i) => <option key={i} value={e}>{e} Person{i === 0 ? "" : "s"}</option>)
                                    }
                                </Form.Select>
                            </InputGroup>
                        </Col>
                        <Col md={6}>
                            <InputGroup className="mb-3">
                                <InputGroup.Text className="icon_input_group"><MdTableBar /></InputGroup.Text>
                                <Form.Control className="entry_input_group entry_input_group_disabled" readOnly placeholder={useTotalReservedTable + " table" + (useTotalReservedTable === "1" ? "" : "s")} />
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={5}>
                            <InputGroup className="mb-3">
                                <InputGroup.Text className="icon_input_group"><HiOutlineAtSymbol /></InputGroup.Text>
                                <Form.Select className="entry_input_group" name="type_contact" value={type_contact} onChange={onChangeBookingForm}>
                                    {
                                        selector_type_contact.map((e, i) => <option key={i} value={e.type} >{e.type}</option>)
                                    }
                                </Form.Select>
                            </InputGroup>
                        </Col>
                        <Col md={7}>
                            <InputGroup className="mb-3">
                                <InputGroup.Text className="icon_input_group"><VscSymbolNumeric /></InputGroup.Text>
                                <Form.Control className="entry_input_group" name="data_contact" value={data_contact} onChange={onChangeBookingForm} placeholder="Enter contact" />
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <InputGroup className="mb-3">
                                <InputGroup.Text className="icon_input_group"><AiFillClockCircle /></InputGroup.Text>
                                <Form.Control type="time"
                                    className="entry_input_group" name="reservation_time" value={reservation_time} onChange={onChangeBookingForm} />
                            </InputGroup>
                        </Col>
                        <Col md={6}>
                            <InputGroup className="mb-3">
                                <InputGroup.Text className="icon_input_group"><BsCalendarDateFill /></InputGroup.Text>
                                <Form.Control type="text" readOnly
                                    className="entry_input_group entry_input_group_disabled" name="reservation_time"
                                    placeholder={moment(useValueCalendar).format("DD MM YYYY").replaceAll(" ", "-")} />
                                <InputGroup.Text className="icon_input_group_open_calendar"
                                    onClick={onOpenModal} ><HiPlusCircle /></InputGroup.Text>
                            </InputGroup>
                        </Col>
                    </Row>
                </Col>
                <div className="form_reservation_btn_submit">
                    <Button type='submit' onMouseDown={(e) => e.preventDefault()}>
                        Reserve
                    </Button>
                </div>
            </Row>
        </form>
        <ModalApp useIsOpenModalApp={useIsOpenModalApp} onOpenModal={onOpenModal} onCloseModal={onCloseModal}>
            <div className="calendar_form_container mb-3">
                <Calendar
                    minDate={new Date()}
                    maxDate={new Date("2024-01-01")}
                    prevLabel={<PiArrowCircleLeftDuotone />}
                    nextLabel={<PiArrowCircleRightDuotone />}
                    prev2Label={null}
                    next2Label={null}
                    tileDisabled={({ activeStartDate, date }) => {
                        if (date.getDate() === new Date().getDate() &&
                            activeStartDate.getMonth() + 1 === new Date().getMonth() + 1 &&
                            activeStartDate.getFullYear() === new Date().getFullYear()) {
                            return false;
                        } else if (date < new Date()) {
                            return true;
                        }
                    }} onChange={onChangeCalendar} useValueCalendar={useValueCalendar} />
            </div>
        </ModalApp>
    </div>;
}