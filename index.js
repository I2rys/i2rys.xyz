"use strict";

// Dependencies
const compress = require("compression")
const express = require("express")
const helmet = require("helmet")
const path = require("path")

// Variables
const port = process.env.PORT || 8080
const web = express()

// Functions
function publicFiles(file){
    return file ? path.join(__dirname, "public", file) : path.join(__dirname, "public")
}

/// Configurations
// Express
web.use(helmet({ contentSecurityPolicy: false }))
web.use(compress({ level: 1 }))

// Main
web.use(express.static(path.resolve(__dirname, "public")))

web.listen(port, ()=>{
    console.log(`Server is running. Port: ${port}`)
})