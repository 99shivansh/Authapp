var express = require("express");
var router = express.Router();
var CryptoJS = require("crypto-js");
const { pool } = require("../dbConfig");

router.post("/register", async (req, res) => {
  let { firstname,lastname, email, password, password2, country, mobilenumber } = req.body;

  let errors = [];

  console.log({
    firstname,
    lastname,
    email,
    password,
    password2,
    country,
    mobilenumber,
  });

  if (!firstname||!lastname || !email || !password || !password2 || !country || !mobilenumber) {
    errors.push({ message: "Please enter all fields" });
  }

  if (password.length < 6) {
    errors.push({ message: "Password must be a least 6 characters long" });
  }

  if (password !== password2) {
    errors.push({ message: "Passwords do not match" });
  }

  if (errors.length > 0) {
    res.send({ errors, firstname,lastname, email, password, password2 });
  } else {
    var hashedPassword;
    hashedPassword = await CryptoJS.SHA256(password).toString();
    console.log(hashedPassword);
    // Validation passed
    pool.query(
      `SELECT * FROM users
        WHERE email = $1`,
      [email],
      (err, results) => {
        if (err) {
          console.log(err);
        }
        console.log(results.rows);

        if (results.rows.length > 0) {
          return res.send({
            apicall: "register",
            status:"failure",
            message: "Email already registered",
          });
        } else {
          pool.query(
            `INSERT INTO users (firstname,lastname, email, password,country,mobilenumber)
                VALUES ($1, $2, $3 , $4, $5, $6)
                RETURNING id, password`,
            [firstname,lastname, email, hashedPassword, country, mobilenumber],
            (err, results) => {
              if (err) {
                throw err;
              }
              console.log(results.rows);
              res.send({
                apicall: "register",
                status: "success",
                message: "You are now registered. Please log in",
              });
            }
          );
        }
      }
    );
  }
});
router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  console.log(email, password);
  pool.query(
    `SELECT * FROM users WHERE email = $1`,
    [email],
    (err, results) => {
      if (err) {
        throw err;
      }
      console.log(results.rows);

      if (results.rows.length > 0) {
        const user = results.rows[0];

        async function isMatch() {
          var hashedPassword, compare;
          hashedPassword = await CryptoJS.SHA256(password).toString();
          console.log(hashedPassword);
          compare = await hashedPassword.localeCompare(user.password);
          if (err) {
            console.log(err);
          }
          if (compare == 0) {
            console.log("user found");
            obj1 = {
              apicall: "login",
              status: "success",
              message: "user found logging in",
            };
            obj2 = user;
            obj3 = Object.assign(obj1, obj2);
            res.send(obj3);
          } else {
            //password is incorrect
            res.send({
              apicall: "login",
              status: "failure",
              message: "password incorrrect",
            });
          }
        }
        isMatch();
      } else {
        // No user
        res.send({
          apicall: "login",
          status: "failure",
          message: "no user found ",
        });
      }
    }
  );
 
});
router.post("/getinfo", async (req, res) => 
{
  
  country=req.body.country;
  pool.query(
    `SELECT firstname,lastname,email,country from users
    WHERE country=$1
    ORDER BY lastname;
    `,
    [country],
    (err, results) => 
    {
      if (err) {
        throw err;
      }      
      info=results.rows;
      console.log(info);
      res.send(info);
    
    }
    );
  
}
);
module.exports = router;
