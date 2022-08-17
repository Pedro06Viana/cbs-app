import { createContext, useEffect, useState } from "react";
import axios from 'axios';

interface AppContextProps {
    tema?: string
    alterarTema?: () => void
    postos?: any[]
}

const AppContext = createContext<AppContextProps>({
    tema: null,
    alterarTema: null
})

export function AppProvider(props) {
    /* Tema Context */
    const [tema, setTema] = useState('')
    function alterarTema() {
        const novoTema = (tema === '' ? 'dark' : '')
        setTema(novoTema)
        localStorage.setItem('tema', novoTema)
    }
    useEffect(() => {
        const temaSalvo = localStorage.getItem('tema')
        setTema(temaSalvo)
    }, [])

    /* POSTOS Context */
    const [postos, setPostos] = useState([])
    const getPostos = async () => {
        await axios.get('/api/postos')
            .then(function (response) {
                const postos = new Array()
                response.data.map(({ id_posto, posto }) => {
                    postos.push({ id: id_posto, value: posto })
                })
                setPostos(postos)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }
    useEffect(() => {
        getPostos()
    }, [])

    return (
        <AppContext.Provider value={{
            tema: tema,
            alterarTema,
            postos
        }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContext