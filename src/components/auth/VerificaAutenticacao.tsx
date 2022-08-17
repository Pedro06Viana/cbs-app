import Image from 'next/image'
import Router from 'next/router'
import loadingImage from '../../../public/images/loading.gif'
import { useUser } from '../../lib/hooks'

interface VerificaAutenticacaoProps {
    children: any
}

export default function VerificaAutenticacao(props: VerificaAutenticacaoProps) {

    const { user, finished } = useUser()

    function renderConteudo() {

        /* Este pedaço de código reforça a proteção de rotas
        *  Implementa código JS no Head da APP
        *  Vai ser executado em todas as páginas no momento do carregamento
        *  Se o cookie for eliminado força a página a ir para o Login
        */
        return <>
            {props.children}
        </>
    }

    function renderCarregando() {
        return (
            <div className="flex justify-center items-center h-screen">
                <Image src={loadingImage} alt="Imagem de carregamento de página" />
            </div>
        )
    }

    if (finished && (user)) {
        return renderConteudo()
    } else if (!finished) {
        return renderCarregando()
    } else {
        Router.push('/login')
        return null
    }
}