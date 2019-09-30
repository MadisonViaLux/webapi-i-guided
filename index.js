// import express from 'express'

const express = require('express')

const Hubs = require('./data/hubs-model')

const server = express();

server.use(express.json())







server.get('/', (req, res) => {
    res.send('hello web20.75');
})






server.post('/hubs', (req, res) => {

    const hubInfo = req.body;

    console.log('hub info from body', hubInfo)

    Hubs.add(hubInfo)
    .then(hub => {
        res.status(201).json(hub)
    })
    .catch(error => {
        res.status(500).json({ message: 'error adding the hub' })
    })
})





server.get('/hubs', (req, res) => {
    Hubs.find().then(hubs => {
        res.status(200).json(hubs)
    }).catch(error => {
        res.status(500).json({ message: 'error getting list of hubs' })
    })
})





server.delete('/hubs/:id', (req, res) => {
    const hubId = req.params.id;

    Hubs.remove(hubId)
        .then(hub => {
            res.status(201).json({message: 'hub deleted'})
        })
        .catch(error => {
            res.status(500).json({ message: 'error deleting the hub' })
        })
})


server.put('/hubs/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    Hubs.update(id, changes)
        .then(updated => {
            if(updated){
                res.status(200).json(updated);
            } else {
                res.status(404).json({ message: 'hub not found' })
            }
        })
        .catch(error => {
            res.status(500).json({ message: 'error updating hub' })
        })
})








const port = 7777;

server.listen(port, () => console.log(`\napi is running on port ${port}\n`) )