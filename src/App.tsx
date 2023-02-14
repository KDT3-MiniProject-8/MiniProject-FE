import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import CategoryBar from './components/common/CategoryBar';
import GlobalStyle from './style/globalStyles';
import { useLocation } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0);
  const location = useLocation();

  return (
    <>
      <Outlet />
      <GlobalStyle />
      { location.pathname.includes('auth') ? null : <CategoryBar/>}
    </>
  );
}

export default App;