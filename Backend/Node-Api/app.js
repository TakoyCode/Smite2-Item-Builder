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
    // Get all consumables
    request.query('select * from Consumables', (error, result) => {
        // Checks for errors
        if (error) return res.status(400).send(error.message);

        // Sends back all consumables
        res.send(result.recordset);
    });
});

app.get('/api/relics', (req, res) => {
    const request = new sql.Request();
    // Get all relics
    request.query('select * from Relics', (error, result) => {
        // Checks for errors
        if (error) return res.status(400).send(error.message);

        // Sends back all relics
        res.send(result.recordset);
    });
});

app.get('/api/items/:id', (req, res) => {
    const request = new sql.Request();
    // Finds item
    request.query(`select * from Items where Id = ${req.params.id}`, (error, result) => {
        // Checks for errors / or if we didn't find a item with the id
        if (error) return res.status(400).send(error.message);
        if (result.rowsAffected <= 0) return res.status(204).send('Could not find item.');

        // Sends back found item
        res.send(result.recordset[0]);
    });
});

app.get('/api/consumables/:id', (req, res) => {
    const request = new sql.Request();
    // Finds consumable
    request.query(`select * from Consumables where Id = ${req.params.id}`, (error, result) => {
        // Checks for errors / or if we didn't find a consumable with the id
        if (error) return res.status(400).send(error.message);
        if (result.rowsAffected <= 0) return res.status(204).send('Could not find consumable.');

        // Sends back found consumable
        res.send(result.recordset[0]);
    });
});

app.get('/api/relics/:id', (req, res) => {
    const request = new sql.Request();
    // Finds relic
    request.query(`select * from Relics where Id = ${req.params.id}`, (error, result) => {
        // Checks for errors / or if we didn't find a relic with the id
        if (error) return res.status(400).send(error.message);
        if (result.rowsAffected <= 0) return res.status(204).send('Could not find relic.');

        // Sends back found relic
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
        sqlValueStr += `${typeof (v) === 'string' ? `'${v.replace("'", "''")}'` : v}${i == (item.length - 1) ? "" : ","}`
    });

    // Create new item in items table
    const request = new sql.Request();
    request.query(`INSERT INTO Items(${sqlKeyStr}) OUTPUT INSERTED.* VALUES (${sqlValueStr})`, (error, result) => {
        // Checks for error
        if (error) return res.status(400).send(error.message);

        // Sends the inputed item back
        res.status(201).send(result.recordset);
    });
});

app.post('/api/consumables', (req, res) => {
    // Validates the data
    const { error } = ValidateConsumable(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const Consumable = Object.entries(req.body)
    let sqlKeyStr = "";
    let sqlValueStr = "";
    Consumable.forEach(([k, v], i) => {
        sqlKeyStr += `${i == 0 ? "" : ","}${k}`
        sqlValueStr += `${typeof (v) === 'string' ? `'${v.replace("'", "''")}'` : v}${i == (Consumable.length - 1) ? "" : ","}`
    });

    // Create new consumable in consumables table
    const request = new sql.Request();
    request.query(`INSERT INTO Consumables(${sqlKeyStr}) OUTPUT INSERTED.* VALUES (${sqlValueStr})`, (error, result) => {
        // Checks for error
        if (error) return res.status(400).send(error.message);

        // Sends the inputed consumable back
        res.status(201).send(result.recordset);
    });
});

app.post('/api/relics', (req, res) => {
    // Validates the data
    const { error } = ValidateRelic(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const Consumable = Object.entries(req.body)
    let sqlKeyStr = "";
    let sqlValueStr = "";
    Consumable.forEach(([k, v], i) => {
        sqlKeyStr += `${i == 0 ? "" : ","}${k}`
        sqlValueStr += `${typeof (v) === 'string' ? `'${v.replace("'", "''")}'` : v}${i == (Consumable.length - 1) ? "" : ","}`
    });

    // Create new relic in relics table
    const request = new sql.Request();
    request.query(`INSERT INTO Relics(${sqlKeyStr}) OUTPUT INSERTED.* VALUES (${sqlValueStr})`, (error, result) => {
        // Checks for error
        if (error) return res.status(400).send(error.message);

        // Sends the inputed relic back
        res.status(201).send(result.recordset);
    });
});

app.put('/api/items/:id', (req, res) => {
    // Validates the data
    const { error } = ValidateItem(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const item = Object.entries(req.body)
    let sqlInputValuesStr = "";
    let sqlOutputValuesStr = "";
    item.forEach(([k, v], i) => {
        sqlInputValuesStr += `${k} = ${typeof (v) === 'string' ? `'${v.replace("'", "''")}'` : v}${i == (item.length - 1) ? "" : ","}`
        sqlOutputValuesStr += `inserted.${k}, deleted.${k} as old_${k}${i == (item.length - 1) ? "" : ","}`;
    });

    const request = new sql.Request();
    // Check if we got a item with same id
    request.query(`select * from items where Id = ${req.params.id}`, (error, result) => {
        // Checks for errors / or if we didn't find a item with the id
        if (error) return res.status(400).send(error.message);
        if (result.rowsAffected <= 0) return res.status(204).send('Could not find item.');

        // Update item
        request.query(`UPDATE Items SET ${sqlInputValuesStr} OUTPUT ${sqlOutputValuesStr} Where ID = ${req.params.id};`,
            (error, result) => {
                if (error) return res.status(400).send(error.message);
                // Sends updated item back
                res.send(result.recordset[0]);
            });
    });
});

app.put('/api/consumables/:id', (req, res) => {
    // Validates the data
    const { error } = ValidateConsumable(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const consumable = Object.entries(req.body)
    let sqlInputValuesStr = "";
    let sqlOutputValuesStr = "";
    consumable.forEach(([k, v], i) => {
        sqlInputValuesStr += `${k} = ${typeof (v) === 'string' ? `'${v.replace("'", "''")}'` : v}${i == (consumable.length - 1) ? "" : ","}`
        sqlOutputValuesStr += `inserted.${k}, deleted.${k} as old_${k}${i == (consumable.length - 1) ? "" : ","}`;
    });

    const request = new sql.Request();
    // Check if we got a consumable with same id
    request.query(`select * from Consumables where Id = ${req.params.id}`, (error, result) => {
        // Checks for errors / or if we didn't find a consumable with the id
        if (error) return res.status(400).send(error.message);
        if (result.rowsAffected <= 0) return res.status(204).send('Could not find consumable.');

        // Update consumable
        request.query(`UPDATE Consumables SET ${sqlInputValuesStr} OUTPUT ${sqlOutputValuesStr} Where ID = ${req.params.id};`,
            (error, result) => {
                if (error) return res.status(400).send(error.message);
                // Sends updated consumable back
                res.send(result.recordset[0]);
            });
    });
});

app.put('/api/relics/:id', (req, res) => {
    // Validates the data
    const { error } = ValidateRelic(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const relic = Object.entries(req.body)
    let sqlInputValuesStr = "";
    let sqlOutputValuesStr = "";
    relic.forEach(([k, v], i) => {
        sqlInputValuesStr += `${k} = ${typeof (v) === 'string' ? `'${v.replace("'", "''")}'` : v}${i == (relic.length - 1) ? "" : ","}`
        sqlOutputValuesStr += `inserted.${k}, deleted.${k} as old_${k}${i == (relic.length - 1) ? "" : ","}`;
    });

    const request = new sql.Request();
    // Check if we got a relic with same id
    request.query(`select * from Relics where Id = ${req.params.id}`, (error, result) => {
        // Checks for errors / or if we didn't find a relic with the id
        if (error) return res.status(400).send(error.message);
        if (result.rowsAffected <= 0) return res.status(204).send('Could not find relic.');

        // Update relic
        request.query(`UPDATE Relics SET ${sqlInputValuesStr} OUTPUT ${sqlOutputValuesStr} Where ID = ${req.params.id};`,
            (error, result) => {
                if (error) return res.status(400).send(error.message);
                // Sends updated relic back
                res.send(result.recordset[0]);
            });
    });
});


app.delete('/api/items/:id', (req, res) => {
    const request = new sql.Request();
    // Find item
    request.query(`select * from Items where Id = ${req.params.id}`, (error, result) => {
        // Checks for errors / or if we didn't find a item with the id
        if (error) return res.status(400).send(error.message);
        if (result.rowsAffected <= 0) return res.status(204).send('Could not find item.');

        // Delete item
        request.query(`DELETE FROM Items OUTPUT DELETED.* Where ID = ${parseInt(req.params.id)};`, (error, result) => {
            if (error) return res.status(400).send(error.message);
            // Sends back deleted item
            res.send(result.recordset[0]);
        });
    });
});

app.delete('/api/consumables/:id', (req, res) => {
    const request = new sql.Request();
    // Find consumable
    request.query(`select * from Consumables where Id = ${req.params.id}`, (error, result) => {
        // Checks for errors / or if we didn't find a consumable with the id
        if (error) return res.status(400).send(error.message);
        if (result.rowsAffected <= 0) return res.status(204).send('Could not find consumable.');

        // Delete consumable
        request.query(`DELETE FROM Consumables OUTPUT DELETED.* Where ID = ${parseInt(req.params.id)};`, (error, result) => {
            if (error) return res.status(400).send(error.message);
            // Sends back deleted consumable
            res.send(result.recordset[0]);
        });
    });
});

app.delete('/api/relics/:id', (req, res) => {
    const request = new sql.Request();
    // Find relic
    request.query(`select * from Relics where Id = ${req.params.id}`, (error, result) => {
        // Checks for errors / or if we didn't find a relic with the id
        if (error) return res.status(400).send(error.message);
        if (result.rowsAffected <= 0) return res.status(204).send('Could not find relic.');

        // Delete relic
        request.query(`DELETE FROM Relics OUTPUT DELETED.* Where ID = ${parseInt(req.params.id)};`, (error, result) => {
            if (error) return res.status(400).send(error.message);
            // Sends back deleted relic
            res.send(result.recordset[0]);
        });
    });
});

// Using Joi to check if received data is valid
function ValidateItem(item) {
    const schema = Joi.object({
        Name: Joi.string().required(),
        Tier: Joi.number().required(),
        Gold: Joi.number().required(),
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
        Gold: Joi.number().required(),
        Active: Joi.string().required(),
    });
    return schema.validate(consumable);
}

function ValidateRelic(relic) {
    const schema = Joi.object({
        Name: Joi.string().required(),
        Active: Joi.string().required(),
    });
    return schema.validate(relic);
}

module.exports = { app };