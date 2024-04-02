const express = require("express");
const db = require('./database');
const shortid = require("shortid");

const urls = express();
urls.use(express.json())


urls.get('/app', async (req, res) => {
    db.query('SELECT * FROM url', (err, results) => {
        if (err) {
            console.log("Error");
            return;
        } else {
            res.json(results);
        }
    });
})


urls.post("/short", async (req, res) => {
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

urls.get("/app/:fullUrl", async (req, res) => {
    console.log(req.params.fullUrl);
    try {
        const fullUrl = req.params.fullUrl;
        db.query('SELECT * FROM `url` WHERE `fullUrl` = ?', fullUrl, (error, results) => {
            if (error) {
                console.log("Error:", error);
                return res.status(500).json("Server Error");
            } else {
                if (results.length > 0) {

                    res.send(results[0]);
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


urls.delete("/app/:id", async (req, res) => {
    const id = req.params.id;
    try {
        db.query('DELETE FROM url WHERE id = ?', id);
    } catch (error) {
        console.error("Error deleting URL:", error);
        res.status(500).json({ error: "Failed to delete URL" });
    }
});

//Esto es lo que usaré para hacer el redirect del acortamiento a la URL real
urls.get("/api/:shortUrl", async (req, res) => {
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

module.exports = urls;