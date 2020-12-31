const {contents} = require('../../models');

module.exports = {
    post: async (req,res)=>{
        const {userId,title,content,subclassId} = req.body
        console.log(req.body)
        //contents table에 저장
        if(!title || !content || !subclassId) {
            res.status(422).send('message: insufficient parameters supplied.')
            return;
        }
        await contents.create({
            userId:userId,
            title:title,
            content:content,
            subclassId:subclassId,
            hit:0
        })
        .then((data)=>res.send(200,data))
        .catch((err)=>res.send(404,`Failed to write this content Because of Error : ${err}`));
    }
}