
import { Alert } from "react-bootstrap";
import { TbAlertSquare } from "react-icons/tb";

export const Alerts = ({ message }) => {
    return <>
        <Alert variant="danger" className="fadeIn ui_alerts" >
            <TbAlertSquare style={{ transform: "scale(1.5)", color: "rgb(196, 174, 174) " }} /> <span style={{ padding: "2%" }}>{message}</span>
        </Alert>
    </>;
}