import { Link } from 'react-router-dom';

export default function CalendarView(props) {
    const renderCategoryEvents = () => {
        if (props.events) {
            const categoryId = props.match.params.categoryId;

            return props.events.filter(event => event.category.id == categoryId);
        }
    }

    return (
        <div>
            <h5>Calendar View</h5>
            { (props.events)
                ?
                renderCategoryEvents().map(event => (
                    <div key={event.id}>
                        <p><Link key={event.id} to={`/events/${props.match.params.categoryId}/${event.id}`}>{event.title}</Link></p>

                        <p>{event.date}</p>
                        <p>{event.time_strftime}</p>
                        <p>{event.vibe}</p>
                        <p>{event.description}</p>
                        <p>----</p>
                    </div>
                ))
                :
                <h5>Loading...</h5>}
        </div>
    )
}