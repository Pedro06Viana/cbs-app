import { ToastContainer } from "react-toastify";

interface ConteudoProps {
    children?: any
}

export default function Conteudo(props: ConteudoProps) {
    return (
        <div className={`
            flex flex-col mt-7
            dark:text-gray-100
        `}>
            <ToastContainer />
            {props.children}
        </div>
    );
}