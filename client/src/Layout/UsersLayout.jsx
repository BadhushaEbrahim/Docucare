import React from 'react';
import UserFooter from '../components/userComponents/userFooter';
import UserNav from '../components/userComponents/userNav';
import UserNav2 from '../components/userComponents/userNav2';
import { useSelector } from 'react-redux';


function UsersLayout({ children }) {
    const user = localStorage.getItem("userToken")

  return (
    <div>
      <header>
        {user ? <UserNav /> : <UserNav2 />}
      </header>
      <body>
        {children}
      </body>
      <footer>
        <UserFooter />
      </footer>
    </div>
  );
}

export default UsersLayout;
