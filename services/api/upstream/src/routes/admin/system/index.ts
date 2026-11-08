import express from 'express';

const router = express.Router()

import performanceRoute from './performance'
router.use('/performance', performanceRoute)

import databaseRoute from './database'
router.use('/database', databaseRoute)

export default router
