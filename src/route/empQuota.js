const express = require('express');
const empQuotaController = require('../controller/empQuota')

const router = express.Router()

// GET All Quotas
router.get('/', empQuotaController.getAllQuotas)

// CREATE New Quota
router.post('/', empQuotaController.createNewQuota)

// DELETE Quota
router.delete('/:quotaId', empQuotaController.deleteQuota)

module.exports = router