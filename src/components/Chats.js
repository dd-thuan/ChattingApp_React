import React, { useEffect, useState, useRef } from 'react';
import { useHistory} from 'react-router-dom'
import { ChatEngine } from 'react-chat-engine'
import { auth } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';


// export default function Chats() {
//     const didMountRef = useRef(false)
//     const history = useHistory();
//     const {user} = useAuth();
//     const [loading, setLoading] = useState(true);
   

//     async function handleLogout() {
//         await auth.signOut()
//         history.push("/")
//     }
//     // const handleLogout = async () => {
//     //     await auth.signOut()
//     //     history.push("/")
//     // }

//     const getFile = async (url) => {
//         const response = await fetch(url);
//         const data = await response.blob();

//         return new File([data], "userPhoto.jpg", { type: "image/jpeg"})
//     }

//     useEffect(() => {
//         if(didMountRef.current) {
//             didMountRef.current = true
//             if(!user ||  user === null) {
//                 history.push('/');
//                 return;
//             }

//             axios.get('https://api.chatengine.io/users/me/' , {
//                 headers: {
//                     "project-id": "5f8fea50-bd0e-4093-b84c-640c8370ff4f",
//                     "user-name": user.email,
//                     "user-secret": user.uid
//                 }}
//             )
//             .then(() =>  setLoading(false))

//             .catch(e => {
//                 let formdata = new FormData();
//                 formdata.append('email', user.email);
//                 formdata.append('username', user.email);
//                 formdata.append('secret', user.uid);

//                 getFile(user.photoURL)
//                     .then(avatar => {
//                         formdata.append('avatar', avatar, avatar.name);

//                         axios.post(
//                             'https://api.chatengine.io/users/' ,
//                             formdata,
//                             {headers: {"private-key": "881e4045-1938-4c1f-a78c-36dd1edbe04c"}}
//                         )
//                         .then(() => setLoading(false))
//                         .catch(e => console.log('e', e.response))
//                     })
//             })
//         }
//     }, [user, history])

  

//     return (
//         <div className="chats-page">
//             <div className="nav-bar">
//                 <div className="logo-tab">
//                     Unichat
//                 </div>

//                 <div onClick={handleLogout} className="logout-tab">
//                     Logout
//                 </div>
//             </div>
//             <ChatEngine
//                 height="calc(100vh - 66px)"
//                 projectID="5f8fea50-bd0e-4093-b84c-640c8370ff4f"
//                 userName={user.email}
//                 userSecret={user.uid}
//             />
//         </div>
        
//     );  
// };



export default function Chats() {
  const didMountRef = useRef(false)
  const [ loading, setLoading ] = useState(true)
  const { user } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    await auth.signOut()
    history.push("/")
  }

  async function getFile(url) {
    let response = await fetch(url);
    let data = await response.blob();
    return new File([data], "test.jpg", { type: 'image/jpeg' });
  }

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true

      if (!user || user === null) {
        history.push("/")
        return
      }
      
      // Get-or-Create should be in a Firebase Function
      axios.get(
        'https://api.chatengine.io/users/me/',
        { headers: { 
          "project-id": process.env.REACT_APP_CHAT_ENGINE_ID,
          "user-name": user.email,
          "user-secret": user.uid
        }}
      )

      .then(() => setLoading(false))

      .catch(e => {
        let formdata = new FormData()
        formdata.append('email', user.email)
        formdata.append('username', user.email)
        formdata.append('secret', user.uid)

        getFile(user.photoURL)
        .then(avatar => {
          formdata.append('avatar', avatar, avatar.name)

          axios.post(
            'https://api.chatengine.io/users/',
            formdata,
            { headers: { "private-key":  process.env.REACT_APP_CHAT_ENGINE_KEY }}
          )
          .then(() => setLoading(false))
          .catch(e => console.log('e', e.response))
        })
      })
      // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    }
  }, [user, history])
  

  if (!user || loading) return <div />

  return (
    <div className='chats-page'>
      <div className='nav-bar'>
        <div className='logo-tab'>
          Unichat
        </div>

        <div onClick={handleLogout} className='logout-tab'>
          Logout
        </div>
      </div>

      <ChatEngine 
        height='calc(100vh - 66px)'
        projectID= { process.env.REACT_APP_CHAT_ENGINE_ID}
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  )
}