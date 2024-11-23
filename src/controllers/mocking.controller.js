import { usersService } from "../services/index.js";
import { generateUsers } from "../utils/index.js";
const getUserMocking = (req, res) => {
    const { count } = req.query;
    if (!count || isNaN(count)) {
        return res.status(404).send({ message: "Invalid count parameter" });
    }
    const users = generateUsers(count);
    res.send({ message: "done", payload: users });
};
const generateData = async (req, res) => {
    const { countUsers, countPets } = req.body;
    if (!countUsers || isNaN(countUsers) || !countPets || isNaN(countPets)) {
        return res.status(404).send({ message: "Invalid parameters" });
    }
    const users = generateUsers(countUsers);
    try {
        for (const user of users) {
            await usersService.create(user);
        }
    } catch (e) {
        return res.status(404).send({ message: "Error creating users" });
    }
    res.send({ message: "Users and pets created successfully", payload: users });
};
export default {
    getUserMocking,
    generateData
};
