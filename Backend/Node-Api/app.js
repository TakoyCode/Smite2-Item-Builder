// Setting up express
const express = require('express');
const app = express();
app.use(express.json());

// Importing Joi
const Joi = require('joi');

// Importing database
const { sql } = require('./db');

//  --- HTTP metods---
app.get('/api/items', (req, res) => {
    const request = new sql.Request();
    // Get all items
    request.query('select * from Items', (error, result) => {
        // Checks for errors
        if (error) return res.status(400).send(error.message);

        // Sends back all items
        res.send(result.recordset);
    });
});

app.get('/api/consumables', (req, res) => {
    const request = new sql.Request();
    // Get all items
    request.query('select * from Consumables', (error, result) => {
        // Checks for errors
        if (error) return res.status(400).send(error.message);

        // Sends back all items
        res.send(result.recordset);
    });
});

app.get('/api/items/:id', (req, res) => {
    const request = new sql.Request();
    // Finds user
    request.query(`select * from Items where Id = ${req.params.id}`, (error, result) => {
        // Checks for errors / or if we didn't find a user with the id
        if (error) return res.status(400).send(error.message);
        if (result.rowsAffected <= 0) return res.status(204).send('Could not find user.');

        // Sends back found user
        res.send(result.recordset[0]);
    });
});

app.get('/api/consumables/:id', (req, res) => {
    const request = new sql.Request();
    // Finds user
    request.query(`select * from Consumables where Id = ${req.params.id}`, (error, result) => {
        // Checks for errors / or if we didn't find a user with the id
        if (error) return res.status(400).send(error.message);
        if (result.rowsAffected <= 0) return res.status(204).send('Could not find user.');

        // Sends back found user
        res.send(result.recordset[0]);
    });
});

app.post('/api/items', (req, res) => {
    // Validates the data
    const { error } = ValidateItem(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const item = Object.entries(req.body)
    let sqlKeyStr = "";
    let sqlValueStr = "";
    item.forEach(([k, v], i) => {
        sqlKeyStr += `${i == 0 ? "" : ","}${k}`
        sqlValueStr += `${i == 0 ? "" : ","}'${v}'`
    });

    // Create new user in users table
    const request = new sql.Request();
    request.query(`INSERT INTO Items(${sqlKeyStr}) OUTPUT INSERTED.* VALUES (${sqlValueStr})`, (error, result) => {
        // Checks for error
        if (error) return res.status(400).send(error.message);

        // Sends the inputed user back
        // console.log(result)
        res.status(201).send(result.recordset);
    });
});

// app.put('/api/items/:id', (req, res) => {
//     // Validates the data
//     const { error } = ValidateItem(req.body);
//     if (error) return res.status(400).send(error.details[0].message);

//     // Deconstructs the data gotten from the req.body
//     const { Name, Age, Email } = req.body;

//     const request = new sql.Request();
//     // Check if we got a user with same id
//     request.query(`select * from users where Id = ${req.params.id}`, (error, result) => {
//         // Checks for errors / or if we didn't find a user with the id
//         if (error) return res.status(400).send(error.message);
//         if (result.rowsAffected <= 0) return res.status(204).send('Could not find user.');

//         // Update user
//         request.query(`UPDATE users SET Name = '${Name}', Age = ${Age}, Email = '${Email}' OUTPUT inserted.*, 
//                         inserted.ID as old_ID, deleted.Name as old_Name, deleted.Age as old_Age, deleted.Email as old_Email Where ID = ${req.params.id};`,
//             (error, result) => {
//                 if (error) return res.status(400).send(error.message);
//                 // Sends updated user back
//                 res.send(result.recordset[0]);
//             });
//     });
// });

app.delete('/api/items/:id', (req, res) => {
    const request = new sql.Request();
    // Find user
    request.query(`select * from Items where Id = ${req.params.id}`, (error, result) => {
        // Checks for errors / or if we didn't find a user with the id
        if (error) return res.status(400).send(error.message);
        if (result.rowsAffected <= 0) return res.status(204).send('Could not find item.');

        // Delete user
        request.query(`DELETE FROM Items OUTPUT DELETED.* Where ID = ${parseInt(req.params.id)};`, (error, result) => {
            if (error) return res.status(400).send(error.message);
            // Sends back deleted user
            res.send(result.recordset[0]);
        });
    });
});

app.delete('/api/consumables/:id', (req, res) => {
    // Find user
    request.query(`select * from Consumables where Id = ${req.params.id}`, (error, result) => {
        // Checks for errors / or if we didn't find a user with the id
        if (error) return res.status(400).send(error.message);
        if (result.rowsAffected <= 0) return res.status(204).send('Could not find consumable.');

        // Delete user
        request.query(`DELETE FROM Consumables OUTPUT DELETED.* Where ID = ${parseInt(req.params.id)};`, (error, result) => {
            if (error) return res.status(400).send(error.message);
            // Sends back deleted user
            res.send(result.recordset[0]);
        });
    });
});

// Using Joi to check if received data is valid
function ValidateItem(item) {
    const schema = Joi.object({
        Name: Joi.string().required(),
        Tier: Joi.number().required(),
        GoldCost: Joi.number().required(),
        Strength: Joi.number(),
        Intelligence: Joi.number(),
        AttackSpeed: Joi.number(),
        Lifesteal: Joi.number(),
        CriticalChance: Joi.number(),
        Penetration: Joi.number(),
        PhysicalProtection: Joi.number(),
        MagicalProtection: Joi.number(),
        MaxHealth: Joi.number(),
        HealthRegen: Joi.number(),
        MaxMana: Joi.number(),
        ManaRegen: Joi.number(),
        CooldownRate: Joi.number(),
        Passive: Joi.string(),
        Active: Joi.string(),
    });
    return schema.validate(item);
}

function ValidateConsumable(consumable) {
    const schema = Joi.object({
        Name: Joi.string().required(),
        GoldCost: Joi.number().required(),
        Active: Joi.string().required(),
    });
    return schema.validate(item);
}

module.exports = { app };