export const generateUserErrorInfo = (user) => {
    return `
        Alguno de los campos para crear el usuario no es valido.
        Lista de campos requeridos :
        first_name : Debe ser un strign, pero se recibio ${user.first_name},
        last_name : Debe ser un strign, pero se recibio ${user.last_name}
        email : Debe ser un strign, pero se recibio ${user.email}
    `
}