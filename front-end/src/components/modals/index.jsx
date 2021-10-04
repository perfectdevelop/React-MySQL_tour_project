/**
 *  modal.jsx
 *  @version: 1.0.0
 *  @author: Trejocode - Sergio
 *  @description: Componente de Modal general
*/

import React from 'react';
import ReactDOM from 'react-dom';

const Modal = (props) => {

    const { isOpen, title } = props;    

    return(
        <>
        { isOpen &&
            ReactDOM.createPortal(
                <div className = "modal column justify-center align-center">
                    <div className="modal-container column">
                        <div className="title">
                            <h2 className="color-white text-center">
                                { title }
                            </h2>
                        </div>
                        <div className="modal-content column">
                            { props.children }
                        </div>
                    </div>
                </div>, 
                document.getElementById('modal'))
        }
        </>
    );
}

export default Modal;