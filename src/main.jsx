
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import appstore from './Appstore.jsx'
import {Provider} from "react-redux"

createRoot(document.getElementById('root')).render(

   <Provider store={appstore}>
 <App />
  
   </Provider>
)
