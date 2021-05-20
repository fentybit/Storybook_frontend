import NavBar from '../components/navigation/NavBar';
import EventViewList from '../components/eventview/EventViewList';
import DisplayContainer from './DisplayContainer';

export default function ProfileContainer(props) {
    const { categories, events, match, token, user } = props;

    return (
        <div>
            {
                (user)
                    ?
                    <div>
                        <NavBar categories={categories} user={user} />

                        <hr />
                        <EventViewList categories={categories} events={events} props={props} token={token} url={match.url} user={user} />

                        <hr />
                        <DisplayContainer categories={categories} events={events} token={token} url={match.url} user={user} />
                    </div>

                    :

                    null
            }
        </div>
    )
}