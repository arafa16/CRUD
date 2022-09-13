const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {user} = require('../models');

exports.register = async(req, res, next) => {
    try {
        const {firstName, lastName, username, email, password} = req.body;

        const hashedPassword = bcrypt.hashSync(password, 8);

        let insertUser = await user.create({
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            password: hashedPassword
        });

        return res.status(200).send({
            message: 'register success',
            data: insertUser
        })
    } catch (error) {
        return res.status(500).send({
            message: error,
            code: 500
        });
    }
}

exports.getUsers = async(req, res, next) => {
    try {
        const data = await user.findAll();

        return res.status(200).send({
            message: `pengambilan data sukses`,
            data: data
        })
    } catch (error) {
        return res.status(500).send({
            message: error.error,
            code : 500,
        })
    }
}

exports.getUserById = async(req, res, next) => {
    try {
        const id = req.params.id;

        const data = await user.findOne({
            where: {
                id:id
            }
        });

        return res.status(200).send({
            message: `pengambilan data sukses`,
            data: data
        })
    } catch (error) {
        return res.status(500).send({
            message: error.error,
            code : 500,
        })
    }
}

exports.update = async(req, res, next) => {
    try {
        const id = req.params.id;
        const {firstName, lastName, email} = req.body;

        const updateData = await user.update({
            firstName: firstName,
            lastName: lastName,
            email: email
        },{
            where: {
                id: id,
            }
        })

        return res.status(201).send({
            message: `upload data sukses`,
            data: updateData
        })
    } catch (error) {
        return res.status(500).send({
            message: error.error,
            code : 500,
        })
    }
}

exports.delete = async(req, res, next) => {
    try {
        const id = req.params.id;

        const deleteUser = await user.destroy({
            where: {
                id:id
            }
        });

        return res.status(200).send({
            message: `data berhasil didelete`
        });
        
    } catch (error) {
        return res.status(500).send({
            message: error.error,
            code : 500,
        })
    }
}