import Router from "next/router";
import { useState } from "react";
import { useUser } from '../../lib/hooks'
import AuthInput from "../auth/AuthInput";
import { toast, ToastContainer } from "react-toastify";
import { handlerLogin } from './handlerFunction';

export default function LoginForm() {
    useUser({ redirectTo: '/', redirectIfFound: true })

    const [nif, setNif] = useState('')
    const [password, setPassword] = useState('')

    async function handlerSubmit() {
        const body = {
            nif: +nif,
            password: password,
        };
        const res = await handlerLogin(body)
        if (res.status === 200) {
            Router.push('/')
        } else if (res.status === 401) {
            console.log(res.status);
            toast.error(res.message)
        } else {
            toast.error(res.message)
        }
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
                <ToastContainer />
                <h1 className={`text-3xl font-bold mb-5`}>
                    Efetuar Login
                </h1>

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