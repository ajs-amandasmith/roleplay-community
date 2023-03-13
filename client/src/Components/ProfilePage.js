import React, { useContext } from "react";
import { UserContext } from "../Context/user";

function ProfilePage() {
  const { user, setUser } = useContext(UserContext);

  console.log('user', user)

  return (
    <div>
      Profile Page
    </div>
  )
}

export default ProfilePage;