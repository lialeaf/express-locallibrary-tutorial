const Genre = require('../models/genre');

// 显示完整的图书类别列表
exports.genre_list = (req, res) => {
    res.send('未实现：图书类别列表');
};

// 为每位图书类别显示详细信息的页面
exports.genre_detail = (req, res) => {
    res.send('未实现：图书类别详细信息：' + req.params.id);
};

// 由 GET 显示创建图书类别的表单
exports.genre_create_get = (req, res) => {
    res.send('未实现：图书类别创建表单的 GET');
};

// 由 POST 处理图书类别创建操作
exports.genre_create_post = (req, res) => {
    res.send('未实现：创建图书类别的 POST');
};

// 由 GET 显示删除图书类别的表单
exports.genre_delete_get = (req, res) => {
    res.send('未实现：图书类别删除表单的 GET');
};

// 由 POST 处理图书类别删除操作
exports.genre_delete_post = (req, res) => {
    res.send('未实现：删除图书类别的 POST');
};

// 由 GET 显示更新图书类别的表单
exports.genre_update_get = (req, res) => {
    res.send('未实现：图书类别更新表单的 GET');
};

// 由 POST 处理图书类别更新操作
exports.genre_update_post = (req, res) => {
    res.send('未实现：更新图书类别的 POST');
};