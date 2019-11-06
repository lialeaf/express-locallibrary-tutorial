const Book = require('../models/book');

//显示站点欢迎页面
exports.index = (req, res) => {
    res.send('未实现：站点首页');
};

// 显示完整的图书列表
exports.book_list = (req, res) => {
    res.send('未实现：图书列表');
};

// 为每位图书显示详细信息的页面
exports.book_detail = (req, res) => {
    res.send('未实现：图书详细信息：' + req.params.id);
};

// 由 GET 显示创建图书的表单
exports.book_create_get = (req, res) => {
    res.send('未实现：图书创建表单的 GET');
};

// 由 POST 处理图书创建操作
exports.book_create_post = (req, res) => {
    res.send('未实现：创建图书的 POST');
};

// 由 GET 显示删除图书的表单
exports.book_delete_get = (req, res) => {
    res.send('未实现：图书删除表单的 GET');
};

// 由 POST 处理图书删除操作
exports.book_delete_post = (req, res) => {
    res.send('未实现：删除图书的 POST');
};

// 由 GET 显示更新图书的表单
exports.book_update_get = (req, res) => {
    res.send('未实现：图书更新表单的 GET');
};

// 由 POST 处理图书更新操作
exports.book_update_post = (req, res) => {
    res.send('未实现：更新图书的 POST');
};