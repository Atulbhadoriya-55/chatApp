import jwt from "jsonwebtoken";

const genToken = async (userId, res) => {
    let token;
    try {
        token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
        console.log("Token is generated");
    } catch (error) {
        console.log("Token is not generated");
        throw error; // rethrow so caller knows it failed
    }

    res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: process.env.MODE_ENV === "development" ? "none" : "lax", // safer defaults
        secure: process.env.MODE_ENV !== "development",
    });

    return token;
};

export default genToken;