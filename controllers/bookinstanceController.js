const Bookinstance = require('../models/bookinstance');

// 显示完整的图书副本列表
exports.bookinstance_list = (req, res) => {
    res.send('未实现：图书副本列表');
};

// 为每位图书副本显示详细信息的页面
exports.bookinstance_detail = (req, res) => {
    res.send('未实现：图书副本详细信息：' + req.params.id);
};

// 由 GET 显示创建图书副本的表单
exports.bookinstance_create_get = (req, res) => {
    res.send('未实现：图书副本创建表单的 GET');
};

// 由 POST 处理图书副本创建操作
exports.bookinstance_create_post = (req, res) => {
    res.send('未实现：创建图书副本的 POST');
};

// 由 GET 显示删除图书副本的表单
exports.bookinstance_delete_get = (req, res) => {
    res.send('未实现：图书副本删除表单的 GET');
};

// 由 POST 处理图书副本删除操作
exports.bookinstance_delete_post = (req, res) => {
    res.send('未实现：删除图书副本的 POST');
};

// 由 GET 显示更新图书副本的表单
exports.bookinstance_update_get = (req, res) => {
    res.send('未实现：图书副本更新表单的 GET');
};

// 由 POST 处理图书副本更新操作
exports.bookinstance_update_post = (req, res) => {
    res.send('未实现：更新图书副本的 POST');
};