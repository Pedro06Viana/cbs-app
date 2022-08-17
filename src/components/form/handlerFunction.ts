/* async function handlerLogin(nif, password) {
  try {
    // Adicionar Schema
    const body = {
      nif: +nif,
      password: password,
    };

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        Router.push("/");
      } else {
        criarErro(await res.text());
      }
    } catch (error) {
      console.error("An unexpected error happened occurred:", error);
      criarErro(error.message);
    }
  } catch (error) {
    criarErro(error?.message ?? "Ocorreu um erro inesperado!");
  }
}
 */
interface RegisterProps {
  nome: string
  posto: number
  nib: number
  nif: number
  roles: number
  password: string
}
function handlerRegister(props: RegisterProps): any {
  // Adicionar Schema
  const body = {
    nome: props.nome,
    posto: +props.posto,
    nib: +props.nib,
    nif: +props.nif,
    roles: +props.roles,
    password: props.password,
  };

  async function request() {
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        return { status: 200, message: "Utilizador Criado" }
      } else {
        const { message } = await res.json();
        if (res.status === 409) {
          return { status: 409, message }
        }
      }
    } catch (error) {
      console.error("An unexpected error happened occurred:", error);
      return { status: 500, message: error.message }
    }
  }
  return request()
}

export { handlerRegister };
