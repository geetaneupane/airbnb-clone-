import React from 'react';
import { useContext, useState } from 'react';
import { UserContext } from "../UserContext.jsx";
import axios from 'axios'; 
import { Link, Navigate, useParams } from 'react-router-dom';
import PlacesPage from './PlacesPage.jsx';
import AccountNav from '../AccountNav.jsx';

export default function AccountPage() {
  const[redirect, setRedirect]=useState(null);
  const { ready, user,setUser } = useContext(UserContext);
  let { subpage } = useParams();
  if(subpage===undefined){                    
    subpage='profile';
  }

  async function logout(){
    await axios.post('/logout');
    setUser(null);  
    setRedirect('/');            //Redirecting to homepage after sucessful logout.
     //After logging out this line of code will remove the user name that we were seeing in the profile.
   }
   
   if(redirect){
    return <Navigate to={redirect}/>         //Always remember to put this line of code before the if(!ready) and if(ready && user) line of code. Otherwise after logging out, we will be directed to /login page despite of homepage.
   }
  if (!ready) {
    return "Loading.......";
  }

  if (ready && !user && !redirect) {
    return <Navigate to='/login' />;
  }

  return (
    <div>
      <AccountNav/>
      {subpage==='profile' &&(
        <div className='text-center max-w-lg mx-auto'>
         Logged in as {user.name}({user.email})<br/>
         <button onClick={logout} className='primary max-w-2-sm mt-2'>
           Log Out
           </button>

        </div>
      )
       }
       {subpage==='places'&&
       (<div>
        <PlacesPage/>
       </div>)
       }
    </div>
  );
}
