var moment = require('moment');
import cFetch from '../utils/cFetch';
import {API_CONFIG} from '../config/api';
import _ from "lodash";
import React, {Component} from 'react';
import {Card, Tag, Input, Row, Col, Checkbox, Radio, DatePicker, Button, Form, Select} from 'antd';

export function formatDateTime(value) {
  return moment(value * 1000).format("YYYY-MM-DD hh:mm")
}
export const formItemLayout4_8 = {
  labelCol: {span: 4},
  wrapperCol: {span: 8},
};
export const formItemLayout4_16 = {
  labelCol: {span: 4},
  wrapperCol: {span: 16},
};
export const formItemLayout4_20 = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
};

export const formItemLayout6_16 = {
  labelCol: {span: 6},
  wrapperCol: {span: 16}
};

export function format_yesno(value) {
  return value ? "是" : "否"
}
export function formatDate(value) {
  return moment(value * 1000).format("YYYY-MM-DD")
}

export function requiredConf() {
  return {rules: [{required: true, message: '不能为空!'}]}
}
export async function getUpToken() {
  return await fetch(API_CONFIG.host + API_CONFIG["qiniu_uptoken"])
    .then(function (response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    }).then(function (data) {
      console.log("eeeee", data)
      return data.uptoken
    })
}

export function getImageThumb(img_url) {
  if (img_url == "") {
    return ""
  } else {
    return img_url + "-thumb"
  }
}

export function uploadProps() {

  return {
    action: 'http://upload.qiniu.com',
    showUploadList: false,
    listType: 'picture-card',
    defaultFileList: [],
    data: (file) => {
      return file.postData;
    },
    onChange: (info) => {
      var that = this;
      if (info.file.status === 'done') {
        let imageUrl = "http://ogl8q7hrr.bkt.clouddn.com/" + info.file.response.key + "-thumb";
        that.setState({
          fileList: [
            {url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'},
            {url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'}
          ]
        });

        // that.props.form.setFieldsValue({"page.pic": imageUrl})
      }
    },
    beforeUpload(file) {
      return new Promise(function (resolve) {
        let reader = new FileReader(file);
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          getUpToken().then(function (token) {
            let data = Object.assign(file, {
              postData: {token: token}
            });
            resolve(data)
          })
        }
      })
    },
    onPreview: (file) => {
      this.setState({
        priviewImage: file.url,
        priviewVisible: true,
      });
    }
  }
};
//获取json 键值对 数量
export function getJsonLength(jsonData) {

  var jsonLength = 0;

  for (var item in jsonData) {

    jsonLength++;

  }

  return jsonLength;

}
//比较json 一层的是否相等 ， 调用方法 Compare(jsonObjA, jsonObjB) 返回值 true or false
export function Compare(objA, objB) {
  if (!isObj(objA) || !isObj(objB)) return false; //判断类型是否正确
  if (getJsonLength(objA) != getJsonLength(objB)) return false; //判断长度是否一致
  return CompareObj(objA, objB, true);//默认为true
}
export function CompareObj(objA, objB, flag) {
  for (var key in objA) {
    if (!flag) //跳出整个循环
      break;
    if (!objB.hasOwnProperty(key)) {
      flag = false;
      break;
    }
    if (!isArray(objA[key])) { //子级不是数组时,比较属性值
      if (objB[key] != objA[key]) {
        flag = false;
        break;
      }
    } else {
      if (!isArray(objB[key])) {
        flag = false;
        break;
      }
      var oA = objA[key], oB = objB[key];
      if (oA.length != oB.length) {
        flag = false;
        break;
      }
      for (var k in oA) {
        if (!flag) //这里跳出循环是为了不让递归继续
          break;
        flag = CompareObj(oA[k], oB[k], flag);
      }
    }
  }
  return flag;
}


// 比较   【 obj , obj ...  】 [obj .....]
export function compareArrayObj(arr1, arr2) {
  // 判断两个参数是否是数组
  if (Array.isArray(arr1) == false)return false;
  if (Array.isArray(arr2) == false)return false;

  //比较两个参数的数组长度
  if (arr1.length != arr2.length)return false;
  // 如果都相等，进入第三次比较
  let maxArrayLength = Math.max(arr1.length, arr2.length);//取两个数组的最大值，其实没必要
  let eqCount = 0;//两个数组 相同值的累计
  //遍历并且比较两个数组的所有元素 （元素是object的）
  for (let item1 of arr1) {
    for (let item2 of arr2) {
      if (Compare(item1, item2)) {
        eqCount++;
      }
    }
  }

  if (eqCount == maxArrayLength) {
    return true
  } else {
    return false
  }
}

// 比较   【 obj , obj ...  】 [obj .....] 完全相等
export function eqArrayObj(arr1, arr2) {
  if (!compareArrayObj(arr1, arr2)) return false; // 比较数组 最大长度等是否相等
  arr1.map((item, index) => {
    if (!Compare(item, arr2[index])) { // 如果某个下标的对象不相等，返回不相等
      return false;
    }
  });
  // 如果前面没有错误 ，就说明数组的下标等 全部相等
  return true;
}


// 数组比较
export function compareArray(arr1, arr2) {
  // 判断两个参数是否是数组
  if (Array.isArray(arr1) == false)return false;
  if (Array.isArray(arr2) == false)return false;
  //比较两个参数的数组长度
  if (arr1.length != arr2.length)return false;
  // 如果都相等，进入第三次比较
  let maxArrayLength = Math.max(arr1.length, arr2.length);//取两个数组的最大值，其实没必要

  for (let i = 0; i <= maxArrayLength; i++) {
    if (arr1[i] != arr2[i])return false
  }
  return true
}

export function isObj(agreement) {
  //判断参数是否是对象，因为 数组也是对象，所以要先判断是不是数组
  if (agreement instanceof Array) {
    return false
  } else if (agreement instanceof Object) {
    return true;
  }
}
function isArray(obj) {
  if (Array.isArray) {
    return Array.isArray(obj);
  } else {
    return Object.prototype.toString.call(obj) === "[object Array]";
  }
}
// 去除array:[ obj ]中的相同元素
export function clearArrayObjEqualItem(array = [], key = "id") {
  // 提取所有的 key
  let keys = [], deletes = [], arr = [].concat(array);
  array.map((item, index) => {
    if (_.includes(keys, item[key])) {
      // 存在 说明需要删除
      deletes.push(index)
    } else {
      // 不存在,表示第一次出现
      keys.push(item[key])
    }
  });
  // 先倒序   在删除 , index 不会错
  deletes = deletes.reverse();
  deletes.map((i) => {
    arr.splice(i, 1)
  });
  return arr
}


//抽取数组 [ obj  ]中某个对象的属性集合
export function getArrayObjKeys(array = [], key = "id") {
  // 提取所有的 key
  let keys = [];
  array.map((item) => {
    keys.push(item[key])
  });
  return keys;
}

//获取日期范围
export function getDateRange(type, format = "range") {
  let start = null;
  let end = null;
  switch (type) {
    case "today":
      start = moment().startOf('day');
      end = moment().endOf('day');
      break;
    case "3day":
    case "week":
      moment().startOf('week');
      end = moment().endOf('week');
      break;
    case "latest_week":
      start = moment().add(-7, 'days');
      end = moment();
      break;
    case "latest_month":
      start = moment().add(-30, 'days');
      end = moment()
      break;
    case "month":
      start = moment().startOf('month');
      end = moment().endOf('month');
      break;
    case "latest_3month":
      start = moment().subtract(3, "months").endOf('month');
      end = moment().startOf('month');
      break;
    default:
      return []
  }
  if (format == "raw") {
    if (type == "today") {
      return [start.format("YYYY-MM-DD HH:mm"), end.format("YYYY-MM-DD HH:mm")]
    }
    return [start.format("YYYY-MM-DD"), end.format("YYYY-MM-DD")];
  } else {
    return [start, end]
  }

}

//获取某年的日期范围
export function getDateRangeByYear(year) {
  let start = moment(year).startOf("year")
  let end = moment(year).endOf("year")
  return [start, end]
}

// 统计 value 在 array 中出现的次数   第三个参数，从第几个开始找
export function countValueInArrayNum(array = [], value = "", index = 0) {
  let count = 0;
  for (let i = index; i < array.length; i++) {
    if (array[i] === value) {
      count++;
    }
  }
  return count;
}

// 统计 values 在 array 中出现的次数   第三个参数，从第几个开始找
export function countValuesInArrayNum(array = [], values = [], index = 0) {
  let count = 0;
  for (let i = index; i < array.length; i++) {
    if (_.includes(values, array[i])) {
      count++;
    }
  }
  return count;
}

export function renderPercentTxt(value) {
  if (value) {
    return <span className={value>0 ? "text-green" : "text-red"}>{value}%</span>;
  }else{
    return "";
  }
}

export function renderPercentTag(value) {
  if (value) {
      return <Tag color={value>0 ? "green": "red"}>{value}%</Tag>
  }else{
    return "";
  }
}

export function renderTextPlacehold(value){
  return value ? value : "--"
}
