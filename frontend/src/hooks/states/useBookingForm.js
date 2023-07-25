import moment from "moment";

import { useFetchApi } from "../useFetchApi";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";

export const useBookingForm = (date = "") => {

    const [useBookingStateForm, setBookingStateForm] = useState({
        persons: "1",
        tables: "0",
        type_contact: "Email",
        data_contact: "",
        reservation_time: "08:00",
        reservation_date: "",
    });

    const [useTotalReservedTable, setTotalReservedTable] = useState("1");
    const [useReservationDate, setReservationDate] = useState(date);
    const [useValueCalendar, setValueCalendar] = useState(new Date());

    const { useInfoUser } = useContext(AuthContext);

    const { actionMethodConnect } = useFetchApi(true);

    const onChangeBookingForm = (e) => {

        setBookingStateForm({
            ...useBookingStateForm,
            [e.target.name]: e.target.value
        });

        if (e.target.name === "persons") {
            const division = parseInt(e.target.value) / 4;
            setTotalReservedTable(String(Math.ceil(division)));
        }

        if (e.target.name === "reservation_time") {
            if (e.target.value === "02:00") {
                return;
            }
        }
    }

    const onResetForm = () => {
        setBookingStateForm({
            persons: "1",
            tables: "0",
            type_contact: "Email",
            data_contact: "",
            reservation_time: "08:00",
            reservation_date: "",
        });
        setTotalReservedTable("1");
        setReservationDate(new Date());
        setValueCalendar(new Date());
    }

    const onSubmitBookingForm = (e) => {
        e.preventDefault();


        const format_date = moment(useReservationDate).format("DD MM YYYY").replaceAll(" ", "-");
        const format_hour = moment(useBookingStateForm.reservation_time, "hh:mm A").format("hh:mm A");

        const data_to_send = {
            userId: useInfoUser.id,
            persons: useBookingStateForm.persons,
            tables: useTotalReservedTable,
            type_contact: useBookingStateForm.type_contact,
            data_contact: useBookingStateForm.data_contact,
            reservation_time: format_hour,
            reservation_date: format_date,
        };

        actionMethodConnect("RESERVATIONS", "POST", "CREATE", data_to_send, onResetForm);
    }

    return {
        useBookingStateForm,
        useTotalReservedTable,
        useValueCalendar,
        setReservationDate,
        setValueCalendar,
        onChangeBookingForm,
        onSubmitBookingForm,
        onResetForm
    };
}