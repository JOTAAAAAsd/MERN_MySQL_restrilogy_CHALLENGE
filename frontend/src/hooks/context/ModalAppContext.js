import { createContext, useState } from "react";

export const ModalAppContext = createContext();


export const ModalAppProvider = ({ children }) => {


    const [useIsOpenModalApp, setIsOpenModalApp] = useState(false);

    const [useContentBody, setContentBody]= useState({});

    const onOpenModal = () => {
        setIsOpenModalApp(true);
    }

    const onCloseModal = () => {
        setIsOpenModalApp(false);
        setContentBody({});
    }


    return <ModalAppContext.Provider
        value={{
            useIsOpenModalApp,
            useContentBody,
            setContentBody,
            onOpenModal,
            onCloseModal
        }}
    >

        {children}

    </ModalAppContext.Provider>;
}

