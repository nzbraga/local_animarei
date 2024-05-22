import React, { createContext, useState } from 'react';


const UserContext = createContext();

export const UserProvider = ({ children }) => {
    
  const [user, setUser] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const [currentId, setCurrentId] = useState(null);
  const [theme, setTheme] = useState('');
 
  
  return (
    <UserContext.Provider value={{
      user, setUser,
      userImage, setUserImage,
      currentId, setCurrentId,
      theme, setTheme     
      }}>

      {children}
    </UserContext.Provider>
  );
};

export default UserContext;


/*
import UserContext from '../UserContext';

const { theme } = useContext(UserContext);

*/