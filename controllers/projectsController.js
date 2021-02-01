const {  ProjectSchema } = require("../model/schemes")

exports.projectController = {
    add: async(req, res) => {
        try{
            const {header,purpose, tasks, relevance, conclusions, results, subject,
                date, presentationHtml, shortDescription, members, img} = req.body
                console.log(header)
            if(!header) return res.status(400).json({message: 'no data'})
            const post = new ProjectSchema({
                header,purpose, tasks, relevance, conclusions, results, subject,
                date, presentationHtml, shortDescription, members, img
            })
            const project = await post.save()
            res.status(201).json(project)
        } catch(e) {
            res.status(500).json({message: 'server error'})
        }
    },
    get: async(req, res) => {
        try{
            const {subject, id} = req.query
            const project = await ProjectSchema.find({subject, _id:id})
            res.status(200).json(project)
        } catch(e) {
            res.status(500).json({message: 'server error'})
        }
    }
}




