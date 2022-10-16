import {axiosInstance} from './config';

export const loginCall = async(userCredential, dispatch) => {
    dispatch({type: "LOGIN_START"})
    try {
        const res = await axiosInstance.post(`/api/userLogin`, userCredential);
        console.log(res)
        dispatch({type: "LOGIN_SUCCESS",  payload: res.data})
        window.location.reload()
    } catch (error) {
        dispatch({type: "LOGIN_FAILURE", payload: error})
    }
}
