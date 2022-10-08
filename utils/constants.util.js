const roles = {
    USER: 'USER',
    ADMIN: 'ADMIN',
}

const errors = {
    ROLE_DOES_NOT_EXIST: 'ROLE DOES NOT EXIST',
    ROLE_ALREADY_EXIST: 'ROLE ALREADY EXIST',
    UNAUTHORIZED: 'UNAUTHORIZED',
    USER_NOT_FOUND: 'USER NOT FOUND',

}
module.exports = {...roles, ...errors};