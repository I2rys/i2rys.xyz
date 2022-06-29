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

web.use("", (req, res, next)=>{
    if(req.path.indexOf(".html") !== -1) return res.redirect("/")

    next()
})

web.get("/", (req, res)=>res.sendFile(publicFiles("pages/index.html")))
web.get("/about", (req, res)=>res.sendFile(publicFiles("pages/about.html")))
web.get("/contact", (req, res)=>res.sendFile(publicFiles("pages/contact.html")))
web.get("/qa", (req, res)=>res.sendFile(publicFiles("pages/q&a.html")))
web.use("*", (req, res)=>res.redirect("/"))

web.listen(port, ()=>{
    console.log(`Server is running. Port: ${port}`)
})