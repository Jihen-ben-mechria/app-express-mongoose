const jwt = require('jsonwebtoken'); 

const authentication = (req, res, next) => {
    try {
        const token = req.header("Authorization"); // ✅ Corrigé : "Authorization"
        if (!token) {
            return res.status(401).send({ error: "Not authorized" });
        }

        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.SECRET_KEY); // ✅ Corrigé : bon placement de SECRET_KEY
        req.user = decoded;

        next(); // ✅ Passe au prochain middleware
    } catch (error) {
        res.status(401).send({ error: "Invalid token" });
    }
};

module.exports = authentication; // ✅ Vérifie bien que tu exportes le middleware
