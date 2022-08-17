import Router from "next/router";
import { useState } from "react";
import { IconWarning } from "../components/icons";
import { Modo } from '../config/constants'
import { useUser } from '../lib/hooks'
import AuthInput from "../components/auth/AuthInput";

export default function Login() {
    useUser({ redirectTo: '/', redirectIfFound: true })

    const [modo, setModo] = useState<Modo>('login')
    const [erro, setErro] = useState(null)

    const [nif, setNif] = useState('')
    const [password, setPassword] = useState('')

    function handlerSubmit() {
        handlerLogin()
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

                <button
                    onClick={handlerSubmit}
                    className={`
                    w-full
                    bg-indigo-500 hover:bg-indigo-400 text-white
                    rounded-lg
                    px-4 py-3 mt-6
                `}
                >
                    Login
                </button>
                <hr className="my-6 border-gray-300 w-full" />
            </div>
        </div>
    );
}