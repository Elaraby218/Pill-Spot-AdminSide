import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Outlet, useNavigate } from 'react-router-dom';
import { RootState } from '../../../App/Store';
import Header from './header';
import Sider from './sider';

const HomePageLayout = () => {
  const curUser = useSelector((state: RootState) => state.curUserSlice.curUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!curUser) {
      navigate("/", { replace: true });
    }
  }, [curUser, navigate]);

  if (!curUser) {
    return null; 
  }

  return (
    <>
    <main>
      <Header/>
      <Sider/>
      <Outlet /> 

    </main>
    </>
  );
};

export default HomePageLayout;
