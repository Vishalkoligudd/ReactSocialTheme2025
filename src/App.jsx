
import { ThemeProvider,CssBaseline } from '@mui/material'
import darkTheme from './theme/theme'
import './App.css'
import Login from './Authorization/Login'
import SignUp from './Authorization/SignUp'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './layout/Dashboard'
import PostList from './pages/PostList'
import Posts from './pages/Posts'
import ProtectedRoute from './Authorization/ProtectedRoute'
import CreatePost from './pages/CreaePost'

function App() {
  const router=createBrowserRouter([
    {
      path:'/',
      element:<Login/>,
    },
    {
      path:'/signup',
      element:<SignUp/>,
    },
  {
    path:'/dashboard',
    element:(
      <ProtectedRoute>
      <Dashboard/>
      </ProtectedRoute>
  ),
    children:[
      {
        index: true, 
        element: <Posts />,
      },
      {
        path:'postlist',
        element:<PostList/>
      },
      {
        path:'posts',
        element:<Posts/>,
      },
      {
        path:'createPost',
        element:<CreatePost/>
      }
    ]
  }])

  return (
  <ThemeProvider theme={darkTheme}>
    <CssBaseline/>
    <RouterProvider router={router}/>
  </ThemeProvider>
  )
}

export default App
