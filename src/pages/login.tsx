import Router from "next/router";
import { useEffect, useState } from "react";
import AuthInput from "../components/auth/AuthInput";
import { IconWarning } from "../components/icons";
import { useUser } from '../lib/hooks'
import axios from 'axios'
import AuthSelectInput from "../components/auth/AuthSelectInput";
import { Modo, Roles } from '../config/constants'

export default function Login() {
    useUser({ redirectTo: '/', redirectIfFound: true })

    const [modo, setModo] = useState<Modo>('login')
    const [erro, setErro] = useState(null)

    const [nome, setNome] = useState('')
    const [nif, setNif] = useState('')
    const [nib, setNib] = useState('')
    const [password, setPassword] = useState('')
    const [posto, setPosto] = useState(1)
    const [postos, setPostos] = useState([])
    const [role, setRole] = useState(2)

    /* GET POSTOS FROM DB */
    useEffect(() => {
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
        getPostos()
    }, [])

    function handlerSubmit() {
        if (modo === 'login') {
            handlerLogin()
        } else {
            handlerRegister()
        }
    }
    async function handlerLogin() {
        try {
            // Adicionar Schema
            const body = {
                nif: nif,
                password: password,
            }

            try {
                const res = await fetch('/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body),
                })
                if (res.status === 200) {
                    Router.push('/')
                } else {
                    criarErro(await res.text())
                }
            } catch (error) {
                console.error('An unexpected error happened occurred:', error)
                criarErro(error.message)
            }

        } catch (error) {
            criarErro(error?.message ?? 'Ocorreu um erro inesperado!')
        }
    }

    async function handlerRegister() {
        // Adicionar Schema
        const body = {
            nome: nome,
            posto: +posto,
            nib: +nib,
            nif: +nif,
            roles: +role,
            password: password,
        }

        try {
            const res = await fetch('/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })
            if (res.status === 200) {
                setModo('login')
                criarErro(null)
                setNif('')
                setPassword('')
                setNome('')
                setPosto(1)
                setNib('')
                setRole(2)
            } else {
                const { message } = await res.json()
                criarErro(message)
                if (res.status === 409) {
                    setModo('login')
                    criarErro(null)
                    setNome('')
                    setPosto(1)
                    setNib('')
                    setRole(2)
                }
            }
        } catch (error) {
            console.error('An unexpected error happened occurred:', error)
            criarErro(error.message)
        }
    }

    function criarErro(msg, tempo = 5) {
        setErro(msg)
        setTimeout(() => setErro(null), tempo * 1000)
    }

    function renderErro() {
        return erro ?
            <div className={`
                flex items-center
                bg-red-400 text-white
                py-3 px-5 my-2
                border border-red-700 rounded-lg
            `} >
                {IconWarning()}
                < span className="ml-3" > {erro}</span >
            </div >
            : false
    }

    function renderMsgRodape() {
        return modo === 'login' ? (
            <p className="mt-8">
                <a className="text-blue-500 hover:text-blue-700 font-semibold cursor-pointer"
                    onClick={() => { setModo('registo') }}>Criar uma Conta</a>
            </p>
        ) : (
            <p className="mt-8">
                <a className="text-blue-500 hover:text-blue-700 font-semibold cursor-pointer"
                    onClick={() => { setModo('login') }}>Efetuar Login com suas credências</a>
            </p>
        )
    }

    return (
        <div className="flex h-screen items-center justify-center">
            <div className={`hidden md:block md:w-1/2 lg:w-2/3`}>
                <img
                    src="https://source.unsplash.com/random/?firefighter"
                    alt="Login image"
                    className="h-screen w-full object-cover"
                />
            </div>
            <div className="m-10 w-full md:w-1/2 lg:w-1/3">
                <h1 className={`text-3xl font-bold mb-5`}>
                    {modo === 'login' ? 'Efetuar Login' : 'Efetuar novo Registo'}
                </h1>

                {renderErro()}

                <AuthInput
                    id="nif"
                    label="Nif"
                    tipo="text"
                    valorAlterado={setNif}
                    valor={nif}
                    obrigatorio
                    render
                />
                <AuthInput
                    id="password"
                    label="Password"
                    tipo="password"
                    valorAlterado={setPassword}
                    valor={password}
                    obrigatorio
                    render
                />
                <AuthInput
                    id="nome"
                    label="Nome"
                    tipo="text"
                    valorAlterado={setNome}
                    valor={nome}
                    obrigatorio={modo === 'registo'}
                    render={modo === 'registo'}
                />
                <AuthSelectInput
                    id="posto"
                    label="Posto"
                    valor={postos}
                    valueSelected={posto}
                    valorAlterado={setPosto}
                    obrigatorio={modo === 'registo'}
                    render={modo === 'registo'}
                />
                <AuthInput
                    id="nib"
                    label="NIB"
                    tipo="text"
                    valorAlterado={setNib}
                    valor={nib}
                    obrigatorio={modo === 'registo'}
                    render={modo === 'registo'}
                />
                <AuthSelectInput
                    id="roles"
                    label="Tipo de Acesso"
                    valor={Roles}
                    valueSelected={role}
                    valorAlterado={setRole}
                    obrigatorio={modo === 'registo'}
                    render={modo === 'registo'}
                />


                <button
                    onClick={handlerSubmit}
                    className={`
                    w-full
                    bg-indigo-500 hover:bg-indigo-400 text-white
                    rounded-lg
                    px-4 py-3 mt-6
                `}
                >
                    {modo === 'login' ? 'Login' : 'Registo'}
                </button>

                <hr className="my-6 border-gray-300 w-full" />

                {renderMsgRodape()}
            </div>
        </div>
    );
}