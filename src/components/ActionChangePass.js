import customFetch from "../utils/axios";
import { toast } from 'react-toastify';

export const CHANGE_PASSWORD_REQUEST = 'CHANGE_PASSWORD_REQUEST';
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_FAILURE = 'CHANGE_PASSWORD_FAILURE';

export const changePasswordRequest = () => ({
    type: CHANGE_PASSWORD_REQUEST
});
  
export const changePasswordSuccess = () => ({
    type: CHANGE_PASSWORD_SUCCESS
});

export const changePasswordFailure = () => ({
    type: CHANGE_PASSWORD_FAILURE
});

export const changePassword = (oldPassword, newPassword) => async (dispatch) => {
    console.log(oldPassword + " " + newPassword);
    dispatch(changePasswordRequest());

    try {
        // Gửi yêu cầu thay đổi mật khẩu đến backend
        const info = {oldPassword: oldPassword, newPassword: newPassword}; 
        const response = await customFetch.patch('/changepassword', info);

        if (response.status === 200) {
            dispatch(changePasswordSuccess());
            toast.success("Change password successfully!");
        } else {
            dispatch(changePasswordFailure());
            toast.error("Password change failed!");
        }
    } catch (error) {
        console.error('Error changing password:', error);
        dispatch(changePasswordFailure());
        toast.error("Old password is not right!");
    }
};