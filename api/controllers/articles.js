const mongoose = require('mongoose');
const Article = require('../models/articles');
const Category = require('../models/category');

module.exports ={
    getAllArticles: (req, res)=>{

        Article.find().populate('categoryId','title').then((articles) =>{
            res.status(200).json({
                articles
            })
        }).catch(error =>{
            res.status(500).json({
                error
            })
        });
    }, 
    getArticleById:(req,res)=>{

        const articleId = req.params.articleId;

        Article.findById(articleId).populate('categoryId','title').then((article)=>{
            res.status(200).json({
                article
            })
        }).catch(error =>{
            res.status(500).json({
                error
            })
        });
    },
    createNewArticle: (req, res)=>{
        console.log(req.file);
        const { title, description, content , categoryId} = req.body;

        Category.findById(categoryId).then((category)=>{
            if(!category){
                return res.status(404).json({
                    message: 'category not found',
                })
            }

            const article = new Article({
                _id : new mongoose.Types.ObjectId(),
                title ,
                description,
                content,
                categoryId
            });

            return articles.save();
        }).then(()=>{
            article.save().then(()=>{
                res.status(200).json({
                    message: 'Create new article'
                })    
            }).catch(error =>{
                res.status(500).json({
                    error
                })
            });
        })      
    }, 
    updateArticle: (req, res)=>{
        const articleId = req.params.articleId;
        const { categoryId } = req.body;

        Article.findById(articleId).then((article)=>{
            if (!article)
            return res.status(404).json({
                message :' Article not found'
            })
        }).then(()=>{
            if(categoryId){
                return Category.findById(categoryId).then((category)=>{
                    if(!category){
                        return res.status(404).json({
                            message:'Category not found'
                        })
                    }
                    return Article.updateOne({_id:articleId}, req.body);
                }).then(()=> {
                    res.status(200).json({
                        message : 'updated article'
                    })
                }).catch(error =>{
                    res.status(500).json({
                        error
                    })
                });
            }
         
            Article.updateOne({_id: articleId} , req.body).then(()=>{
                res.status(200).json({
                    message: `Updated article - ${articleId}`
                })  
            }).catch(error =>{
                res.status(500).json({
                    error
                })
            });
        })      
    },
    deleteArticle: (req, res)=>{
        const articleId = req.params.articleId;

        Article.findById(articleId).then((article)=>{
            if (!article)
            return res.status(404).json({
                message :' Article not found'
            })
        }).then(()=>{
            Article.deleteOne({_id: articleId} , req.body).then(()=>{
                res.status(200).json({
                    message: `Article deleted - ${articleId}`
                })  
            }) 
        }).catch(error =>{
            res.status(500).json({
                error
            })
        });
    }
}