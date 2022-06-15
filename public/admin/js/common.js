function serializeToJson(form) {
    /**
        获取表单中用户输入的内容
        [{name: "email", value: "用户输入的内容"}]
    */
    let f = form.serializeArray();
    let obj = {};
    f.forEach(function (item) {
        obj[item.name] = item.value;
    })
    return obj;
}