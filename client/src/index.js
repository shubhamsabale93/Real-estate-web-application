import React from 'react';
import ReactDOM from 'react-dom/client';

import Home from './views/Home/Home'
import AddProperty from './views/AddProperty/AddProperty'
import UpdateProperty from './views/UpdateProperty/UpdateProperty';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import './global.css'
import Login from './views/Login/Login';

const root = ReactDOM.createRoot(document.getElementById('root'));

  
  const router = createBrowserRouter([
    {
      path: '/',
      element:<Home/>
  
    
    },
    {
      path:'/AddProperty',
      element:<AddProperty/>
    },
    {
      path:'/UpdateProperty/:id',
      element:<UpdateProperty/>

    },
    {
      path:'/login',
      element:<Login/>

    }
    
  ])
  
  root.render(<RouterProvider router={router} />);
 


