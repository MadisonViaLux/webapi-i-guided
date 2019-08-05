// import express from 'express'

const express = require('express')

const Hubs = require('./data/hubs-model')

const server = express();



server.get('/', (req, res) => {
    res.send('hello web20.75');
})

server.get('/hubs', (req, res) => {
    Hubs.find().then(hubs => {
        res.status(200).json(hubs)
    }).catch(error => {
        res.status(500).json({ message: 'error getting list of hubs' })
    })
})



const port = 8000;

server.listen(port, () => console.log('\napi is running\n') )