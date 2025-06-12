const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token").status(200).json({ success: true, message: "Logout successful" });
    } catch (error) {
        console.error("Error in logoutUser:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

module.exports = logoutUser;