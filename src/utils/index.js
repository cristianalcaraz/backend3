import bcrypt from 'bcrypt';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { faker } from '@faker-js/faker';

export const createHash = async (password) => {
    const salts = await bcrypt.genSalt(50);
    return bcrypt.hash(password, salts);
};

export const passwordValidation = async (user, password) => {
    return bcrypt.compare(password, user.password);
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const generateUsers = (count = 10) => {
    const users = [];
    for (let i = 0; i < count; i++) {
        const user = {
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            role: i % 3 === 0 ? "admin" : "user",
            password: "coder123",
            pets: []
        };
        users.push(user);
    }
    return users;
};

export default __dirname;
