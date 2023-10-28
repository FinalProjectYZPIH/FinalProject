import axios from "../../libs/axiosProtected.js"

export async function findAllUserRequest() {
    const findAllHandler = await axios.get("/api/user");
    return findAllHandler.data;
  }

  export async function updateUserRequest({username, oldPassword, newPassword, newPasswordConfirmation}) {
    const updateHandler = await axios.patch("/api/user/updateUserById",{username, oldPassword,newPassword,newPasswordConfirmation});
    return updateHandler.data;
  }

  export async function findOneRequest({username}) {
  const findOneHandler = await axios.patch(`/api/user/${username}`);
    return findOneHandler.data;
  }

  export async function deleteAccountRequest() {
    const deleteHandler = await axios.patch(`/api/user/deleteAccount`);
      return deleteHandler.data;
    }
