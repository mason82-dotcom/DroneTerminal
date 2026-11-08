import express from 'express';

const router = express.Router()

router.use((req, res, next) => {

    req.GM.guardUserIsAdmin().then(()=>{
        next()
    }).catch(err => {
        next(err)
    })

})

import systemRoute from './system'
router.use('/system', systemRoute)

import usersRoute from './users'
router.use('/users', usersRoute)

import organisationsRoute from './organisations'
router.use('/organisations', organisationsRoute)

export default router
