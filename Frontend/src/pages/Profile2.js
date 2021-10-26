import React, {useContext} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import {AuthContext} from '../helpers/AuthContext';
import axios from 'axios'

const Profile2 = () => {
  // eslint-disable-next-line no-unused-vars
  let { id } = useParams();
  const [user, setUser] = useContext(AuthContext);
  const history = useHistory()

  const handleModifyProfil = (e) => {
    e.preventDefault()
    history.push('/update-profile')
  }

  const handleDeleteAccount = async (e) => {
    e.preventDefault()
    try {
      const getToken = localStorage.getItem('user')
      const token = JSON.parse(getToken).token
      console.log(user);
      const res = await axios.delete(`http://localhost:3001/auth/basicinfo/${id}`, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken")
        }
      })
      if (res.status === 200) {
        localStorage.removeItem('user')
        setUser(null)
        history.push('/')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main className='bg-custom-main h-screen p-8'>
      <div className='container flex flex-col items-center rounded-xl max-w-3xl mx-auto p-8 bg-custom-section'>
        <h2 className='text-xl font-bold mb-2'>Mon profil</h2>
        {user && (
          <>
            <label className='font-bold'>Nom</label>
            <p>{user.username}</p>
            <label className='font-bold'>Prénom</label>
            <p>{user.bio}</p>
            <label className='font-bold'>Email</label>
            <p>{user.email}</p>
            <div>
              <button
                onClick={handleModifyProfil}
                className='bg-custom-button rounded-xl font-bold mt-4 p-2'
                type='button'>
                Modifier mon profil
              </button>
            </div>
            <div>
              <button
                onClick={handleDeleteAccount}
                className='bg-custom-button rounded-xl font-bold mt-4 p-2'
                type='button'>
                Supprimer le compte
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  )
}

export default Profile2
