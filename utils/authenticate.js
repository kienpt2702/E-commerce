const passport = require('passport');
const {User} = require("../database/models/user.model");
const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require("./config.util");
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const {ExtractJwt} = require("passport-jwt");
const ApiError = require("./ApiError");
const {ACTIVE, ADMIN} = require('./constants.util');

// options for jwt authentication
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET_KEY,
};

passport.use(new LocalStrategy(User.authenticate()));

passport.use(new JwtStrategy(options, async (payload, done) => {
    const user = await User.findById({_id: payload._id});
    return user ? done(null, user) : done(null, false);
}));

exports.verifyUsernamePassword = (req, res, next) => {
    passport.authenticate('local', {}, (err, user, info) => {
        if (err) return next(err);
        if (!user) return next(ApiError.unauthorized(info));
        req.user = user;
        next();
    })(req, res, next);
};

exports.verifyJWT = passport.authenticate('jwt', {session: false});

exports.getToken = (user) => {
    return jwt.sign(user, SECRET_KEY, {expiresIn: 3600});
};

const checkRole = (rolesList, allowedRoleList) => {
    for(const roleRecord of rolesList) {
        const {name} = roleRecord.roleID;
        if(roleRecord.status === ACTIVE && allowedRoleList.includes(name)) {
            return true;
        }
    }

    return false;
}

exports.verifyRole = (allowedRoleList) => {
    return async (req, res, next) => {
        await req.user.populate({
            path: 'rolesList',
            populate: {
                path: 'roleID',
                model: 'Role',
                select: ['name']
            },
            // match: {status: 'ACTIVE'},
            select: ['status', 'reason'],
        });
        const allowed = checkRole(req.user.rolesList, allowedRoleList);

        if(!allowed) {
            next(ApiError.unauthorized(`NOT ${allowedRoleList}`));
        }
        else {
            next();
        }
    }
}