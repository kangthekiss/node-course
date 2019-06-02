const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (err) {
        res.status(400).send(err)
    }

    // user.save().then(() => {
    //     res.status(201).send(user)
    // }).catch((err) => {
    //     res.status(400).send(err)
    // })
})

app.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (err) {
        res.status(500).send(err)
    }

    // User.find({}).then((users) => {
    //     res.send({
    //         rows: users.length,
    //         data: users,
    //     })
    // }).catch((err) => {
    //     res.status(500).send(err)
    // })
})

app.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)
        
        if(!user) return res.status(404).send()

        res.send(user)
    } catch (err) { 
        res.status(500).send(err)
    }

    // User.findById(_id).then((user) => {
    //     if(!user) return res.status(404).send()

    //     res.send(user)
    // }).catch((err) => {
    //     res.status(500).send(err)
    // })
})

app.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch (err) {   
        res.status(500).send(err)
    }

    // task.save().then(() => {
    //     res.status(201).send(task)
    // }).catch((err) => {
    //     res.status(400).send(err)
    // })
})

app.get('/tasks', async (req, res) => {

    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (err) {
        res.status(500).send(err)
    }

    // Task.find({}).then((tasks) => {
    //     res.send(tasks)
    // }).catch((err) => {
    //     res.status(500).send(err)
    // })
})

app.get('/tasks/:complete', async (req, res) => {
    const complete = req.params.complete

    try {
        const tasks = await Task.find({complete})
        
        if(!tasks) return res.status(404).send()

        res.send(tasks)
    } catch (err) {
        res.status(500).send(err)
    }

    // Task.find({complete}).then((tasks) => {
    //     if(!tasks) return res.status(404).send()

    //     res.send(tasks)
    // }).catch((err) => {
    //     res.status(500).send(err)
    // })
})

app.listen(port, () => {
    console.log('server is up on port ', port)
})