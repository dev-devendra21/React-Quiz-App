import {Route, Redirect, Switch} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Assessment from './components/Assessment'
import Results from './components/Results'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import './App.css'

// write your code here

const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/assessment" component={Assessment} />
      <ProtectedRoute exact path="/results" component={Results} />
      <Route exact path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </>
)

export default App
