const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = {
    signup: (req, res) => {
        const { email, password } = req.body;

        User.find({ email }).then((users) => {
            if (users.length >= 1) {
                return res.status(409).json({
                    message: 'Email exists'
                })
            }

            bcrypt.hash(password, 10, (error, hash) => {
                if (error) {
                    return res.status(500).json({
                        error
                    });
                }
                const user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    email,
                    password: hash
                })

                user.save().then((result) => {
                    console.log(result);

                    res.status(200).json({
                        message: 'user created'
                    })
                }).catch(error => {
                    res.status(500).json({
                        error
                    })
                });
            });
        })
    },

    login: (req, res) => {
        const { email, password } = req.body;

        User.find({ email }).then((users) => {
            if (users.length === 0) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }

            const [user] = users;

            bcrypt.compare(password, user.password, (error, result) => {
                if (error || !result) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                }

                if (result) {

                    const token = jwt.sign({
                        id: user._id,
                        email: user.email
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: '1H',

                    });

                    return res.status(200).json({
                        message: 'Auth seccessfuly',
                        token
                    });
                }
            })
        })
    },

    getAllUsers: (req, res) => {

        User.find().then((users) => {
            res.status(200).json({
                users
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        });
    },

    deleteUser: (req, res) => {

        const userId = req.params.userId;

        User.findById(userId).then((user) => {
            if (!user)
                return res.status(404).json({
                    message: ' user not found'
                })
        }).then(() => {
            User.deleteOne({ _id: userId }, req.body).then(() => {
                res.status(200).json({
                    message: `User deleted - ${userId}`
                })
            }).catch(error => {
                res.status(500).json({
                    error
                })
            });
        })
    }


}