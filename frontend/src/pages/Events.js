import React, {Component} from 'react';
import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';
import {graphql} from 'react-apollo';
import * as compose from 'lodash.flowright';
import {createEvent, getEvents} from '../queries/Queries';
import EventList from '../components/EventList/EventList';
import './Events.css';

class Events extends Component {
    state = {
        modal: false,
    };

    constructor(props) {
        super(props);

        // references
        this.titleElRef = React.createRef();
        this.descriptionElRef = React.createRef();
        this.priceElRef = React.createRef();
        this.dateElRef = React.createRef();
    }

    toggleModal = () => this.setState({modal: true});
    closeModal = () => this.setState({modal: false, details: false});

    confirmHandler = async () => {
        try {
            const title = this.titleElRef.current.value;
            const price = +this.priceElRef.current.value;
            const description = this.descriptionElRef.current.value;
            const date = this.dateElRef.current.value;
            if (
                title.trim().length === 0 ||
                price.length <= 0 ||
                description.trim().length === 0 ||
                date.trim().length === 0
            ) {
                return;
            }
            await this.props.createEvent({
                variables: {
                    title,
                    price,
                    description,
                    date,
                },
                //to refetch quries after adding an Event
                refetchQueries: [{query: getEvents}],
            });

            this.setState({modal: false});
        } catch (err) {
            throw err;
        }
    };

    render() {
        const {events, loading} = this.props.getEvents;
        const token = localStorage.getItem('token');
        const modal = (
            <React.Fragment>
                {this.state.modal && (
                    <React.Fragment>
                        <Backdrop closeModal={this.closeModal} />
                        <Modal
                            title='Add Event'
                            canConfirm
                            canCancel
                            closeModal={this.closeModal}
                            confirmHandler={this.confirmHandler}
                        >
                            <form>
                                <div className='form-control'>
                                    <label htmlFor='title'>Title</label>
                                    <input
                                        type='text'
                                        id='title'
                                        ref={this.titleElRef}
                                        required
                                    />
                                </div>

                                <div className='form-control'>
                                    <label htmlFor='price'>Price</label>
                                    <input
                                        type='text'
                                        id='price'
                                        ref={this.priceElRef}
                                        required
                                    />
                                </div>

                                <div className='form-control'>
                                    <label htmlFor='date'>Date</label>
                                    <input
                                        type='datetime-local'
                                        id='date'
                                        ref={this.dateElRef}
                                        required
                                    />
                                </div>

                                <div className='form-control'>
                                    <label htmlFor='description'>
                                        Description
                                    </label>
                                    <textarea
                                        id='description'
                                        cols='4'
                                        ref={this.descriptionElRef}
                                        required
                                    />
                                </div>
                            </form>
                        </Modal>
                    </React.Fragment>
                )}
                {token && (
                    <div className='events-control'>
                        <p>Share you own Events...</p>
                        <button className='btn' onClick={this.toggleModal}>
                            Create Event
                        </button>
                    </div>
                )}
            </React.Fragment>
        );

        return (
            <React.Fragment>
                {modal}
                <EventList loading={loading} events={events} />
            </React.Fragment>
        );
    }
}

export default compose(
    graphql(createEvent, {name: 'createEvent'}),
    graphql(getEvents, {name: 'getEvents'}),
)(Events);
