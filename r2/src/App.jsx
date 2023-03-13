import 'bootstrap/dist/css/bootstrap.min.css';
import './style/app.scss';
import Create from './Components/Create';
import { GlobalProvider } from './Components/Global';
import List from './Components/List';
import ModalDelete from './Components/ModalDelete';
import ModalAdd from './Components/ModalAdd';
import ModalRem from './Components/ModalRem';
import Messages from './Components/Messages';
import CookieMonster from './Components/CookieMonster';
import Login from './Components/Login';

function App() {
  return (
    <GlobalProvider>
      <div className="container">
        <div className="row">
          <div className="col-5">
            <Login />
            <Create />
            <CookieMonster />
          </div>
          <div className="col-7">
            <List />
          </div>
        </div>
      </div>
      <ModalDelete />
      <ModalAdd />
      <ModalRem />
      <Messages />
    </GlobalProvider>
  );
}

export default App;
