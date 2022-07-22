interface ValidationDTO {
  name?: string | null;
  email: string;
  password: string;
  signup: boolean;
}

export function validation({ name, email, password, signup }: ValidationDTO) {
  const validationErrors = {
    name: '',
    email: '',
    password: ''
  };

  if (!name && signup) {
    validationErrors.name = "Nome é obrigatório.";
  }

  if (!email) {
    validationErrors.email = "Email é obrigatório.";
  } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    validationErrors.email = "Email invalido."
  }

  if (!password) {
    validationErrors.password = "Senha é obrigatória.";
  } else if (password.length < 6 && signup) {
    validationErrors.password = "A senha deve conter 6 ou mais caracteres."
  }

  if(Object.values(validationErrors).some(error => error !== '')) {
    return validationErrors
  } else {
    return null
  }
}
