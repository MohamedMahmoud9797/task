export default class apiFeatuers{
    constructor(mongooseQuery, queryString){
        this.mongooseQuery =mongooseQuery
        this.queryString =queryString
    }

    pagnation(){
        let page = this.queryString.page *1 || 1
        if (this.queryString.page <=0  ) page=1
        let skip = (page-1)*4
        this.page =page
        this.mongooseQuery.skip(skip).limit(4)
        return this
    }

    filter(){
        let filterObj = {...this.queryString}
        let excludedQuery = ["page", "sort", "keyword","fileds"]
        excludedQuery.forEach((q)=>{
    delete filterObj[q]
}
        )
        filterObj =JSON.stringify(filterObj)
        filterObj = filterObj.replace(/\bgt|gte|lt|lte\b/g ,match =>'$${match}')
        filterObj =JSON.parse(filterObj)
        //sort
        //build query
        this.mongooseQuery.find({filterObj})
         return this

    }

    sort(){
        if (this.queryString.sort) {
            let sortBy = this.queryString.sort.split(",").join(" ")
            mongooseQuery.sort(sortBy)
        }
        return this
    }
    search(){
        if (this.queryString.keyword) {
            this.mongooseQuery.find({
                $or:[{"title":{$regex : this.queryString.keyword, $options : "i"}},
                {"description":{$regex : this.queryString.keyword, $options : "i"}},
            
            ]
            })
            
        }
        return this
    }

    fields(){

        if (this.queryStringfields) {
            let fields = this.queryStringsplit(",").join(" ") //["-price", "sold"]=> price -_id
            this.mongooseQuery.sort(fields)
        }
        return this
    }
}