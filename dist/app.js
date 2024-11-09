"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const { Request, Response } = require('express');
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
