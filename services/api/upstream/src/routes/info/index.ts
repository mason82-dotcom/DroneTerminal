import express from 'express';

const router = express.Router()


router.use((req, res, next) => {

    req.GM.guardUserIsAuthenticated().then(()=>{
        next()
    }).catch(err => {
        next(err)
    })

})

import collisionObjectsRoute from './collision-objects'
router.use('/collision-objects', collisionObjectsRoute)

export default router
