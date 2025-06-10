import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { tryGetLoggedInUser } from './components/managers/authmanager';
import { Spinner } from 'reactstrap';
import ApplicationViews from './ApplicationViews';

function App() {
  const [loggedInUser, setLoggedInUser] = useState();

  useEffect(() => {
    tryGetLoggedInUser().then((user) => {
      setLoggedInUser(user);
    })
  }, []);

  if(loggedInUser === undefined) {
    return <Spinner />
  }

  return (
  <>
    <ApplicationViews
      loggedInUser={loggedInUser}
      setLoggedInUser={setLoggedInUser}
      />
  </>
  )
}

export default App
