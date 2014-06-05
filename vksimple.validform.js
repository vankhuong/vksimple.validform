/**
 * vksimple.validform 1.0
 *
 * Copyright 2012-2014, Van Khuong (www.sothichweb.com)
 * Licensed under the MIT
 * Released on: June 6, 2012
 *
 * Tut: http://sothichweb.com/article/kiem_tra_form_hop_le_voi_javascript/8b70737
 * Demo: http://sothichweb.com/Demos/Demo_kiem_tra_form_voi_javascript.html
 *
 * Git: https://github.com/vankhuong/vksimple.validform
 */

window.onload = function () {
    /*------------- valid form register, design by Van Khuong ----------*/
    var inputs = document.forms['register'].getElementsByTagName('input');
    var run_onchange = false;

    function valid() {
        var errors = false;
        var reg_mail = /^[A-Za-z0-9]+([_\.\-]?[A-Za-z0-9])*@[A-Za-z0-9]+([\.\-]?[A-Za-z0-9]+)*(\.[A-Za-z]+)+$/;
        for (var i = 0; i < inputs.length; i++) {
            var value = inputs[i].value;
            var id = inputs[i].getAttribute('id');

            // create a span element
            var span = document.createElement('span');
            // remove remove span existing
            var p = inputs[i].parentNode;
            if (p.lastChild.nodeName == 'SPAN') {
                p.removeChild(p.lastChild);
            }

            // check empty
            if (value == '') {
                span.innerHTML = 'Thông tin được yêu cầu';
            } else {
                if (id == 'email') {
                    if (reg_mail.test(value) == false) {
                        span.innerHTML = 'Email không hợp lệ (ví dụ: abc@gmail.com)';
                    }
                    var email = value;
                }
                if (id == 'confirm_email' && value != email) {
                    span.innerHTML = 'Email nhập lại chưa đúng';
                }
                // check password field
                if (id == 'password') {
                    if (value.length < 6) {
                        span.innerHTML = 'Password phải từ 6 ký tự';
                    }
                    var pass = value;
                }
                // check password confirm field
                if (id == 'confirm_pass' && value != pass) {
                    span.innerHTML = 'Password nhập lại chưa đúng';
                }
                // check phone number
                if (id == 'phone' && isNaN(value) == true) {
                    span.innerHTML = 'Số điện thoại phải là kiểu số';
                }
            }

            // if have error, append span, run onchange, submit return false, hightlight border
            if (span.innerHTML != '') {
                inputs[i].parentNode.appendChild(span);
                errors = true;
                run_onchange = true;
                inputs[i].style.border = '1px solid #c6807b';
                inputs[i].style.background = '#fffcf9';
            }
        } // end for

        if (errors == false) {
            alert('Đăng ký thành công');
        }
        return !errors;
    } // end valid()

    // Chay ham kiem tra
    var register = document.getElementById('submit');
    register.onclick = function () {
        return valid();
    }

    // check error with onchange event
    for (var i = 0; i < inputs.length; i++) {
        var id = inputs[i].getAttribute('id');
        inputs[i].onchange = function () {
            if (run_onchange == true) {
                this.style.border = '1px solid #999';
                this.style.background = '#fff';
                valid();
            }
        }
    } // end for
} // end onload