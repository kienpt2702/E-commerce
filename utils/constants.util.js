const roles = {
    USER: 'USER',
    ADMIN: 'ADMIN',
    ALL: ['USER', 'ADMIN']
}

const errors = {
    ROLE_DOES_NOT_EXIST: 'ROLE DOES NOT EXIST',
    ROLE_ALREADY_EXIST: 'ROLE ALREADY EXIST',
    UNAUTHORIZED: 'UNAUTHORIZED',
    USER_NOT_FOUND: 'USER NOT FOUND',
}
const status = {
    ACTIVE: 'ACTIVE',
    PENDING: 'PENDING',
    INACTIVE: 'INACTIVE',
}
module.exports = {...roles, ...errors, ...status};