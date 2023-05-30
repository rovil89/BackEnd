export const generateUserErrorParam = (userId) => {
    return `
        El user Id no es valido, debe ser un calor numerico, pero se recibio${userId}
    `
}