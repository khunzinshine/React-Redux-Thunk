/* eslint-disable import/no-cycle */
import React, { useEffect, useState, useContext } from 'react';
import SideMenu from './SideMenu/SideMenu';
import TopMenu from './TopMenu/TopMenu';
import Swal from 'sweetalert2';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import '../scss/_common.scss';

const TheLayout = (props) => {
  const authContext = useContext(AuthContext);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (authContext.isExpired()) {
      Swal.fire({
        icon: 'warning',
        title: 'Session Expired',
        text: 'Session expired please login again',
      }).then((result) => {
        if (result.isConfirmed) {
          setIsExpired(true);
          authContext.logout();
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isExpired || !authContext.isAuthenticated()) {
    return <Redirect to="/auth/login" />;
  }

  return (
    <div className="grid">
      <div className="menu">
        <TopMenu />
      </div>
      <div className="main-content">
        <SideMenu />
      </div>
    </div>
  );
};

export default TheLayout;
