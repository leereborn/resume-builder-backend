const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/users');
const resumeRoutes = require('./routes/resumes');
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middleware/authorization');

const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/users', userRoutes);
app.use('/resumes', authMiddleware.requireAuth, resumeRoutes);
app.use('/session',authRoutes);

app.use((req, res) => {
    res.status(404).send();
});

app.listen(3000);