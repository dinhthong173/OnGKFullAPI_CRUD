const services= require('../api/service')
const uuid= require('uuid')

module.exports={
    getAll(req, res, next) {
        services.getAllSinhVien().then(data => {
            res.json(data);
        }).catch(err => {
            next(err);
        })
    },

    addSinhVien(req, res, next) {
        const sv = req.body;
        const id = uuid.v4();
        sv.id = id;
        services.findSinhVienByMaSV(sv.MaSV).then(data => {
            if (data) {
                res.json({ status: 409, message: "Tồn tại mã sinh viên" })
            }
            else
                return services.putSinhVien(sv);
        }).then(data => {
            if (data)
                res.json({ status: 200, message: "Thêm sinh viên thành công" });
        }).catch(err => {
            next(err);
        });
    },

    deleteSinhVien(req, res, next) {
        const id = req.params.id;
        services.findSinhVienByID(id).then(data => {
            if (!data)
                res.json({ status: 404, message: "Không tồn tại ID sinh viên" });
            else
                return services.deleteSinhVienByID(id);
        }).then(data => {
            res.json({ status: 200, message: "Xóa sinh viên thành công" });
        }).catch(err => {
            next(err);
        });
    },

    findSinhVienById(req, res, next) {
        const id = req.params.id;
        services.findSinhVienByID(id).then(data => {
            if (!data)
                res.json({ status: 404, message: "Không tồn tại ID sinh viên" });
            else
                res.json(data);
        }).catch(err => {
            next(err);
        });
    },

    deleteMulti(req, res, next){
        const lstID= req.body;
        services.deleteMultiSV(lstID).then(data=>{
            res.json({
                status:200,
                message: "Xoá thành công "
            })
        }).catch(err=>{
            next(err)
        })
    },

    updateSinhVien(req, res, next) {
        const id = req.params.id;
        const sv = req.body;
        services.findSinhVienByID(id).then(data => {
            if (!data)
                res.json({ status: 404, message: "Không tồn tại ID sinh viên" });
            else {
                Object.assign(data, sv);
                return services.putSinhVien(data);
            }
        }).then(data => {
            res.json({ status: 200, message: "Update sinh viên thành công" });
        }).catch(err => {
            next(err);
        });
    }
}