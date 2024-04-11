const express = require('express');
const mysql = require('mysql');
const path = require('path');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const app = express();
app.use(express.json());
app.use(cookieParser());

// Serve static files from the parent directory
// app.use(express.static(path.join(__dirname, 'Test')));
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve index.html for login page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Login','login.html'));
});
 
// Serve handle_session.js file
app.get('/handle_session.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'middlewares', 'handle_session.js'));
});
  
// Set up Express to parse request bodies
app.use(express.urlencoded({ extended: true }));

///////////////////////////////// AUTHENTICATION //////////////////////////
// Create a MySQL connection by providong server and database for authentication purpose //
const connection_auth = mysql.createConnection({
    host: 'sql6.freesqldatabase.com',
    user: 'sql6697807',
    password: 'eEHGUaIHIJ',
    database: 'sql6697807'
});
const JWT_SECRET = 'this_is_my_secret_key_which_is_highly_confidential';

connection_auth.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database as id ' + connection_auth.threadId);
});

app.post('/login', (req, res) => {

    // Taking username and password from Login Form and setting it to two variables
    const { username, password } = req.body;
    // Query the database to check if the user details entered in the login form exists in user_details table
    const query = 'SELECT * FROM user_details WHERE loginName = ? AND loginPassword = ?';
    connection_auth.query(query, [username, password], (error, results) => {
        if (error) {
            console.error('Error querying database:', error);
            res.status(500).send('Internal Server Error');
            return;
        }

        // Here results is returning a row datapacket which contains all columns data for specific user
        // If a user with given credentials exists, set connection as global variable and pass the database credentials based on user//
        if (results.length > 0) {
            const user = results[0]; // Fetching user details and storing it to a variable for future use
            // Assuming queryResults is an array of RowDataPacket objects
            for (const row of results) {
                global.serverName = row.serverName;
                global.databaseUser = row.databaseUser;
                global.databasePassword = row.databasePassword;
                global.databaseName = row.databaseName;
            }
            global.connection = mysql.createConnection({
                host: serverName,
                user: databaseUser,
                password: databasePassword,
                database: databaseName
            });

            global.token = jwt.sign({ userId: user.userID }, JWT_SECRET, { expiresIn: '5m' });
            // Save JWT to cookie
            res.cookie('jwt', token, { httpOnly: false, maxAge: 300000 }); // Cookie expires in 1 hour    
            res.redirect('/main_dashboard');

        }
        else {
            res.redirect("/");
        }
    });
});


app.get('/get-variable', (req, res) => {
    res.json({ token });
});

app.use(authenticateToken);

// Set up Express to serve dashboardhtml as the main dashboard page
// Route to serve dashboard after login
app.get('/main_dashboard', (req, res) => {
    res.sendFile(path.join(__dirname,'public' , 'Main_Dashboard', 'main_dashboard.html'));
});

app.get('/main_dashboard/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname,'public','Pre_Admission_Console', 'dashboard.html'));
});

// // Route to serve files under Pre_Admission_Console
// app.get('/dashboard/*', (req, res) => {
//     const filePath = req.params[0];
//     res.sendFile(path.join(__dirname, 'Pre_Admission_Console','ADM_NEW', filePath));
// });

// Route to serve the Age Calculator HTML file
app.get('/main_dashboard/dashboard/age-calculator', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','Pre_Admission_Console', 'age_calculator.html'));
});
// Route to serve the Student Details HTML file
app.get('/main_dashboard/dashboard/register-student', authenticateToken, (req, res) => {
    res.sendFile(path.join(__dirname, 'public','Pre_Admission_Console', 'register_student.html'));
});
// Route to serve the Search Student HTML file
app.get('/main_dashboard/dashboard/search-student', authenticateToken, (req, res) => {
    res.sendFile(path.join(__dirname, 'public','Pre_Admission_Console', 'search_student.html'));
});
// Route to serve the Register Teacher HTML file
app.get('/main_dashboard/dashboard/register-teacher', authenticateToken, (req, res) => {
    res.sendFile(path.join(__dirname, 'public','Pre_Admission_Console', 'register_teacher.html'));
});
//Route to serve the Search Teacher HTML file
app.get('/main_dashboard/dashboard/search-teacher', authenticateToken, (req, res) => {
    res.sendFile(path.join(__dirname, 'public','Pre_Admission_Console', 'search_teacher.html'));
});
// Serve HTML form
app.get('/main_dashboard/dashboard/admitted_student', authenticateToken, (req, res) => {
    res.sendFile(path.join(__dirname, 'public','Pre_Admission_Console', 'admitted_student.html'));
});
//Serve HTML form
app.get('/main_dashboard/dashboard/admitted_teacher', authenticateToken, (req, res) => {
    res.sendFile(path.join(__dirname, 'public','Pre_Admission_Console', 'admitted_teacher.html'));
});

// Middleware to authenticate JWT
function authenticateToken(req, res, next) {
    const token = req.cookies.jwt;
    if (!token) {
        return res.redirect('/');
    }
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.redirect('/')
        }
        req.user = decoded;
        next();
    });
}
// Logout route
app.get('/logout', (req, res) => {
    // Clear the JWT cookie by setting its expiration to a past date
    res.clearCookie('jwt');
    res.sendStatus(200); // Send success response
});


// Handle form submission  // INSERT TO DATABASE //
app.post('/submit', (req, res) => {

    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS pre_adm_registered_students (
            student_name varchar(25) NOT NULL,
            mobile_no varchar(10) NOT NULL,
            res_address varchar(25) NOT NULL,
            dob varchar(10) NOT NULL,
            standard varchar(8) DEFAULT NULL
        )
    `;
    connection.query(createTableQuery, (err, result) => {
        if (err) {
            console.error('Error creating table: ' + err.stack);
            return;
        }
    });

    const createTableQuery2 = `
        CREATE TABLE IF NOT EXISTS pre_adm_admitted_students (
            student_name varchar(25) NOT NULL,
            mobile_no varchar(10) NOT NULL,
            res_address varchar(25) NOT NULL,
            dob varchar(10) NOT NULL,
            standard varchar(8) DEFAULT NULL
        )
    `;
    connection.query(createTableQuery2, (err, result) => {
        if (err) {
            console.error('Error creating table: ' + err.stack);
            return;
        }
    });


    const { student_name, mobile_no, res_address, dob, standard } = req.body;
    const dataToInsert = { student_name, mobile_no, res_address, dob, standard };

    const query = connection.query('INSERT INTO pre_adm_registered_students SET ?', dataToInsert, (err, result) => {
        if (err) {
            console.error('Error inserting data: ' + err.stack);
            res.send('Error inserting data');
            return;
        }
        console.log('Inserted ' + result.affectedRows + ' row(s)');
        res.status(200).send('Data inserted successfully');
    });


});

// Add a new endpoint to retrieve student data // READ FROM DATABASE
app.get('/students', (req, res) => {
    const query = 'SELECT * FROM pre_adm_registered_students';
    connection.query(query, (err, rows) => {
        if (err) {
            console.error('Error fetching data: ' + err.stack);
            res.status(500).json({ error: 'Error fetching data' });
            return;
        }
        res.json(rows);
    });


});

// Add a new endpoint to retrieve student data based on the selected class
app.get("/students/class/:class", (req, res) => {
    const selectedClass = req.params.class; // Get the selected class from request parameters

    // Construct the SQL query to filter based on the standard column
    let query = `SELECT * FROM pre_adm_registered_students WHERE standard = ?`;

    // Execute the SQL query
    connection.query(query, [selectedClass], (err, rows) => {
        if (err) {
            console.error("Error fetching data: " + err.stack);
            res.status(500).json({ error: "Error fetching data" });
            return;
        }
        res.json(rows);
    });


});

// Add a new endpoint to handle search queries
app.get("/students/search", (req, res) => {
    const searchQuery = req.query.search.trim(); // Get the search query from request URL query parameters

    // Construct the SQL query to filter based on the student name
    let query = `SELECT * FROM pre_adm_registered_students WHERE student_name LIKE ?`;

    // Execute the SQL query
    connection.query(query, [`%${searchQuery}%`], (err, rows) => {
        if (err) {
            console.error("Error fetching data: " + err.stack);
            res.status(500).json({ error: "Error fetching data" });
            return;
        }
        res.json(rows);
    });


});

//endpoint for admit and remove students
app.post("/move-to-admitted", (req, res) => {
    const studentName = req.query.name;
    const mobileNo = req.query.mobile;
    const address = req.query.address;
    const dob = req.query.dob;
    const standard = req.query.standard;

    // Construct the SQL query to insert the student into the admitted database
    const insertQuery = `INSERT INTO pre_adm_admitted_students (student_name, mobile_no, res_address, dob, standard) VALUES (?, ?, ?, ?, ?)`;

    // Execute the SQL query to insert the student into the admitted database
    connection.query(insertQuery, [studentName, mobileNo, address, dob, standard], (insertErr, insertResult) => {
        if (insertErr) {
            console.error("Error inserting student into admitted database:", insertErr);
            return res.status(500).send("Error admitting student");
        }

        // Construct the SQL query to delete the student from the database
        const query = `DELETE FROM pre_adm_registered_students WHERE student_name = ? AND mobile_no = ? LIMIT 1`;

        // Execute the SQL query with the student's name as a parameter
        connection.query(query, [studentName, mobileNo], (err, result) => {
            if (err) {
                console.error("Error removing student:", err);
                res.status(500).send("Error removing student");
                return;
            }
            if (result.affectedRows === 0) {
                // If no student was deleted (i.e., student not found), send a 404 response
                res.status(404).send("Student not found");
                return;
            }
            console.log("Student removed:", result);
            res.status(200).send("Student removed successfully");
        });

    });

});

app.delete("/remove-student", (req, res) => {

    const studentName = req.query.name;
    const mobileNo = req.query.mobile;

    // Construct the SQL query to delete the student from the database
    const query = `DELETE FROM pre_adm_registered_students WHERE student_name = ? AND mobile_no = ? LIMIT 1`;

    // Execute the SQL query with the student's name as a parameter
    connection.query(query, [studentName, mobileNo], (err, result) => {
        if (err) {
            console.error("Error removing student:", err);
            res.status(500).send("Error removing student");
            return;
        }
        if (result.affectedRows === 0) {
            // If no student was deleted (i.e., student not found), send a 404 response
            res.status(404).send("Student not found");
            return;
        }
        console.log("Student removed:", result);
        res.status(200).send("Student removed successfully");
    });

});



////////////////////////////////// ADMITTED STUDENT DETAILS ////////////////////////////////////////////////////////////

// Display Admitted DATA
// Add a new endpoint to retrieve student data // READ FROM DATABASE

app.get('/admitted_student', (req, res) => {
    const query = 'SELECT * FROM pre_adm_admitted_students';
    connection.query(query, (err, rows) => {
        if (err) {
            console.error('Error fetching data: ' + err.stack);
            res.status(500).json({ error: 'Error fetching data' });
            return;
        }
        res.json(rows);
    });
});

// Add a new endpoint to retrieve student data based on the selected class
app.get("/admitted_student/class/:class", (req, res) => {
    const selectedClass = req.params.class; // Get the selected class from request parameters

    // Construct the SQL query to filter based on the standard column
    let query = `SELECT * FROM pre_adm_admitted_students WHERE standard = ?`;

    // Execute the SQL query
    connection.query(query, [selectedClass], (err, rows) => {
        if (err) {
            console.error("Error fetching data: " + err.stack);
            res.status(500).json({ error: "Error fetching data" });
            return;
        }
        res.json(rows);
    });


});

// Add a new endpoint to handle search queries
app.get("/admitted_student/search", (req, res) => {
    const searchQuery = req.query.search.trim(); // Get the search query from request URL query parameters

    // Construct the SQL query to filter based on the student name
    let query = `SELECT * FROM pre_adm_admitted_students WHERE student_name LIKE ?`;

    // Execute the SQL query
    connection.query(query, [`%${searchQuery}%`], (err, rows) => {
        if (err) {
            console.error("Error fetching data: " + err.stack);
            res.status(500).json({ error: "Error fetching data" });
            return;
        }
        res.json(rows);
    });


});

app.delete("/remove-adm-student", (req, res) => {

    const studentName = req.query.name;
    const mobileNo = req.query.mobile;

    // Construct the SQL query to delete the student from the database
    const query = `DELETE FROM pre_adm_admitted_students WHERE student_name = ? AND mobile_no = ? LIMIT 1`;

    // Execute the SQL query with the student's name as a parameter
    connection.query(query, [studentName, mobileNo], (err, result) => {
        if (err) {
            console.error("Error removing student:", err);
            res.status(500).send("Error removing student");
            return;
        }
        if (result.affectedRows === 0) {
            // If no student was deleted (i.e., student not found), send a 404 response
            res.status(404).send("Student not found");
            return;
        }
        console.log("Student removed:", result);
        res.status(200).send("Student removed successfully");
    });

});

/************************************* TEACHER CONSOLE **************************/

//////////////////////////////////////// Register Teacher ///////////////////////////////////

// Handle form submission  // INSERT TO DATABASE
app.post('/submit_teacher', (req, res) => {

    const createTableQuery3 = `
    CREATE TABLE IF NOT EXISTS pre_adm_registered_teachers (
        teacher_name varchar(25) NOT NULL,
        mobile_no varchar(10) NOT NULL,
        res_address varchar(30) NOT NULL,
        dob varchar(10) NOT NULL,
        qualification varchar(30) NOT NULL,
        experience varchar(30) NOT NULL
        
    )
    `;
    connection.query(createTableQuery3, (err, result) => {
        if (err) {
            console.error('Error creating table: ' + err.stack);
            return;
        }
    });

    const createTableQuery4 = `
    CREATE TABLE IF NOT EXISTS pre_adm_admitted_teachers (
        teacher_name varchar(25) NOT NULL,
        mobile_no varchar(10) NOT NULL,
        res_address varchar(30) NOT NULL,
        dob varchar(10) NOT NULL,
        qualification varchar(30) NOT NULL,
        experience varchar(30) NOT NULL

    )
    `;

    connection.query(createTableQuery4, (err, result) => {
        if (err) {
            console.error('Error creating table: ' + err.stack);
            return;
        }
    });

    const { teacher_name, mobile_no, res_address, dob, qualification, experience } = req.body;

    const dataToInsert = { teacher_name, mobile_no, res_address, dob, qualification, experience };

    const query = connection.query('INSERT INTO pre_adm_registered_teachers SET ?', dataToInsert, (err, result) => {
        if (err) {
            console.error('Error inserting data: ' + err.stack);
            res.send('Error inserting data');
            return;
        }
        console.log('Inserted ' + result.affectedRows + ' row(s)');
        res.status(200).send('Data inserted successfully');


    });


});

//retrieve teacher data
app.get('/teachers', (req, res) => {
    const query = 'SELECT * FROM pre_adm_registered_teachers';
    connection.query(query, (err, rows) => {
        if (err) {
            console.error('Error fetching data: ' + err.stack);
            res.status(500).json({ error: 'Error fetching data' });
            return;
        }
        res.json(rows);
    });
});

// Endpoint to admit a teacher
app.post("/move-to-admitted-teacher", (req, res) => {
    const teacherName = req.query.name;
    const mobileNo = req.query.mobile;
    const address = req.query.address;
    const dob = req.query.dob;
    const qualification = req.query.qualification;
    const experience = req.query.experience;

    // Construct the SQL query to insert the teacher into the admitted database
    const insertQuery = `INSERT INTO pre_adm_admitted_teachers (teacher_name, mobile_no, res_address, dob, qualification, experience) VALUES (?, ?, ?, ?, ?, ?)`;

    // Execute the SQL query to insert the teacher into the admitted database
    connection.query(insertQuery, [teacherName, mobileNo, address, dob, qualification, experience], (insertErr, insertResult) => {
        if (insertErr) {
            console.error("Error inserting teacher into admitted database:", insertErr);
            return res.status(500).send("Error admitting teacher");
        }

        // Construct the SQL query to delete the teacher from the database
        const query = `DELETE FROM pre_adm_registered_teachers WHERE teacher_name = ? AND mobile_no = ? LIMIT 1`;

        // Execute the SQL query to delete the teacher from the database
        connection.query(query, [teacherName, mobileNo], (err, result) => {
            if (err) {
                console.error("Error removing teacher:", err);
                return res.status(500).send("Error removing teacher");
            }
            if (result.affectedRows === 0) {
                // If no teacher was deleted (i.e., teacher not found), send a 404 response
                return res.status(404).send("Teacher not found");
            }
            console.log("Teacher removed:", result);
            res.status(200).send("Teacher admitted and removed successfully");
        });
    });
});

// Endpoint to search for teachers
app.get("/teachers/search", (req, res) => {
    const searchTerm = req.query.search;

    // Construct the SQL query to search for teachers based on the provided search term
    const query = `SELECT * FROM pre_adm_registered_teachers WHERE teacher_name LIKE '%${searchTerm}%'`;

    // Execute the SQL query to search for teachers
    connection.query(query, (err, results) => {
        if (err) {
            console.error("Error searching for teachers:", err);
            return res.status(500).send("Error searching for teachers");
        }

        // Send the results back to the client
        res.json(results);
    });
});

// Endpoint to remove a teacher
app.delete("/remove-teacher", (req, res) => {
    const teacherName = req.query.name;
    const mobileNo = req.query.mobile;

    // Construct the SQL query to delete the teacher from the database
    const query = `DELETE FROM pre_adm_registered_teachers WHERE teacher_name = ? AND mobile_no = ? LIMIT 1`;

    // Execute the SQL query with the teacher's name and mobile number as parameters
    connection.query(query, [teacherName, mobileNo], (err, result) => {
        if (err) {
            console.error("Error removing teacher:", err);
            return res.status(500).send("Error removing teacher");
        }
        if (result.affectedRows === 0) {
            // If no teacher was deleted (i.e., teacher not found), send a 404 response
            return res.status(404).send("Teacher not found");
        }
        console.log("Teacher removed:", result);
        // Send a success response
        res.status(200).send("Teacher removed successfully");
    });
});

//Admitted Teacher///////

// Display Admitted DATA
// Add a new endpoint to retrieve teacher data // READ FROM DATABASE

app.get('/admitted_teachers', (req, res) => {
    const query = 'SELECT * FROM pre_adm_admitted_teachers';
    connection.query(query, (err, rows) => {
        if (err) {
            console.error('Error fetching data: ' + err.stack);
            res.status(500).json({ error: 'Error fetching data' });
            return;
        }
        res.json(rows);
    });
});

// Add a new endpoint to handle search queries (teachers)
app.get("/admitted_teachers/search", (req, res) => {
    const searchQuery = req.query.search.trim(); // Get the search query from request URL query parameters

    // Construct the SQL query to filter based on the student name
    let query = `SELECT * FROM pre_adm_admitted_teachers WHERE teacher_name LIKE ?`;

    // Execute the SQL query
    connection.query(query, [`%${searchQuery}%`], (err, rows) => {
        if (err) {
            console.error("Error fetching data: " + err.stack);
            res.status(500).json({ error: "Error fetching data" });
            return;
        }
        res.json(rows);
    });


});

// Endpoint to remove a teacher
app.delete("/remove-adm-teacher", (req, res) => {
    const teacherName = req.query.name;
    const mobileNo = req.query.mobile;

    // Construct the SQL query to delete the teacher from the database
    const query = `DELETE FROM pre_adm_admitted_teachers WHERE teacher_name = ? AND mobile_no = ? LIMIT 1`;

    // Execute the SQL query with the teacher's name and mobile number as parameters
    connection.query(query, [teacherName, mobileNo], (err, result) => {
        if (err) {
            console.error("Error removing teacher:", err);
            return res.status(500).send("Error removing teacher");
        }
        if (result.affectedRows === 0) {
            // If no teacher was deleted (i.e., teacher not found), send a 404 response
            return res.status(404).send("Teacher not found");
        }
        console.log("Teacher removed:", result);
        // Send a success response
        res.status(200).send("Teacher removed successfully");
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});