import React, {Component} from 'react';
import * as compose from 'lodash.flowright';
import {getBookings, cancelBooking} from '../queries/Queries';
import {graphql} from 'react-apollo';
import './Booking.css';

class Bookings extends Component {
    cancelHandler = async id => {
        try {
            await this.props.cancelBooking({
                variables: {
                    bookingId: id,
                },
                //to refetch quries removing a booking
                refetchQueries: [{query: getBookings}],
            });
        } catch (err) {
            throw err;
        }
    };
    render() {
        const {loading, bookings} = this.props.getBookings;
        const userId = localStorage.getItem('user');
        const bookingList =
            loading === false ? (
                bookings.map(booking => {
                    if (booking.user._id === userId) {
                        return (
                            <div key={booking._id} className='booking__card'>
                                <h2>Event: {booking.event.title}</h2>
                                <h2>Price: {booking.event.price}</h2>
                                <h2>Your Email: {booking.user.email}</h2>
                                <h2>
                                    Booked on:
                                    {new Date(
                                        booking.createdAt,
                                    ).toLocaleDateString()}
                                </h2>
                                <button
                                    onClick={() =>
                                        this.cancelHandler(booking._id)
                                    }
                                >
                                    Cancel the Booking
                                </button>
                            </div>
                        );
                    } else {
                        return null;
                    }
                })
            ) : (
                <div className='loading'></div>
            );
        return (
            <div className='booking'>
                <h1>Your Booking List</h1>

                {bookingList.length >= 1 ? (
                    bookingList
                ) : (
                    <div>You have not booked any event yet ...</div>
                )}
            </div>
        );
    }
}

export default compose(
    graphql(getBookings, {name: 'getBookings'}),
    graphql(cancelBooking, {name: 'cancelBooking'}),
)(Bookings);
