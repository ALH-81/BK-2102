// 随机验证码函数
// 参数1: 验证码位数  默认值 6
// 参数2: 验证码内容  默认值 数字 大小写英文字母
// 参数3: 验证码字符是否可以重复  默认值 false 不能重复
function setVc(num = 6 , string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ' , bool = false){
    // 定义变量 存储 验证码内容
    var vc = '';

    // 通过循环 每次 生成随机索引下标 获取 随机字符 拼接入 验证码字符串
    // for(var i = 1 ; i <= num ; i++){
    //     var index = parseInt( Math.random() * string.length );

    //     // 如果 bool 是 true  直接拼接     验证码内容可以重复
    //     // 如果 bool 是 false 判断之后拼接 验证码内容不能重复
    //     if(bool){
    //         // 直接拼接
    //         vc += string[index];
    //     }else{
    //         // 判断拼接 验证码没有当前字符 再拼接
    //         if( vc.indexOf( string[index] ) === -1){
    //             // 没有执行拼接
    //             vc += string[index];
    //         }else{
    //             // 有了再循环一次
    //             i--;
    //         }
    //     }
    // }


    // while 循环
    while( vc.length < num ){
        var index = parseInt( Math.random() * string.length );

        if(bool){
            // 直接拼接
            vc += string[index];
        }else{
            // 判断拼接 验证码没有当前字符 再拼接
            if( vc.indexOf( string[index] ) === -1){
                // 没有执行拼接
                vc += string[index];
            }
        }
    }

    
    // 返回值是 生成 随机验证码
    return vc;
}


// 随机颜色

// 方法1
// rgb
function setColor3(){
    return `rgb(${ parseInt( Math.random()*256 ) },${ parseInt( Math.random()*256 ) },${ parseInt( Math.random()*256 ) })`;
}

// 方法2
// rgba
function setColor4(){
    return `rgba(${ parseInt( Math.random()*256 ) },${ parseInt( Math.random()*256 ) },${ parseInt( Math.random()*256 ) },${ parseInt( Math.random()*11 ) / 10 })`;
}

// 获取当前时间对象
// 返回值 是 当前时间对应的 年月日 星期 时分秒
// 月份是结果+1 星期是对应的中文 小时分钟秒前导补零
function getNowTime(){
    // 1, 获取当前时间对象
    var time = new Date();

    // 2, 获取4位年份
    var year = time.getFullYear();

    // 3, 获取2位月份
    var month = time.getMonth()+1;

    // 4, 获取日期
    var day = time.getDate();

    // 5, 获取星期 
    var weekArr = ['星期日' , '星期一' , '星期二' , '星期三' , '星期四' , '星期五' , '星期六' ];
    var week = weekArr[ time.getDay() ];

    // 6, 获取小时 
    var hours = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();

    // 7, 获取分钟 
    var minutes = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();

    // 8, 获取秒
    var seconds = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();

    // 9, 以对象的形式 返回
    return {year , month , day , week , hours , minutes , seconds};
    
}




// 倒计时函数
// 参数: 终止时间
// 返回值: 对象类型 储存 倒计时 天 小时 分钟 秒
function getCountDown(endTime){
    // 1, 创建当前时间对象
    var st = new Date();

    // 2, 创建终止时间对象
    var et = new Date(endTime)

    // 3, 获取时间差
    // 终止时间戳 - 起始时间戳 结果 除以 1000 取整
    var t = parseInt( ( et.getTime() - st.getTime() ) / 1000 ) ;

    // 4, 将 时间差 计算对应的 天 小时 分钟 秒
    var day = parseInt( t / (24*60*60) );
    var hour = parseInt( ( t % (24*60*60) ) / (60*60) );
    var minute = parseInt( ( t % (60*60) ) / 60 );
    var second =  t % 60 ;

    // 5, 前导 补零
    day = day < 10 ? '0' + day : day;
    hour = hour < 10 ? '0' + hour : hour;
    minute = minute < 10 ? '0' + minute : minute;
    second = second < 10 ? '0' + second : second;

    // 5, 以对象的形式返回数据
    return {day,hour,minute,second};
}  


// 获取标签样式兼容语法
// 参数1 标签对象
// 参数2 css样式属性
function myGetStyle(element , type){
    if(window.getComputedStyle){
        return window.getComputedStyle(element)[type];
    }else{
        return element.currentStyle[type];
    }
}


// 运动函数
// 参数1: 运动的标签对象
// 参数2: 运动的属性和目标属性值 对象形式
// 参数3: 运动结束的回调函数 默认值 是空函数
function move( element , object , cb = function(){} ){
    // 1, 定义变量 存储 定时器个数
    let num = 0;

    // 2, for...in 循环遍历 参数2 也就是要运动的属性和目标位置数值
    for(let type in object){
        // 变量累加1 证明生成一个新的定时器
        num++;

        // 获取原始数据和目标位置数据 兼容透明度
        let startVal = type === 'opacity' ? myGetStyle(element , type)*100 : parseInt( myGetStyle(element , type) );
        let endVal = type === 'opacity' ? object[type]*100 : object[type];

        // 通过定时器 计算步长 累加步长 到达目标位置 清除定时器
        let time = setInterval( ()=>{
            //  计算步长 (目标值 - 初始值) / 次数
            //  每次都不一样 
            let step = ( endVal - startVal ) / 10;

            //  步长取整 大于0 向上取整 小于0 向下取整
            step = step > 0 ? Math.ceil( step ) : Math.floor( step );

            //  累加步长值
            startVal += step;

            //  给 标签对应css属性赋值 兼容透明度
            element.style[type] = type === 'opacity' ? startVal/100 : startVal + 'px';

            // 判断 运动到 目标位置
            if( startVal === endVal ){
                // 清除定时器
                clearInterval(time);

                // 变量累减1 证明清除了一个定时器
                num--;

                // 如果num是 0 证明 所有定时器都清楚了
                // 执行回调函数
                if( num === 0 ){
                    cb();
                }
            }
        } , 20 );
    }
}
