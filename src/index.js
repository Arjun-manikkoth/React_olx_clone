import ReactDOM from 'react-dom';
import App from './App';
import  Context  from './Store/FirebaseContext';
import { FirebaseContext } from "./Store/FirebaseContext";
import  firebase  from './firebase/config';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <FirebaseContext.Provider value={{ firebase }}>
    <Context>
       <App />
    </Context>
  </FirebaseContext.Provider>
);
