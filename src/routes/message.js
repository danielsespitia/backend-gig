const router = require('express').Router();
const messageController = require('../controllers/message.controller');
const { auth } = require('../utils/auth');

router.route('/:readerId').post(auth, messageController.create);
router.route('/').get(auth, messageController.list);
router.route('/:messageId').get(auth, messageController.show);

module.exports = router;
