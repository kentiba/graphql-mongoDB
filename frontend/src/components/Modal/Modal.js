import React from 'react';
import './Modal.css';
const Modal = props => {
    return (
        <div className='modal'>
            <header className='modal__header'>
                <h1>{props.title}</h1>
            </header>
            <section className='modal__content'>{props.children}</section>
            <section className='modal__actions'>
                {props.canCancel && (
                    <button onClick={props.closeModal} className='btn'>
                        Cancel
                    </button>
                )}
                {props.canConfirm && (
                    <button onClick={props.confirmHandler} className='btn'>
                        Confirm
                    </button>
                )}
                {props.canBook && (
                    <button onClick={props.bookHandler} className='btn'>
                        Book
                    </button>
                )}
            </section>
        </div>
    );
};

export default Modal;
