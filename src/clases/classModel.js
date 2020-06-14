import m from "mongoose";
class Models {
    constructor(model){
        this.model = model
        this.udata=false
    }

    setUdata(udata){
        this.udata=udata
    }

    async getAll(){
        return await this.model.find({})
    }

    async getByValue(body){
        return await this.model.findOne(body,this.getProjection())
    }

    async getById(id){
        return await this.model.findById(id)
    }

    doConvertParam(body){
        return body
    }
    convertParam(body, updated=false){
        if(!updated)body.createdBy = m.Types.ObjectId(this.udata.payload.id)
        return this.doConvertParam(body)
    }

    convertParamDeleted(body, deleted=false){
        if(!deleted)body.deletedBy=m.Types.ObjectId(this.udata.payload.id), body.deleted=1, body.deletedAt=Date.now()
        return this.doConvertParam(body)
    }
    insert_result(resp){
        return resp._id
    }

    update_result(resp){
        return resp
    }

    delete_result(resp){
        return resp
    }

    processFilter(filter){
        return filter
    }

    getProjection(){
        return ''
    }

    async insert(obj){
        console.log(this.udata.payload);
        
        if(this.udata.payload.level<this.level)throw Error('Anda tidak punya akses untuk menambah data ini!')

        let resp = await this.model.create(this.convertParam(obj))
        return this.insert_result(resp)
    }

    async update(id, obj){
        let resp = await this.model.findByIdAndUpdate(id.id, this.convertParam(obj, true))
        return this.update_result(resp)
    }

    async delete(id, obj){
        let resp = await this.model.findByIdAndUpdate(id.id, this.convertParamDeleted(obj, true))
        return this.delete_result(resp)
    }

    async paging(limit, offset, filter, sort){
        const data = await this.model.find(this.processFilter(filter), this.getProjection(),{skip:parseInt(offset), limit:parseInt(limit), sort:sort});
        const total = await this.model.count(filter);
        return {data, total}
    }
}

module.exports = Models