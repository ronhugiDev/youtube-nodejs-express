const mongoose = require('mongoose');
const Category = require('../models/category');

module.exports ={
    getAllCategories: (req, res)=>{

        Category.find().then((categories) =>{
            res.status(200).json({
                categories
            })
        }).catch(error =>{
            res.status(500).json({
                error
            })
        });
    }, 
    getCategoryById:(req,res)=>{

        const categoryid = req.params.categoryid;

        Category.findById(categoryid).then((category)=>{
            res.status(200).json({
                category
            })
        }).catch(error =>{
            res.status(500).json({
                error
            })
        });
    },
    createNewCategory: (req, res)=>{
        const { title, description } = req.body;

        const category = new Category({
            _id : new mongoose.Types.ObjectId(),
            title ,
            description,
        });

        category.save().then(()=>{
            res.status(200).json({
                message: 'Create new category'
            })    
        }).catch(error =>{
            res.status(500).json({
                error
            })
        });
    }, 
    updateOneCategory: (req, res)=>{
        const categoryid = req.params.categoryid;

        Category.findById(categoryid).then((category)=>{
            if (!category)
            return res.status(404).json({
                message :' Category not found'
            })
        }).then(()=>{
            Category.updateOne({_id: categoryid} , req.body).then(()=>{
                res.status(200).json({
                    message: `Updated category - ${categoryid}`
                })  
            }).catch(error =>{
                res.status(500).json({
                    error
                })
            });
        })      
    },
    deleteCategory: (req, res)=>{
        const categoryid = req.params.categoryid;
    
        Category.findById(categoryid).then((category)=>{
            if (!category)
            return res.status(404).json({
                message :' Category not found'
            })
        }).then(()=>{
            Category.deleteOne({_id: categoryid} , req.body).then(()=>{
                res.status(200).json({
                    message: `category deleted - ${categoryid}`
                })  
            }).catch(error =>{
                res.status(500).json({
                    error
                })
            });
        })   
    }
}