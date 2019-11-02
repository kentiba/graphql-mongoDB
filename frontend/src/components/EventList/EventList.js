import React from 'react';
import EventItem from './EventItem/EventItem';
import './EventList.css';

const EventList = props => {
    const {loading, events} = props;
    return (
        <ul className='events-section'>
            {loading === false && events ? (
                events.map(event => {
                    return <EventItem key={event._id} event={event} />;
                })
            ) : (
                <div className='loading'></div>
            )}
        </ul>
    );
};

export default EventList;
