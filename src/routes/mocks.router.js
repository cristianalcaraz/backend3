import { Router } from 'express';
import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

const router = Router();

const generateHashedPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

const generateMockUsers = async (numUsers = 50) => {
    const users = [];
    for (let i = 0; i < numUsers; i++) {
        const hashedPassword = await generateHashedPassword('coder123');
        users.push({
            id: faker.database.mongodbObjectId(),
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: hashedPassword,
            role: faker.helpers.arrayElement(['user', 'admin']),
            pets: [],
            createdAt: faker.date.past(),
            updatedAt: faker.date.recent()
        });
    }
    return users;
};

const generateMockPets = (numPets = 10) => {
    const pets = [];
    for (let i = 0; i < numPets; i++) {
        pets.push({
            id: faker.database.mongodbObjectId(),
            name: faker.animal.type(),
            species: faker.animal.type(),
            adopted: faker.datatype.boolean()
        });
    }
    return pets;
};

router.get('/mockingusers', async (req, res) => {
    const users = await generateMockUsers(50);
    res.json(users);
});

router.post('/generateData', async (req, res) => {
    const { users = 0, pets = 0 } = req.body;
    const generatedUsers = await generateMockUsers(users);
    const generatedPets = generateMockPets(pets);
    res.json({
        message: 'Data generated successfully',
        users: generatedUsers.length,
        pets: generatedPets.length
    });
});

export default router;
