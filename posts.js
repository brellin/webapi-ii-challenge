// Declare variables
const express = require('express')
const db = require('./data/db')
const router = express.Router()

// Create server methods
router.post('/', (req, res) => {
    const { title, contents } = req.body
    title && contents ?
        db
            .insert(req.body)
            .then(post => {
                res
                    .status(201)
                    .json({
                        id: post.id,
                        title: title,
                        contents: contents
                    })
            })
            .catch(err => {
                res
                    .status(500)
                    .json({
                        error: "There was an error while saving the post to the database"
                    })
            }) :
        res
            .status(400)
            .json({
                errorMessage: "Please provide title and contents for the post."
            })

})

router.get('/', (req, res) => {
    db
        .find()
        .then(posts => {
            res
                .status(200)
                .json(posts)
        })
        .catch(err => {
            res
                .status(500)
                .json({
                    error: "The posts information could not be retrieved."
                })
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    db
        .findById(id)
        .then(posts => {
            posts ?
                res
                    .status(201)
                    .json(posts) :
                res
                    .status(404)
                    .json({
                        message: "The post with the specified ID does not exist."
                    })
                    .catch(err => {
                        res
                            .status(500)
                            .json({
                                error: "The post information could not be retrieved."
                            })
                    })
        })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params
    db
        .remove(id)
        .then(post => {
            post ?
                res.end() :
                res
                    .status(404)
                    .json({
                        message: "The post with the specified ID does not exist."
                    })
        })
        .catch(err => {
            res
                .status(500)
                .json({
                    error: "The post could not be removed"
                })
        })
})

router.put('/:id', (req, res) => {
    const { id } = req.params
    const { title, contents } = req.body
    title && contents ?
        db
            .update(id, req.body)
            .then(post => {
                post ?
                    res
                        .status(200)
                        .json({
                            title: title,
                            contents: contents,
                            id: id
                        }) :
                    res
                        .status(404)
                        .json({
                            message: "The post with the specified ID does not exist."
                        })
            })
            .catch(err => {
                res
                    .status(500)
                    .json({
                        error: "The post information could not be modified."
                    })
            }) :
        res
            .status(400)
            .json({
                errorMessage: "Please provide title and contents for the post."
            })
})

module.exports = router
