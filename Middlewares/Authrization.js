const JWT = require("jsonwebtoken");

exports.isAuthorized = (req, res, next) => {
    try {
        if (!req.headers['authorization']) {
            next('Not Authenticated');
        }
        let token = req.headers['authorization'].split(' ')[1];
        let decodedToken = JWT.verify(token, process.env.SECRET_KEY);
        req.token = decodedToken;
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Not Authenticated" }
        );
    }
}

exports.isAdmin = (req, res, next) => {
    if (req.token.role === "admin") {
        next();
    } else {
        res.status(401).json({ message: "Auth failed not admin" });
    }
};

exports.isTeacher = (req, res, next) => {
    if (req.token.role === "teacher") {
        next();
    } else {
        res.status(401).json({ message: "Auth failed not teacher" });
    }
};