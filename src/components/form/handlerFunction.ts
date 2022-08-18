interface LoginProps {
  nif: number
  password: string
}
function handlerLogin(props: LoginProps): any {
  // Adicionar Schema
  const body = {
    nif: +props.nif,
    password: props.password,
  };

  async function resquest() {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        return { status: 200, message: "Login com Sucesso" }
      } else if (res.status === 401) {
        const { message } = await res.json();
        return { status: 401, message }
      } else {
        const { message } = await res.json();
        return { status: 500, message }
      }
    } catch (error) {
      console.error("An unexpected error happened occurred:", error);
      return { status: 500, message: error.message }
    }
  }
  return resquest()
}

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
        } else {
          return { status: 500, message }
        }
      }
    } catch (error) {
      console.error("An unexpected error happened occurred:", error);
      return { status: 500, message: error.message }
    }
  }
  return request()
}

export { handlerLogin, handlerRegister };
