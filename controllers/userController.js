// const express = require('express')
const router = require("express").Router()

const { UserModel } = require('../models')

const { UniqueConstraintError } = require("sequelize/lib/errors")
const { sequelize } = require("../models/userModel")

router.post("/signup", async (req, res) => {
    console.log("in router.post for signup")

    let { email, password, firstName, lastName } = req.body

    try {
        const newUser = await UserModel.create({
            email,
            password,
            firstName,
            lastName
        })

        res.status(201).json({
            message: "User successfully signed up",
            user: newUser,

        })
    } catch (error) {
        if (error instanceof UniqueConstraintError) {
            console.log(error)
            res.status(409).json({
                message: "Email already in use."
            })
        } else {
            console.log(error)
            res.status(500).json({
                error: "Failed to register user",
                message: error
            })
        }
    }
});

module.exports = router