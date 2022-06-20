const connection = require("./db-config");
const express = require("express");
const app = express();

const port = process.env.PORT ?? 3000;

connection.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
  } else {
    console.log("connected as id " + connection.threadId);
  }
});

app.use(express.json());

// QUETE EXPRESS 3 méthode POST :
// ROUTE POUR MOVIES :

app.get("/api/movies", (req, res) => {
  connection.query("SELECT * FROM movies", (err, result) => {
    if (err) {
      res.status(500).send("Error retrieving data from database");
    } else {
      res.json(result);
    }
  });
});

// INSERTION DE NOUVELLES DONNEES DANS LA BDD :
app.post("/api/movies", (req, res) => {
  const { title, director, year, color, duration } = req.body;
  connection.query(
    "INSERT INTO movies (title, director, year, color, duration) VALUES (?, ?, ?, ?, ?)",
    [title, director, year, color, duration],
    (err, result) => {
      if (err) {
        res.status(500).send("Error saving the movie");
      } else {
        res.status(200).send("Movie successfully saved");
      }
    }
  );
});

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});

// ROUTE POUR UTILISATEURS (exercice):

app.get("/api/users", (req, res) => {
  connection.query("SELECT * FROM utilisateurs", (err, result) => {
    if (err) {
      res.status(500).send("Error retrieving data from database");
    } else {
      res.json(result);
    }
  });
});

// INSERTION DE NOUVELLES DONNEES DANS LA BDD :
app.post("/api/users", (req, res) => {
  const { firstname, lastname, email } = req.body;
  connection.query(
    "INSERT INTO movies (firstname, lastname, email) VALUES (?, ?, ?, ?, ?)",
    [firstname, lastname, email],
    (err, result) => {
      if (err) {
        res.status(500).send("Error saving the user");
      } else {
        res.status(200).send("User successfully saved");
      }
    }
  );
});

// GESTIONNAIRE D'ERREURS :
app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});

// QUETE EXPRESS 4 méthode PUT :

//PUT POUR UTILISATEURS : 

// L'ID de la ressource que l'on veut modifier est passée en tant que paramètre de route (`req.params`)
app.put('/api/users/:userId', (req, res) => {
  const { userId } = req.params;
  console.log(userId);
});

// RECUPERATION DES NOUVELLES DONNEES :
const userPropsToUpdate = req.body;

// CHANGEMENT DES DONNEES :
UPDATE users
SET
  lastname='something',
  firstname='something',
  email='something'
WHERE id=123;

// ASSEMBLAGE DU TOUT :
// Cette route va mettre à jour un utilisateur en BdD
app.put('/api/users/:userId', (req, res) => {
  // On récupère l'id depuis les paramètres de la requête
  const { userId } = req.params;
  // On récupère les nouvelles valeurs depuis le corps de notre requête
  const userPropsToUpdate = req.body;
  // On envoie une requête UPDATE à notre BdD
  connection.query(
    'UPDATE users SET ? WHERE id = ?',
    [userPropsToUpdate, userId],
    (err) => {
      // Une fois la requête exécutée, on peut répondre à la requête HTTP
      if (err) {
        console.log(err);
        res.status(500).send('Error updating a user');
      } else {
        res.status(200).send('User updated successfully 🎉');
      }
    }
  );
});

//PUT POUR MOVIES (exercice): 

// L'ID de la ressource que l'on veut modifier est passée en tant que paramètre de route (`req.params`)
app.put('/api/users/:moviesId', (req, res) => {
  const { movies} = req.params;
  console.log(movies);
});

// RECUPERATION DES NOUVELLES DONNEES :
const moviesPropsToUpdate = req.body;

// CHANGEMENT DES DONNEES :
UPDATE movies
SET
  title = 'something',
  director ='something',
  year ='something',
  color ='something',
  duration ='something'
WHERE id=42;

// ASSEMBLAGE DU TOUT :
// Cette route va mettre à jour un film en BdD
app.put('/api/users/:moviesId', (req, res) => {
  // On récupère l'id depuis les paramètres de la requête
  const { moviesId } = req.params;
  // On récupère les nouvelles valeurs depuis le corps de notre requête
  const moviesPropsToUpdate = req.body;
  // On envoie une requête UPDATE à notre BdD
  connection.query(
    'UPDATE users SET ? WHERE id = ?',
    [moviesPropsToUpdate, moviesId],
    (err) => {
      // Une fois la requête exécutée, on peut répondre à la requête HTTP
      if (err) {
        console.log(err);
        res.status(500).send('Error updating a user');
      } else {
        res.status(200).send('User updated successfully 🎉');
      }
    }
  );
});

// QUETE EXPRESS 5 méthode DELETE :

// DELETE POUR USERS :

// L'ID est passée en tant que paramètre de la route
app.delete("/api/users/:id", (req, res) => {
  const userId = req.params.id; 
});

// Suppression de la donnée et envoi de la réponse au client :
app.delete('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  connection.query(
    'DELETE FROM users WHERE id = ?',
    [userId],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('😱 Error deleting an user');
      } else {
        res.sendStatus(204);
      }
    }
  );
});

// DELETE POUR MOVIES (exercice):

// L'ID est passée en tant que paramètre de la route
app.delete("/api/movies/:id", (req, res) => {
  const moviesId = req.params.id; 
});

// Suppression de la donnée et envoi de la réponse au client :
app.delete('/api/movies/:id', (req, res) => {
  const moviesId = req.params.id;
  connection.query(
    'DELETE FROM movies WHERE id = ?',
    [moviesId],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('😱 Error deleting a movie !');
      } else {
        res.sendStatus(204);
      }
    }
  );
});

// QUETE EXPRESS 6 méthode GET avancée :

// GET pour users :

// Trouver un utilisateur spécifique :
app.get('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  connection.query(
    'SELECT * FROM users WHERE id = ?',
    [userId],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error retrieving a user from database');
      } else {
        res.json(result[0]);
      }
    }
  );
});

// Afficher un message d'erreur si la ressource demandée n'existe pas :
app.get('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  connection.query(
    'SELECT * FROM users WHERE id = ?',
    [userId],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error retrieving users from database');
      } else if (result.length === 0) {
        res.status(404).send("User not found");
      } else {
        res.json(result[0]);
      }
    }
  );
});

// Filtrer une liste avec la méthode req.query :
// stocker la requête SQL dans une variable (avec let car elle est susceptible d'être modifiée),
// déclarer un tableau vide, qui peut contenir des valeurs à passer à cette requête.

app.get('/api/users', (req, res) => {
  let sql = 'SELECT * FROM users';
  const sqlValues = [];
  connection.query(sql, sqlValues, (err, result) => {
    if (req.query.language) {
      sql += ' WHERE language = ?';
      sqlValues.push(req.query.language);
    } else {
      res.json(result);
    }
  });
});

// GET pour movies (exercice) :
// Trouver un utilisateur spécifique :
app.get('/api/movies/:id', (req, res) => {
  const movieId = req.params.id;
  connection.query(
    'SELECT * FROM movies WHERE id = ?',
    [movieId],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error retrieving a movie from database');
      } else {
        res.json(result[0]);
      }
    }
  );
});

// Afficher un message d'erreur si la ressource demandée n'existe pas :
app.get('/api/movies/:id', (req, res) => {
  const movieId = req.params.id;
  connection.query(
    'SELECT * FROM movies WHERE id = ?',
    [movieId],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error retrieving movies from database');
      } else if (result.length === 0) {
        res.status(404).send("Movie not found");
      } else {
        res.json(result[0]);
      }
    }
  );
});

// Filtrer une liste avec la méthode req.query :
// stocker la requête SQL dans une variable (avec let car elle est susceptible d'être modifiée),
// déclarer un tableau vide, qui peut contenir des valeurs à passer à cette requête.

// POUR COLOR :
app.get('/api/movies', (req, res) => {
  let sql = 'SELECT * FROM movies';
  const sqlValues = [];
  connection.query(sql, sqlValues, (err, result) => {
    if (req.query.language) {
      sql += ' WHERE color = ?color=1';
      sqlValues.push(req.query.color);
    } else {
      res.json(result);
    }
  });
});

// POUR MAX_DURATION :
app.get('/api/movies', (req, res) => {
  let sql = 'SELECT * FROM movies';
  const sqlValues = [];
  connection.query(sql, sqlValues, (err, result) => {
    if (req.query.max_duration) {
      sql += ' WHERE max_duration = ?max_duration=150 ;
      sqlValues.push(req.query.max_duration);
    } else {
      res.json(result);
    }
  });
});

// QUETE EXPRESS 7 méthodes POST et PUT avancées :

// POST pour users :
app.post("/api/users", (req, res) => {
  const { firstname, lastname, email } = req.body;
  connection.query(
    "INSERT INTO users (firstname, lastname, email) VALUES (?, ?, ?)",
    [firstname, lastname, email],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error saving the user");
      } else {
        const id = result.insertId;
        const createdUser = { id, firstname, lastname, email };
        res.status(201).json(createdUser);
      }
    }
  );
});

//PUT pour users :
app.put("/api/users/:id", (req, res) => {
  const userId = req.params.id;
  const userPropsToUpdate = req.body;
  connection.query(
    "UPDATE users SET ? WHERE id = ?",
    [userPropsToUpdate, userId],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error updating a user");
      } else if (result.affectedRows === 0) {
        res.status(404).send(`User with id ${userId} not found.`);
      } else {
        res.sendStatus(204);
      }
    }
  );
});

// POST pour movies : (exercice) :
app.post("/api/movies", (req, res) => {
  const { title, director, year, color, duration } = req.body;
  connection.query(
    "INSERT INTO movies (title, director, year, color, duration) VALUES (?, ?, ?, ?, ?)",
    [title, director, year, color, duration],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error saving the movie");
      } else {
        res.status(201).send("Movie successfully saved = Requête réussie et ressource créée !");
      }
    }
  );
});

// PUT pour movies (exercice) :
app.put("/api/movies/:id", (req, res) => {
  const movieId = req.params.id;
  const moviePropsToUpdate = req.body;
  connection.query(
    "UPDATE movies SET ? WHERE id = ?",
    [moviePropsToUpdate, movieId],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(404).send("Movie not found");
      } else {
        res.status(204).send("Movie updated successfully 🎉 = requête réussie mais ne change pas l'affichage de la page donc le client n'a pas besoin de changer de page.");
      }
    }
  );
});

// QUETE EXPRESS 8 : Gestion des erreurs 

const connection = require('./db-config');
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

connection.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack);
  } else {
    console.log('connected as id ' + connection.threadId);
  }
});

app.use(express.json());

app.get('/api/movies', (req, res) => {
  let sql = 'SELECT * FROM movies';
  const sqlValues = [];
  if (req.query.color) {
    sql += ' WHERE color = ?';
    sqlValues.push(req.query.color);
  }
  if (req.query.max_duration) {
    if (req.query.color) sql += ' AND duration <= ? ;';
    else sql += ' WHERE duration <= ?';

    sqlValues.push(req.query.max_duration);
  }

  connection.query(sql, sqlValues, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error retrieving movies from database');
    } else {
      res.json(results);
    }
  });
});

app.get('/api/movies/:id', (req, res) => {
  const movieId = req.params.id;
  connection.query(
    'SELECT * FROM movies WHERE id = ?',
    [movieId],
    (err, results) => {
      if (err) {
        res.status(500).send('Error retrieving movie from database');
      } else {
        if (results.length) res.json(results[0]);
        else res.status(404).send('Movie not found');
      }
    }
  );
});

app.get('/api/users', (req, res) => {
  let sql = 'SELECT * FROM users';
  const sqlValues = [];
  if (req.query.language) {
    sql += ' WHERE language = ?';
    sqlValues.push(req.query.language);
  }
  connection.query(sql, sqlValues, (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving users from database');
    } else {
      res.json(results);
    }
  });
});

app.get('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  connection.query(
    'SELECT * FROM users WHERE id = ?',
    [userId],
    (err, results) => {
      if (err) {
        res.status(500).send('Error retrieving user from database');
      } else {
        if (results.length) res.json(results[0]);
        else res.status(404).send('User not found');
      }
    }
  );
});

app.post('/api/movies', (req, res) => {
  const { title, director, year, color, duration } = req.body;
  connection.query(
    'INSERT INTO movies (title, director, year, color, duration) VALUES (?, ?, ?, ?, ?)',
    [title, director, year, color, duration],
    (err, result) => {
      if (err) {
        res.status(500).send('Error saving the movie');
      } else {
        const id = result.insertId;
        const createdMovie = { id, title, director, year, color, duration };
        res.status(201).json(createdMovie);
      }
    }
  );
});

const Joi = require('joi');

const { firstname, lastname, email, title, director, year, color } = req.body;

const { error } = Joi.object({
  duration: Joi.int.required(),
  color: Joi.bool.required(),
  year: Joi.number.max>=1888,
  director: Joi.string.max(255).required(),
  title: Joi.string.max(255).required(),
  email: Joi.string().email().max(255).required(),
  firstname: Joi.string().max(255).required(),
  lastname: Joi.string().max(255).required(),
}).validate({ firstname, lastname, email, title, director, year, color, duration }, { abortEarly: false });

if (error) {
  res.status(422).json({ validationErrors: error.details });
} else {
  app.post('/api/users', (req, res) => {
    const { firstname, lastname, email } = req.body;
    connection.query(
      'INSERT INTO users (firstname, lastname, email) VALUES (?, ?, ?)',
      [firstname, lastname, email],
      (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error saving the user');
        } else {
          const id = result.insertId;
          const createdUser = { id, firstname, lastname, email };
          res.status(201).json(createdUser);
        }
      }
    );
  });
}

app.put('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  const db = connection.promise();
  let existingUser = null;
  db.query('SELECT * FROM users WHERE id = ?', [userId])
    .then(([results]) => {
      existingUser = results[0];
      if (!existingUser) return Promise.reject('RECORD_NOT_FOUND');
      return db.query('UPDATE users SET ? WHERE id = ?', [req.body, userId]);
    })
    .then(() => {
      res.status(200).json({ ...existingUser, ...req.body });
    })
    .catch((err) => {
      console.error(err);
      if (err === 'RECORD_NOT_FOUND')
        res.status(404).send(`User with id ${userId} not found.`);
      else res.status(500).send('Error updating a user');
    });
});

app.put('/api/movies/:id', (req, res) => {
  const movieId = req.params.id;
  const db = connection.promise();
  let existingMovie = null;
  db.query('SELECT * FROM movies WHERE id = ?', [movieId])
    .then(([results]) => {
      existingMovie = results[0];
      if (!existingMovie) return Promise.reject('RECORD_NOT_FOUND');
      return db.query('UPDATE movies SET ? WHERE id = ?', [req.body, movieId]);
    })
    .then(() => {
      res.status(200).json({ ...existingMovie, ...req.body });
    })
    .catch((err) => {
      console.error(err);
      if (err === 'RECORD_NOT_FOUND')
        res.status(404).send(`Movie with id ${movieId} not found.`);
      else res.status(500).send('Error updating a movie.');
    });
});

app.delete('/api/users/:id', (req, res) => {
  connection.query(
    'DELETE FROM users WHERE id = ?',
    [req.params.id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error deleting an user');
      } else {
        if (result.affectedRows) res.status(200).send('🎉 User deleted!');
        else res.status(404).send('User not found.');
      }
    }
  );
});

app.delete('/api/movies/:id', (req, res) => {
  const movieId = req.params.id;
  connection.query(
    'DELETE FROM movies WHERE id = ?',
    [movieId],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error deleting a movie');
      } else {
        if (result.affectedRows) res.status(200).send('🎉 Movie deleted!');
        else res.status(404).send('Movie not found');
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});