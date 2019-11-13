const {
    body,
    validationResult
} = require('express-validator/check');
const {
    sanitizeBody
} = require('express-validator/filter');

const Genre = require('../models/genre');
var Book = require('../models/book');
var async = require('async');

// 解决与此类似的错误：A
// Cast to ObjectId failed for value " 59347139895ea23f9430ecbb" at path "_id" for model "Genre"
var mongoose = require('mongoose');
// A end

// 显示完整的图书类别列表
exports.genre_list = function (req, res, next) {

    Genre.find()
        .sort([
            ['name', 'ascending']
        ])
        .exec(function (err, list_genres) {
            if (err) {
                return next(err);
            }
            //Successful, so render
            res.render('genre_list', {
                title: '图书种类列表',
                genre_list: list_genres
            });
        });

};

// 为每位图书类别显示详细信息的页面
exports.genre_detail = function (req, res, next) {

    //解决上述 A 的错误
    // var id = mongoose.Types.ObjectId(req.params.id);
    // A end

    async.parallel({
        genre: function (callback) {
            Genre.findById(req.params.id)
                .exec(callback);
        },

        genre_books: function (callback) {
            Book.find({
                    'genre': req.params.id
                })
                .exec(callback);
        },

    }, function (err, results) {
        if (err) {
            return next(err);
        }
        if (results.genre == null) { // No results.
            var err = new Error('Genre not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render
        res.render('genre_detail', {
            title: '图书种类详情',
            genre: results.genre,
            genre_books: results.genre_books
        });
    });

};

// 由 GET 显示创建图书类别的表单
exports.genre_create_get = function (req, res, next) {
    res.render('genre_form', {
        title: 'Create Genre'
    });
};

// 由 POST 处理图书类别创建操作
exports.genre_create_post = [

    // Validate that the name field is not empty.
    body('name', '图书类别不能为空！').isLength({
        min: 1
    }).trim(),

    // Sanitize (trim and escape) the name field.
    sanitizeBody('name').trim().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a genre object with escaped and trimmed data.
        var genre = new Genre({
            name: req.body.name
        });


        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            res.render('genre_form', {
                title: 'Create Genre',
                // genre: genre,
                genre: req.body,
                errors: errors.array()
            });
            return;
        } else {
            // Data from form is valid.
            // Check if Genre with same name already exists.
            Genre.findOne({
                    'name': req.body.name
                })
                .exec(function (err, found_genre) {
                    if (err) {
                        return next(err);
                    }

                    if (found_genre) {
                        // Genre exists, redirect to its detail page.
                        res.redirect(found_genre.url);
                    } else {

                        genre.save(function (err) {
                            if (err) {
                                return next(err);
                            }
                            // Genre saved. Redirect to genre detail page.
                            res.redirect(genre.url);
                        });

                    }

                });
        }
    }
];

// 由 GET 显示删除图书类别的表单
exports.genre_delete_get = function (req, res, next) {

    async.parallel({
        genre: function (callback) {
            Genre.findById(req.params.id).exec(callback)
        },
        genres_books: function (callback) {
            Book.find({
                'genre': req.params.id
            }).exec(callback)
        },
    }, function (err, results) {
        if (err) {
            return next(err);
        }
        if (results.genre == null) { // No results.
            res.redirect('/catalog/genres');
        }
        // Successful, so render.
        res.render('genre_delete', {
            title: 'Delete genre',
            genre: results.genre,
            genre_books: results.genres_books
        });
    });

};

// 由 POST 处理图书类别删除操作
exports.genre_delete_post = function (req, res, next) {

    async.parallel({
        genre: function (callback) {
            Genre.findById(req.body.genreid).exec(callback)
        },
        genres_books: function (callback) {
            Book.find({
                'genre': req.body.genreid
            }).exec(callback)
        },
    }, function (err, results) {
        if (err) {
            return next(err);
        }
        // Success
        if (results.genres_books.length > 0) {
            // genre has books. Render in same way as for GET route.
            res.render('genre_delete', {
                title: 'Delete genre',
                genre: results.genre,
                genre_books: results.genres_books
            });
            return;
        } else {
            // genre has no books. Delete object and redirect to the list of genres.
            Genre.findByIdAndRemove(req.body.genreid, function deletegenre(err) {
                if (err) {
                    return next(err);
                }
                // Success - go to genre list
                res.redirect('/catalog/genres')
            })
        }
    });
};

// 由 GET 显示更新图书类别的表单
exports.genre_update_get = (req, res, next) => {
    // res.send('未实现：图书类别更新表单的 GET');
    Genre.findById(req.params.id)
        .exec(function (err, genre) {
            if (err) {
                return next(err);
            }
            if (genre == null) {
                // var err = new Error('The genre id #{req.params.id} not exists.');
                // return next(err);
                res.redirect('/catalog/genres');
            }
            res.render('genre_form', {
                title: 'Update genre',
                genre: genre
            })
        })

};

// 由 POST 处理图书类别更新操作
// exports.genre_update_post = (req, res) => {
//     res.send('未实现：更新图书类别的 POST');
// };
exports.genre_update_post = [
    //Validate fields.
    body('name', 'Name must not be empty.').trim().isLength({
        min: 1
    }),

    //Sanitize fields.
    sanitizeBody('name').trim().escape(),

    //Process
    (req, res, next) => {
        const errors = validationResult(req);

        var genre = new Genre({
            name: req.body.name,
            _id: req.params.id
        });
        if (!errors.isEmpty) {
            res.render('genre_form', {
                title: 'Update genre',
                genre: genre,
                errors: errors.array()
            })
        } else {
            Genre.findByIdAndUpdate(req.params.id, genre, {}, function (err, thegenre) {
                if (err) {
                    return next(err);
                }
                //
                res.redirect(thegenre.url);
            });
        }
    }
];