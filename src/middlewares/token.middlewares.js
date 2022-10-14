
function validateToken(req, res, next){
    const token = req.headers.authorization.replace('Bearer ', '');
    if(!token || token === 'Bearer') return res.status(STATUS_CODE.UNAUTHORIZED).send(MESSAGES.TOKEN_NOT_FOUND);
    res.locals.token = token;
    next();
}

export { validateToken };