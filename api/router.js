const express= require('express')
const router= express.Router();
const {
    getAll,
    addSinhVien,
    deleteSinhVien,
    findSinhVienById,
    deleteMulti,
    updateSinhVien
} = require ('../api/controller')

router.get('/', getAll)
router.post('/', addSinhVien)
router.delete('/:id', deleteSinhVien)
router.post('/remove', deleteMulti)
router.put('/:id', updateSinhVien)
 module.exports= router