import React, {useState, useContext} from "react";
import {useHistory} from "react-router";
import {AuthContext} from ".././helpers/AuthContext";
import axios from "axios";

const ProfileForm = () => {
  const [user, setUser] = useContext(AuthContext);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const updateUser = {
        fullName: fullName === "" ? undefined : fullName,
        email: email === "" ? undefined : email,
        password: password === "" ? undefined : password
      }
      const res = await axios.put(`http://localhost:3000/users/${user.id}`, updateUser, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken")
        }
      })
      if (res.status === 200) {
        const {...userInLocalStorage} = JSON.parse(localStorage.getItem("user"))
        userInLocalStorage.user = res.data
        setUser(userInLocalStorage.user)
        localStorage.setItem("user", JSON.stringify(userInLocalStorage))
        history.push("/profile")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main className="bg-custom-main h-screen p-8">
      <div className="container flex flex-col items-center rounded-xl max-w-3xl mx-auto p-8 bg-custom-section">
        <h2 className="text-xl font-bold mb-2">Mon profil</h2>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          
          <label className="font-bold my-2" htmlFor="profile-fullName">
            Prénom & Nom de famille
          </label>
          <input
            className="rounded-xl font-bold p-2"
            type="text"
            name="profile-fullName"
            id="profile-fullName"
            placeholder={user.fullName}
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
          />
          <label className="font-bold my-2" htmlFor="profile-email">
            Adresse e-mail
          </label>
          <input
            className="rounded-xl font-bold p-2"
            type="text"
            name="profile-email"
            id="profile-email"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <label className="font-bold my-2" htmlFor="profile-password">
            Mot de passe
          </label>
          <input
            className="rounded-xl font-bold p-2"
            type="text"
            name="profile-password"
            id="profile-password"
            placeholder="********"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button className="bg-custom-button rounded-xl font-bold mt-4 p-2" type="submit">
            Valider modifications
          </button>
        </form>
      </div>
    </main>
  )
}

export default ProfileForm;