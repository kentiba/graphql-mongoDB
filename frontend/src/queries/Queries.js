import gql from 'graphql-tag';

//login(email:String!, password:String!):AuthData!
export const loginUser = gql`
    mutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            userId
            token
        }
    }
`;
//  _id:ID! email:String! password:String
export const createUser = gql`
    mutation($email: String!, $password: String!) {
        createUser(userInput: {email: $email, password: $password}) {
            _id
            email
        }
    }
`;

// eventInput: {title:String! description:String!  price:Float!  date:String!}
export const createEvent = gql`
    mutation(
        $title: String!
        $description: String!
        $price: Float!
        $date: String!
    ) {
        createEvent(
            eventInput: {
                title: $title
                description: $description
                price: $price
                date: $date
            }
        ) {
            title
            date
        }
    }
`;

// get events
export const getEvents = gql`
    query {
        events {
            _id
            title
            description
            price
            date
            creator {
                _id
                email
            }
        }
    }
`;

//Book event
//eventId:ID!
export const bookEvent = gql`
    mutation($eventId: ID!) {
        bookEvent(eventId: $eventId) {
            _id
            createdAt
        }
    }
`;

//get Bookings
// bookings:[Booking!]!
export const getBookings = gql`
    query {
        bookings {
            _id
            event {
                _id
                title
                price
            }
            user {
                _id
                email
            }
            createdAt
            updatedAt
        }
    }
`;

//cancel Booking
// bookingId:ID!
export const cancelBooking = gql`
    mutation($bookingId: ID!) {
        cancelBooking(bookingId: $bookingId)
    }
`;
