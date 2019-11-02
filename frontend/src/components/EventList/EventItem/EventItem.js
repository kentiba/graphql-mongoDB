import React, {useState} from 'react';
import Backdrop from '../../Backdrop/Backdrop';
import Modal from '../../Modal/Modal';
import {graphql} from 'react-apollo';
import {bookEvent} from '../../../queries/Queries';
import './EventItem.css';

const EventItem = props => {
    const [modal, setModal] = useState(false);
    const userId = localStorage.getItem('user');
    const toggleModal = () => {
        setModal(true);
    };
    const closeModal = () => {
        setModal(false);
    };
    const bookHandler = async event => {
        try {
            console.log(event._id);
            await props.bookEvent({
                variables: {
                    eventId: event._id,
                },
            });
            setModal(false);
            console.log(event);
        } catch (err) {
            throw err;
        }
    };
    const modalPage = (
        <React.Fragment>
            <Backdrop closeModal={closeModal} />
            <Modal
                title={props.event.title}
                canBook
                canCancel
                closeModal={closeModal}
                bookHandler={() => bookHandler(props.event)}
            >
                <p>{props.event.price}</p>
                <p>{props.event.description}</p>
                <p>{props.event.date}</p>
            </Modal>
        </React.Fragment>
    );

    const creator =
        userId === props.event.creator._id ? (
            'You are the creator of this Event'
        ) : (
            <button onClick={toggleModal}>View Details</button>
        );

    return (
        <React.Fragment>
            {modal && modalPage}
            <li className='card'>
                <h1>{props.event.title}</h1>
                <h4>${props.event.price}</h4>
                <h4>{props.event.date.slice(0, 10)}</h4>
                <h5>{userId ? creator : 'Login to see the Tour Details'}</h5>
            </li>
        </React.Fragment>
    );
};

export default graphql(bookEvent, {name: 'bookEvent'})(EventItem);
