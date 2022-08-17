import { useState } from "react";
import { IconWarning } from "../icons";
import { Roles } from '../../config/constants'
import useAppData from "../../data/hook/useAppData";
import AuthSelectInput from "../auth/AuthSelectInput";
import AuthInput from "../auth/AuthInput";
import { handlerRegister } from './handlerFunction'

export default function Registo() {
    const { postos } = useAppData()

    const [erro, setErro] = useState(null)

    const [nome, setNome] = useState('')
    const [nif, setNif] = useState('')
    const [nib, setNib] = useState('')
    const [password, setPassword] = useState('')
    const [posto, setPosto] = useState(1)
    const [role, setRole] = useState(2)

    async function handlerSubmit() {
        const body = {
            nome: nome,
            posto: +posto,
            nib: +nib,
            nif: +nif,
            roles: +role,
            password: password,
        };
        const res = await handlerRegister(body)
        if (res.status === 200) {
            criarErro(null);
            setNif("");
            setPassword("");
            setNome("");
            setPosto(1);
            setNib("");
            setRole(2);
        } else {
            const { message } = await res.json();
            criarErro(message);
            if (res === 409) {
                criarErro(null);
                setNome("");
                setPosto(1);
                setNib("");
                setRole(2);
            }
        }
    }
    /* 
    * CriarSucesso
    *
    */
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

    return (
        <div className="flex h-full items-center justify-center">
            <div className="m-10 w-full md:w-1/2 lg:w-1/3">
                <h1 className={`text-3xl font-bold mb-5`}>
                    Efetuar novo Registo
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
                    obrigatorio
                    render
                />
                <AuthSelectInput
                    id="posto"
                    label="Posto"
                    valor={postos}
                    valueSelected={posto}
                    valorAlterado={setPosto}
                    obrigatorio
                    render
                />
                <AuthInput
                    id="nib"
                    label="NIB"
                    tipo="text"
                    valorAlterado={setNib}
                    valor={nib}
                    obrigatorio
                    render
                />
                <AuthSelectInput
                    id="roles"
                    label="Tipo de Acesso"
                    valor={Roles}
                    valueSelected={role}
                    valorAlterado={setRole}
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
                    Registo
                </button>

                <hr className="my-6 border-gray-300 w-full" />
            </div>
        </div>
    );
}