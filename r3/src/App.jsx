import 'bootstrap/dist/css/bootstrap.min.css';
import Auth from './Components/Auth';
import Create from './Components/Create';
import EditModal from './Components/EditModal';
import { GlobalProvider } from './Components/Global';
import List from './Components/List';
import './style/app.scss';

function App() {
    return (
        <GlobalProvider>
            <Auth>
                <>
                    <div className="container">
                        <div className="row">
                            <div className="col-5">
                                <Create />
                            </div>
                            <div className="col-7">
                                <List />
                            </div>
                        </div>
                    </div>
                    <EditModal />
                </>
            </Auth>
        </GlobalProvider>
    );
}


export default App;
