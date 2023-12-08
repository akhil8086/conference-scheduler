
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'



// ReactDOM.createRoot(document.getElementById('root')).render(
  
//     <App />

  
// );



// import ReactDOM from 'react-dom/client';
// import { Provider } from 'react-redux';
// import { store } from './components/store';
// import App from './App';
// import './index.css'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
// );




// index.js

// import ReactDOM from 'react-dom/client';
// import App from './App';
// import './index.css';


// ReactDOM.createRoot(document.getElementById('root')).render(
  
//    <App />
// );



// main.jsx

import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './components/store'; // Import the Redux store
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
