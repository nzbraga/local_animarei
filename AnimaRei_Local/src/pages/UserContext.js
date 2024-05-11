import React, { createContext, useState } from 'react';


const UserContext = createContext();

export const UserProvider = ({ children }) => {
    
  const [user, setUser] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const [currentId, setCurrentId] = useState(null);
  const [theme, setTheme] = useState('');
 
  
  const [userId, setUserId] = useState(1);

  const autoIncrement = ()=>{
    setUserId(userId +1)
    return userId
  }

  return (
    <UserContext.Provider value={{
      user, setUser,
      userImage, setUserImage,      
      autoIncrement,
      currentId, setCurrentId,
      theme, setTheme     
      }}>

      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
