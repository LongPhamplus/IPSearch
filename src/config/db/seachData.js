const fs = require('fs')
const db = require('./connectDatabase')
const { type } = require('os')
const moment = require('moment')

var status = {
    'Đang giải quyết': 'status--dang_giai_quyet',
    'Cấp bằng': 'status--cap_bang',
    'Từ chối': 'status--tu_choi',
    'Rút đơn': 'status--rut_don'
}
var myquery = ``
var count = 1
var numberFound = 0
async function getData(data) {
    myquery = ``
    html = ""
    count = 1
    var check = false
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            if (data[key] != '' && check == false) {
                check = true
                myquery += `select * from nhan_hieu 
                where`
            }
            if(data[key] != '' && check == true) {
                data[key] = data[key].toLocaleLowerCase()
                if (myquery[myquery.length-1] != 'e') myquery += ' and '
                var name = key, content = data[key].trim()
                if (content[0] >= '0' && content[0] <= '9') {
                    if(name == "mo_ta_nhan_hieu") {
                        name = "so_don"
                    }
                }
                // console.log(name, '\n', content)
                myquery += ` lower(${name.toString()}) like '%${content.trim()}%' `
            }
        }
    }
    console.log(myquery)
    if(myquery != '') {
        try {
            const dataconnect = await db.any(myquery, [true]) 
            numberFound = dataconnect.length
            dataconnect.forEach((row) => {
                console.log(row.dai_dien_shcn.substring(0, row.dai_dien_shcn.indexOf(':')))
                dateFromDB = row.ngay_nop_don
                reformat = moment(dateFromDB).format('DD/MM/YYYY')
                html += `
                <tr >
                    <td><input type="checkbox"></td>
                    <td class="tx-al-center w-wrap">${count++}</td>
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
            
        } catch (err) {
            console.log(err)
        }
    }
    return {numberFound, html, data}

            // console.log(html)
        // })
        // .catch((err) => {
        //     console.log('Error: ', err)
        // })
}


module.exports = {
    getData: getData
}