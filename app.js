const express = require("express");
const helmet = require('helmet');

const app = express();

// Security headers
app.use(helmet());

// ... existing code ... 