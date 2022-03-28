const router = require('express').Router()
const dogCtrls = require('../controllers/dogCtrl')

router.route('/dogs')
    .get(dogCtrls.getDogs)
    .post(dogCtrls.createDog)

router.route('/dogs/:id')
    .delete(dogCtrls.deleteDogs)
    .put(dogCtrls.updateDogs)

module.exports = router