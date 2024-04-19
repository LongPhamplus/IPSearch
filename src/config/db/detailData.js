const fs = require('fs')
const moment = require('moment')
const db = require('./connectDatabase')
const { loadavg } = require('os')
const internal = require('stream')
const { count } = require('console')
var myquery = ``
var status = {
    'Đang giải quyết': 'status--dang_giai_quyet',
    'Cấp bằng': 'status--cap_bang',
    'Từ chối': 'status--tu_choi',
    'Rút đơn': 'status--rut_don'
}
async function getDetail(data) {
    myquery = `select * from nhan_hieu
    where so_don = '${data.so_don}'; `
    html = ``
    chu_don = ''
    const dataconnect = await db.any(myquery, [true]) 
    dataconnect.forEach((row) => {
        loai_don = ''
        row.nhom_san_pham.forEach((item, index) => {
            chu_don = row.chu_don
            loai_don += `
            <div class="blue">
                <strong>${item}:</strong>
                ${row.dich_vu_nhom_sp[index]}
                <br>
            </div>`
        })
        tttd_content = ``
        tttd_date = ''
        row.tttd_noi_dung.forEach((item, index) => {
            tttd_content += `
                <div class="grid-border pding-5">${item}</div>
                <div class="grid-border pding-5">${moment(row.tttd_ngay[index]).format('DD/MM/YYYY')}</div>
            `
        })
        dateFromDB = row.ngay_nop_don
        reformat = moment(dateFromDB).format('DD/MM/YYYY')
        html = `
        <div class="detail-container font-size-15 lh-2em">
        <div class="product-detail margin-top-24">
            <h1 class="font-size-20 h1-normal">
                Đơn đăng ký nhãn hiệu "${row.mo_ta_nhan_hieu}" số ${row.so_don} của Công ty TNHH thương mại dịch vụ xuất nhập khẩu Thuận Thiên Thành
            </h1>
        </div>
        <div class="grid-style grid-col-3-1-2-4 margin-top-24 ">
            <div class="grid-item ">
                <strong>Mẫu nhãn</strong>
            </div>
            <div class="grid-item ">
                <img class="mau-nhan " src="https://storage.cloud.google.com/longnobucket/logo_img/${row.mau_nhan}.jpg" alt="Mẫu nhãn">
            </div>
            <div class="grid-item ">
                <div class="grid-style grid-col-2-1-3 status ">
                    <strong>Tình trạng</strong>
                    <span class="bold product-status ${status[row.tinh_trang]}">${row.tinh_trang}</span>
                </div>
                <div class="grid-style grid-col-2-1-3 ">
                    <strong>Số đơn</strong>
                    <span>${row.so_don}</span>
                </div>
                <div class="grid-style grid-col-2-1-3 ">
                    <strong>Ngày nộp đơn</strong>
                    <span>${reformat}</span>
                </div>
                <div class="grid-style grid-col-2-1-3 ">
                    <strong>Chủ đơn/ Chủ bằng</strong>
                    <div>
                        <span class="blue">
                            ${row.chu_don}
                        </span>
                        <br>
                        ${row.dia_chi_chu_don}
                    </div>
                </div>
            </div>
        </div>
        <div class="grid-style grid-col-6 margin-top-16">
            <div>
                <strong>Mô tả nhãn hiệu</strong>
            </div>
            <div>
                <span>${row.mo_ta_nhan_hieu}</span>
            </div>
            <div>
                <strong>Yếu tố loại trừ</strong>
            </div>
            <div><span>${row.yeu_to_loai_tru}</span></div>
            <div>
                <strong>Loại đơn</strong>
            </div>
            <div><span>${row.loai_don}</span></div>
        </div>
        <div class="grid-style grid-col-2-1-5 margin-top-24">
            <div><strong>Nhóm sản phẩm, dịch vụ</strong></div>
            <div>${loai_don}</div>
            
        </div>
        <div class="grid-style grid-col-2-1-5 margin-top-24">
            <div><strong>Đại diện SHCN</strong></div>
            <div><span>${row.dai_dien_shcn}</span></div>
        </div>
        <div class="grid-style grid-col-6 margin-top-16">
            <div><strong>Kiểu của mẫu nhãn</strong></div>
            <div><span>${row.kieu_mau_nhan}</span></div>
            <div><strong>Màu sắc nhãn hiệu</strong></div>
            <div><span>${row.mau_sac_nhan_hieu}</span></div>
            <div><strong>Phân loại hình</strong></div>
            <div><span>${row.phan_loai_hinh}</span></div>
        </div>
        <div class="grid-style grid-col-6 margin-top-16">
            <div><strong>Chi tiết về dữ liệu ưu tiên</strong></div>
            <div><span>${row.du_lieu_uu_tien}</span></div>
            <div><strong>Nhãn hiệu dịch thuật</strong></div>
            <div><span>${row.nhan_hieu_dich_thuat}</span></div>
        </div>
        <div class="grid-style grid-col-2-1-5 margin-top-16">
            <div><strong>Tiến trình thẩm định</strong></div>
            <div class="grid-style grid-col-half grid-container grid-no-gap">
                    ${tttd_content}
            </div>
            
        </div>
    </div>
            `
            
    })
    subQuery = `select * from nhan_hieu
            where chu_don = '${chu_don}'`
    subhtml = ''
    don_cung_chu = await db.any(subQuery, [true])
    num_found = 0
    don_cung_chu.forEach((row) => {
        console.log(row.dai_dien_shcn.substring(0, row.dai_dien_shcn.indexOf(':')))
        dateFromDB = row.ngay_nop_don
        reformat = moment(dateFromDB).format('DD/MM/YYYY')
        subhtml += `
        <tr >
            <td><input type="checkbox"></td>
            <td class="tx-al-center w-wrap">${num_found++}</td>
            <td class="img-container w-wrap"><img class="product-img flex-style" src="https://storage.cloud.google.com/longnobucket/logo_img/${row.mau_nhan}.jpg" alt=""></td>
            <td>
                <lable>${row.mo_ta_nhan_hieu}</lable>
            </td>
            <td style="max-width: 80px;" class="w-wrap"><div>${row.nhom_san_pham}</div></td>
            <td class="no-warp w-wrap">
                <span class="${status[row.tinh_trang]}">${row.tinh_trang}</span>
            </td>
            <td class="w-wrap">
                ${reformat}
            </td>
            <td class="no-warp" >
                <a href="/productDetail?so_don=${row.so_don}">${row.so_don}</a>
            </td>
            <td>${row.chu_don}</td>
            <td>${row.dai_dien_shcn.substring(0, row.dai_dien_shcn.indexOf(':'))}</td>
        </tr>
            `
    })
    return {html, subhtml, num_found}
}

module.exports = {
    getDetail: getDetail
}