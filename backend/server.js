const express = require("express");
const shortid = require("shortid");
const mysql = require("mysql2");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})

db.connect(err => {
    if (err) {
        console.log("Error connecting to DB", err);
        return;
    }
    console.log("Connected to DB");
});

app.get('/app', async (req, res) => {
    db.query('SELECT * FROM url', (err, results) => {
        if (err) {
            console.log("Error");
            return;
        } else {
            res.json(results);
        }
    });
})


app.post("/short", async (req, res) => {
    const fullUrl = req.body.urlOriginal;
    const base = `http://localhost:3333/api`;
    db.query('SELECT * FROM `url` WHERE `fullUrl` = ?', fullUrl, (error, results) => {
        if (error) {
            console.log("we got error");
            res.status(500).send({ error: 'Error fetching URL from database' });
            return;
        }
        if (results.length === 0) {
            const short = shortid.generate();
            const url = { fullUrl: fullUrl, shortUrl: `${base}/${short}`, counts: 1 };
            db.query('INSERT INTO `url` SET ?', url, (err, result) => {
                if (err) {
                    console.log("Error creating table");
                    res.status(500).send({ error: 'Error creating URL in database' });
                    return;
                }
                res.json(results)
            });
        } else {
            const _short = results[0].shortUrl;
            const _counts = results[0].counts;
            db.query('UPDATE `url` SET `counts` = ? WHERE `shortUrl` = ?', [_counts + 1, _short], (err, result) => {
                if (err) {
                    console.log("Error updating table");
                    res.status(500).send({ error: 'Error updating URL in database' });
                    return;
                }
                res.json(results)
            });
        }
    });
});


app.delete("/app/:id", async (req, res) => {
    const id = req.params.id;
    try {
        db.query('DELETE FROM url WHERE id = ?', id);
    } catch (error) {
        console.error("Error deleting URL:", error);
        res.status(500).json({ error: "Failed to delete URL" });
    }
});

app.get("/api/:shortUrl", async (req, res) => {
    const base = `http://localhost:3333/api`;
    try {
        const shortUrl = req.params.shortUrl;
        const finalurl = `${base}/${shortUrl}`
        db.query('SELECT * FROM `url` WHERE `shortUrl` = ?', finalurl, (error, results) => {
            if (error) {
                console.log("Error:", error);
                return res.status(500).json("Server Error");
            } else {
                if (results.length > 0) {
                    const url = results[0];
                    url.counts++;
                    db.query('UPDATE `url` SET `counts` = ? WHERE `shortUrl` = ?', [url.counts, finalurl], (updateError, updateResult) => {
                        if (updateError) {
                            console.log("Error updating count:", updateError);
                            return res.status(500).json("Server Error");
                        }
                        return res.redirect(url.fullUrl);
                    });
                } else {
                    res.status(404).json("Not found");
                }
            }
        });
    } catch (err) {
        console.log("Catch block error:", err);
        res.status(500).json("Server Error");
    }
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`Server is running at PORT: ${PORT}`);
});







