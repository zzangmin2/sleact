import React, {useCallback, FC} from "react";
import {CloseModalButton, CreateModal} from "@components/Modal/styles";

interface Props{
    show: boolean;
    onCloseModal: () => void;
}

const Modal:FC<Props> = ({show, children, onCloseModal}) =>{
    const stopPropagination = useCallback((e)=>{
        e.stopPropagation();
    },[]);

    if(!show){
        return null;
    }

    return(
        <CreateModal onClick={onCloseModal}>
            <div onClick={stopPropagination}>
                <CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>
                {children}
            </div>
        </CreateModal>
    )
}

export default Modal;
