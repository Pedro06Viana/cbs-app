type Tipo = 'text' | 'email' | 'password'

interface AuthSelectInputProps {
    id: string
    label: string
    valor: any
    valueSelected: any
    tipo?: Tipo
    obrigatorio?: boolean
    render?: boolean
    valorAlterado: (novoValor: any) => void
}

export default function AuthSelectInput(props: AuthSelectInputProps) {

    function renderOption() {
        return props.valor.map(({ id, value }) => {
            return <option
                key={`${props.label}_${id}`}
                value={id}>{value}
            </option>
        })
    }

    return !props.render ? null : (
        <div className={`
            flex flex-col mt-4
        `}>
            <label htmlFor={props.id}>{props.label}</label>
            <select
                id={props.id}
                name={props.id}
                defaultValue={props.valueSelected}
                onChange={(e) => props.valorAlterado?.(e.target.value)}
                required={props.obrigatorio}
                className={`
                    px-4 py-3 mt-2
                    rounded-lg
                    bg-gray-200
                    border focus:border-blue-500 focus:outline-none focus:bg-white
                `}
            >
                {renderOption()}
            </select>
        </div>
    );
}