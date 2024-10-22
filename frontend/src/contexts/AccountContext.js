import { createContext, useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosClient from '../utils/axiosCustomize'
import LoginAPI from '../api/LoginAPI'
const AccountContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('access_token'))
    const [account, setAccount] = useState(JSON.parse(localStorage.getItem('user_info')))

    const providerValue = useMemo(
        () => ({ token, setToken, account, setAccount}),
        [token, setToken, account, setAccount],
    )

    const navigate = useNavigate()

    useEffect(() => {
        if ( token !== 'null') {
            // Set authenticate token to axios
            axiosClient.application.defaults.headers.common[
                'Authorization'
            ] = `Bearer ${token}`

            LoginAPI.login()
                .then ((response)=> {
                    setAccount(response.data)
                    localStorage.setItem(
                        'user_info',
                        JSON.stringify( response.data),
                    )
                })
                .catch((error) => {
                                console.log(error)
                })

        } else {
            // User logout
            delete axiosClient.application.defaults.headers.common['Authorization'];

            setAccount('null');
            localStorage.removeItem('access_token')
            localStorage.removeItem('user_info')
        }
    }, [token, navigate])

    return (
        <AccountContext.Provider value={providerValue}>
            {children}
        </AccountContext.Provider>
    )
}

export default AccountContext