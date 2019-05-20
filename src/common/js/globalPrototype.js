// 全局注册方法
import fetch from './fetch'
import { Loading } from 'element-ui';
export default {
    install(Vue, options) {
        Vue.prototype.elLoading = null,
        //跳转 新页面打开
        Vue.prototype.openNewWindow = function(query) {
            let host = window.location.host;
            let jumpUrl = 'http:/\/' + host + query
            console.log(jumpUrl)
            window.open(jumpUrl);
        }
        Vue.prototype.axiosPost = function(url, data) {
                return fetch({
                    url: url,
                    method: 'post',
                    data: data || {}
                })
            }
            // data 为obj类型
        Vue.prototype.axiosGet = function(url, data) {
                let params = ''
                if ((!!data)) {
                    params = Vue.prototype.setParams(data)
                    url = url + '?' + params
                }
                return fetch({
                    url: url,
                    method: 'get',
                })
            }
            // put  --> /workflow/{state}/{code}
        Vue.prototype.axiosPut = function(url) {
                return fetch({
                    url: url,
                    method: 'put',
                })
            }
            // 返回当前环境网关链接
        Vue.prototype.gatewayUrl = function() {
            console.log(fetch.defaults.baseURL)
            return fetch.defaults.baseURL
        }
        Vue.prototype.setParams = function(params) { //http://stackoverflow.com/questions/22678346/convert-javascript-object-to-url-parameters/22678423
                return Object.keys(params).map(function(k) {
                    return encodeURIComponent(k) + "=" + encodeURIComponent(params[k]);
                }).join('&');
            }
            //查询日期当月向前推N月 已‘00:00:00’结束 Num :是前N个月
        Vue.prototype.preMonth = function(Num) {
                Num == undefined ? Num = 1 : Num = Num
                    // console.log(Num)
                let date = new Date();
                let newDate = new Date(date.setMonth(date.getMonth() - Num))
                let preMonth = newDate.getFullYear() + "-" + Number(newDate.getMonth() + 1) + "-" + newDate.getDate() + " 00:00:00"; //三十天之前日期
                preMonth = Vue.prototype.dateTImeReset(preMonth);
                return preMonth;
            }
            //查询日期当月或向后推N月 已‘23:59:59’结束 Num :是前N个月
        Vue.prototype.NowMonth = function(Num) {
            Num == undefined ? Num = 0 : Num = Num
                // console.log(Num)
            let date = new Date();
            let newDate = new Date(date.setMonth(date.getMonth() + Num))
            let NowMonth = newDate.getFullYear() + "-" + Number(newDate.getMonth() + 1) + "-" + newDate.getDate() + " 23:59:59";
            NowMonth = Vue.prototype.dateTImeReset(NowMonth);
            return NowMonth;
        }

        Vue.prototype.getNowFormatDate = function() {
            var date = new Date();
            var seperator1 = "-";
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var currentdate = year + seperator1 + month + seperator1 + strDate;
            return currentdate;
        }

        // 验证中文名称
        Vue.prototype.isChinaName = function(name) {
            const pattern = /^[\u4E00-\u9FA5]{1,6}$/;
            // console.log(pattern.test(name))
            return pattern.test(name);
        }

        // 验证手机号
        Vue.prototype.isPhoneNo = function(phone) {

            const pattern = /^1\d{10}$/;
            console.log(pattern.test(phone))
            return pattern.test(phone);
        }

        // 验证身份证
        Vue.prototype.isCardNo = function(card) {
                const pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
                return pattern.test(card);
            }
            // 验证密码为 字母加数字
        Vue.prototype.isPassword = function(password) {
                const pattern = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/;
                return pattern.test(password);
        }
            // 验证 纯数字
        Vue.prototype.isInumber = function(number) {
                const pattern = /^[0-9]*$/;
                return pattern.test(number);
        }
        // 验证 纯数字
        Vue.prototype.isDecimal = function(number,digit) {
            //默认为 1位小数
            digit = digit || 1;
            let pattern = /^[0-9]+(?:\.[0-9]{1})?$/;
            if(digit == 1){
                pattern = /^[0-9]+(?:\.[0-9]{1})?$/
            }else if(digit == 2){
                pattern = /^[0-9]+(?:\.[0-9]{1,2})?$/
            }else if(digit == 3){
                pattern = /^[0-9]+(?:\.[0-9]{1,3})?$/
            }else{
                pattern = /^[0-9]+(?:\.[0-9]{1,4})?$/
            }
            return pattern.test(number);
        }
            // 邮箱检验
        Vue.prototype.isEmail = function(email) {
            const pattern = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
            return pattern.test(email);
        }
        // 字母或数字
        Vue.prototype.isNumbOrEn = function(email) {
            const pattern = /^[a-zA-Z\d]+$/;
            return pattern.test(email);
        }
        // 中文或字母或数字
        Vue.prototype.isCnOrNumbOrEn = function(email) {
            const pattern = /^[\u4E00-\u9FA5a-zA-Z\d]+$/;
            return pattern.test(email);
        }
            //纯字母
        Vue.prototype.isLetter = function(str) {
                const reg = /^[a-zA-Z]*$/;
                return reg.test(str)
            }
            //小写字母校验 + 数字
        Vue.prototype.isLowerEnNum = function(str) {
                const reg = /^[a-z0-9]*$/;
                return reg.test(str)
            }
            //小写字母校验 + 数字
        Vue.prototype.isLowerEn = function(str) {
                const reg = /^[a-z]*$/;
                return reg.test(str)
            }
            //字母大小写 + 数字
        Vue.prototype.isLetterNumb = function(str) {
                // const reg= /^[a-zA-Z][a-zA-Z0-9]*$/;
                const reg = /^[A-Z]+\d+$/;
                // console.log(reg.test(str))
                return reg.test(str)
            }
            //非符号
        Vue.prototype.isNoSign = function(str) {
                const reg = /^[\u4E00-\u9FA50-9A-Za-z]*$/;
                return reg.test(str)
            }
            //非字母
        Vue.prototype.isNoLetter = function(str) {
                const reg = /^[\u4E00-\u9FA50-9`~!@#$^&*()=+-|{}':;',\\[\\\].·<>/?~！～@#￥……&*（）——|{}【】‘；：”“'。，、？]*$/;
                return reg.test(str)
            }
            //不包含特殊表情符号
        Vue.prototype.isNoEmoji = function(str) {
                const reg = /^[\u4E00-\u9FA50-9a-zA-Z`~!@#$^&*()+=\\-|{}':;',\\[\\\].·<>/?~！～@#￥……&*（）——|{}【】‘；：”“'。，、？]*$/;
                return reg.test(str)
            }
            // url
        Vue.prototype.isUrl = function(url) {
            const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?*'\\+&%$#=~_-]+))*$/;
            return reg.test(url)
        }
        Vue.prototype.numbCapital = function(str) {
            str = str + '';
            let len = str.length - 1;
            let idxs = ['', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千', '万', '十', '百', '千', '亿'];
            let num = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
            return str.replace(/([1-9]|0+)/g, function($, $1, idx, full) {
                // console.log('$---------------------')
                // console.log($)
                // console.log($1)
                // console.log(idx)
                // console.log(idxs[len-idx])
                let pos = 0;
                if ($1[0] != '0') {
                    pos = len - idx;
                    if (idx == 0 && $1[0] == 1 && idxs[len - idx] == '十') {
                        return idxs[len - idx];
                    }
                    return num[$1[0]] + idxs[len - idx];
                } else {
                    let left = len - idx;
                    let right = len - idx + $1.length;
                    if (Math.floor(right / 4) - Math.floor(left / 4) > 0) {
                        pos = left - left % 4;
                    }
                    if (pos) {
                        return idxs[pos] + num[$1[0]];
                    } else if (idx + $1.length >= len) {
                        return '';
                    } else {
                        return num[$1[0]]
                    }
                }
            });
        }

        Vue.prototype.getObjKey = function(obj) {
            // console.log('按钮权限--------');
            // console.log(obj)
            let list = [];
            for (var i in obj) {
                list.push(i)
            }
            // console.log('按钮权限--------');
            // console.log(list)
            return list;
        }

        Vue.prototype.jsonObjReset = function(json, obj) {
                json.map(item => {
                    // console.log(item.resCode);
                    for (var i in obj) {
                        // console.log(i);
                        if (item.resCode == i) {
                            obj[i] = item.success
                        }
                    }
                })
                return obj;
            }


            // 日期格式化 2018-08-08 08:08:08
            Vue.prototype.dateTImeReset = function(timeStamp) {
                // let timestamp = Date.parse(new Date(stringTime));
                // let time = timestamp.getFullYear()+timestamp.getMonth()+timestamp.getDate()+" "+timestamp.getHours()+":"+timestamp.getMinutes()+":"+timestamp.getSeconds();
                var date = new Date(timeStamp.replace(/-/g, "/"));
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                m = m < 10 ? ('0' + m) : m;
                var d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                var h = date.getHours();
                h = h < 10 ? ('0' + h) : h;
                var minute = date.getMinutes();
                var second = date.getSeconds();
                minute = minute < 10 ? ('0' + minute) : minute;
                second = second < 10 ? ('0' + second) : second;
                return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
            },
            // 全屏 loading 提示状态
            Vue.prototype.openLoading = function() {
                this.elLoading = Loading.service({
                    lock: true,
                    text: 'Loading...',
                    spinner: 'el-icon-loading',
                    customClass : 'eboss-loading',
                    background: 'rgba(0, 0, 0, 0.5)'
                })
            }


    }
}
