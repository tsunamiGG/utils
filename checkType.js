//判断数据类型方法
const isType = (type,obj) => return Object.prototype.toString.call(obj) === `[object ${type}]`;

isType('Array',[1,2])
=> true
isType('String','s')
=> true
isType('String',[])
=> false

//循环注册检测方法

let Type = {};
let type = ['String', 'Array', 'Number', 'Object', 'Null', 'Undefined', 'Boolean'];
for (let i = 0; i <= type.length; i++) {
    let _type = type[i];
    (function (type) {
        Type[`is${type}`] = function (obj) {
            return Object.prototype.toString.call(obj) === `[object ${type}]`;
        }

    })(_type)
}

Type.isArray([])
=> true
Type.isNull(null)
=> true
Type.isNull([])

=> false
Type.isUndefined(undefined)
=> true