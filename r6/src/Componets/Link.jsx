import { useContext } from 'react';
import { navigate } from '../actions';
import { Store } from '../store';

export default function Link({ to, children, className, action, data }) {

    const { actionsList, dispach } = useContext(Store);



    const go = e => {
        e.preventDefault();
        console.log('LINK:', action, data);

        let params = '';
        if (data) {
            params = '/' + data.join('/');
        }

        window.location.hash = (to || action) + params;


        if (to) {
            dispach(navigate(to));
        } else {
            dispach(actionsList[action](data || null));
        }

    }

    return (
        <a href={to || action} className={className} onClick={go}>{children}</a>
    );
}