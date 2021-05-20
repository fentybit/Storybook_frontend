export default function EventDisplay(props) {
    const renderEvent = () => {
        if (props.events) {
            const eventId = props.match.params.eventId;

            return props.events.filter(event => event.id == eventId)[0];
        }
    }

    const handleClick = () => {
        const categoryId = props.match.params.categoryId
        const eventId = props.match.params.eventId

        props.history.push(`/events/${categoryId}/${eventId}/edit`)
    }

    return (
        <div>
            <h5>Event Display</h5>
            {(renderEvent())
                ?
                <>
                    <h5>{renderEvent().category.name}</h5>
                    <p>{renderEvent().title}</p>
                    <p>{renderEvent().vibe}</p>
                    <p>{renderEvent().date}</p>
                    <p>{renderEvent().time_strftime}</p>
                    <p>{renderEvent().location}</p>
                    <p>{renderEvent().description}</p>

                    { (renderEvent().images) ? renderEvent().images.map(image => <img key={image.id} src={image.url} style={{ height: '200px' }} />) : null}
                </>
                :
                <h5>Loading...</h5>
            }
            <br />
            <button onClick={handleClick}>Edit</button>
        </div>
    )
}