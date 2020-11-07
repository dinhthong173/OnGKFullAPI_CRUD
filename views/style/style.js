const api = "http://localhost:3000/api/sinhvien"
start()
function start(){
    getSinhVien(renderSinhVien);
    addSinhVienFromData();
}

function getSinhVien(callBack) {
    fetch(api).then(res => {
        return res.json();
    }).then(callBack)
}

function renderSinhVien(sinhvien) {
    var listSV = document.getElementById('list_sinhvien')
    var html = sinhvien.map(sv => {
        // var date = new Date(sv.NgaySinh);
        // var year = date.getFullYear();
        // var month = (1 + date.getMonth()).toString();
        // month = month.length > 1 ? month : '0' + month;
        // var day = date.getDate().toString();
        // day = day.length > 1 ? day : '0' + day;
        // var dateVN = day + '/' + month + '/' + year;
        return `
            <tr id = ${sv.id}>
                <td class="id" hidden>${sv.id}</td>
                 <td class="ma_sv" >${sv.MaSV}</td>
                 <td class="ten_sv" >${sv.TenSV}</td>
                <td class="ma_lop" >${sv.MaLop}</td>
                <td><button id="btnUpdate" data-toggle="modal" data-target="#modalUpdateSinhVien" >Cập nhật</button><button id="btnDeleteSinhVien" onclick="deleteSinhVienFormData('${sv.id}')" ><i class="fa fa-trash-o"></i>&nbsp;Xoá</button></td>
            </tr>
        `;
    });
    listSV.innerHTML = html.join('')
}

function addSinhVienFromData() {
    var btnLuu = document.getElementById('btnLuu')
    btnLuu.onclick = function () {
        var masv = document.querySelector("#txtMaSV").value
        var tensv = document.querySelector("#txtTenSV").value
        var maLop = document.querySelector("#txtMaLop").value

        const formData = {
            MaSV: masv,
            TenSV: tensv,
            MaLop: maLop
        }
        addSinhVien(formData, (data) => {
            alert(data.message)
            $("#modalThemSinhVien").modal('hide')
            getSinhVien(renderSinhVien)
        });
    }
}

function addSinhVien(formData, callback) {
    fetch(api, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify(formData)
    }).then(res => {
        return res.json();
    }).then(callback);
}

function deleteSinhVienFormData(id) {
    if (confirm('Bạn có chắc chắn xóa ?')) {
        deleteSinhVien(id, (data) => {
            alert(data.message);
            if (data.status == 200) {
                var sinhvienRemove = document.getElementById(id);
                if (sinhvienRemove)
                    sinhvienRemove.remove();
            }
        });
    }
}

function deleteSinhVien(id, callback) {
    fetch(api + '/' + id, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        }
    }).then(res => {
        return res.json();
    }).then(callback);
}


function updateSinhVien(formData, callback) {
    fetch(api + '/' + formData.id, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify(formData)
    }).then(res => {
        return res.json();
    }).then(callback);
}

$('#table tbody').on('click', '#btnUpdate', (e) => {
    var id = $(e.target).closest('tr').show().find('.id').text();
    var masv = $(e.target).closest('tr').show().find('.ma_sv').text();
    var tensv = $(e.target).closest('tr').show().find('.ten_sv').text();
    var maLop = $(e.target).closest('tr').show().find('.ma_lop').text();
    $('#txtUpMaSV').val(masv)
    $('#txtUpTenSV').val(tensv)
    $('#txtUpMaLop').val(maLop)

    var btnUpLuu = document.getElementById('btnUpLuu')
    btnUpLuu.onclick = function () {
        var masvUp = document.querySelector("#txtUpMaSV").value
        var tensvUp = document.querySelector("#txtUpTenSV").value
        var maLopUp = document.querySelector("#txtUpMaLop").value
        const formData = {
            id: id,
            MaSV: masvUp,
            TenSV: tensvUp,
            MaLop: maLopUp
        }
        updateSinhVien(formData, (data) => {
            alert(data.message)
            $("#modalUpdateSinhVien").modal('hide')
            getSinhVien(renderSinhVien)
        });
    }
})

function clearForm(){
    var masv = document.querySelector("#txtMaSV")
    var tensv = document.querySelector("#txtTenSV")
    var maLop = document.querySelector("#txtMaLop")
    masv.value = ''
    tensv.value = ''
    maLop.value = ''
}