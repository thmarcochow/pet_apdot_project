const Dogs = require("../models/dogModel")

//filter, sorting and paginating

class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
        const queryObj = {...this.queryString}//queryString = req.query
        //console.log({before: queryObj})
        const excludedFields = ['page', 'sort', 'limit']
        excludedFields.forEach(el=> delete(queryObj[el]))

        //console.log({after: queryObj})

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)
        
        //console.log({ queryStr})
        this.query.find(JSON.parse(queryStr))

        return this;
    }

    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            //console.log(sortBy)

            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }

        return this;
        
    }

    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit;
        this.query=this.query.skip(skip).limit(limit)
        return this;
    }
}

const dogCtrl = {
    getDogs: async(req,res)=> {
        try {
            const features = new APIfeatures(Dogs.find(), req.query).filtering().sorting().paginating()
            const dogs = await features.query

            //res.json(dogs)
            res.json({
                status: 'success', 
                result: dogs.length,
                dogs: dogs
            })
        } catch (err) {
            return res.json({msg: err.message})
        }
    },
    createDog: async(req,res)=> {
        try {
            const {dog_id, dog_name, dog_desc, dog_dob, dog_status, dog_img} = req.body;
            //if(!dog_img) return res.json({msg: "No image upload"})

            const dog = await Dogs.findOne({dog_id})
            if(dog)
                return res.json({msg: "This dog already exist"})

            const newDog = new Dogs({
                dog_id, dog_name, dog_desc, dog_dob, dog_status, dog_img
            })

            await newDog.save()
            res.json({msg: "Create a dog"})

        } catch (err) {
            return res.json({msg: err.message})
        }
    },
    deleteDogs: async(req,res)=> {
        try {
            await Dogs.findByIdAndDelete(req.params.id)
            res.json({msg:"Deleted a Dog"})
        } catch (err) {
            return res.json({msg: err.message})
        }
    },
    updateDogs: async(req,res)=> {
        try {
            const {dog_id, dog_name, dog_desc, dog_dob, dog_status, dog_img} = req.body;
            //if(!dog_img) return res.json({msg: "No image upload"})

            await Dogs.findOneAndUpdate({_id: req.params.id},{dog_name, dog_desc, dog_dob, dog_status, dog_img
            })
            res.json({msg: "Updated a dog"})
        } catch (err) {
            return res.json({msg: err.message})
        }
    },
}

module.exports = dogCtrl