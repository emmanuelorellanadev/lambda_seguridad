import axios from "axios";
import toast from "react-hot-toast";

// token se recibe desde GlobalContext (pasado por parámetro) para no depender de sessionStorage
export const useCreateUser = async (urlUser, userImage, state, { setOnLoad }, token) => {
    const userData = new FormData(document.querySelector('#formCreateUser'));
    userData.append('img', userImage);
    userData.set('user_state', state);

    await axios
        .post(urlUser, userData, {
            headers: { 'x-token': token || sessionStorage.getItem('token-xL') },
        })
        .then((response) => {
            setOnLoad?.(false);
            toast.success(`${response.data.resData}`, {
                duration: 3000,
                position: 'top-right',
                style: {
                    background: 'rgb(33, 157, 192)',
                    color: '#ffff',
                    height: '4rem',
                },
            });
        })
        .catch((error) => {
            console.log(error);
            toast.error(
                `${error?.response?.data?.error || 'Error al crear usuario'} \n ${
                    error?.response?.data?.errorLambda || ''
                }`.trim(),
                {
                    duration: 4000,
                    position: 'top-right',
                    style: {
                        background: 'rgb(33, 157, 192)',
                        color: '#ffff',
                        height: '4rem',
                    },
                }
            );
        });
};