const Mock = require("mockjs");
const axios = require("axios");

const generate_random_graph_data = (req, res) => {
    let data = []
    let xAxisArray = []
    let yAxisArray = []

    try{
        for(let i=0; i<23; i++){
            xAxisArray.push(i)
        }
        for(let i=20; i<=65; i++){
            yAxisArray.push(i)
        }
    
        for(let i=0; i<23; i++){
            let yInd = Math.floor(Math.random(10) * 35);
            let zInd = Math.floor(Math.random() * 15)
    
            while(yInd===zInd)
            {
                zInd = Math.floor(Math.random() * 35)
            }
            data.push({
                x:xAxisArray[i],
                y:yAxisArray[yInd],
                z:yAxisArray[zInd]
            })
        }
        return res.json({
                data:data,
                status:"ok",
                message:"Generated Data Successfully"
            })

    }catch(err){
        return res.json({
            data:[],
            status:"error",
            message:"Problem while generating data"
        })
    }

    
}

const generate_random_tickets_data = async(req, res) => {
    return axios({
        method: 'get',
        url: "https://jsonplaceholder.typicode.com/comments",
      })
        .then((response) => {
            return res.json({
                status:"ok",
                data:response.data,
                message:"user data loaded successfully"
            })
        }).catch((err) => {
            return res.json({
                status:"err",
                data:err,
                message:"Problem while loading user data"
            })
        } )

} 


module.exports={
    generate_random_graph_data,
    generate_random_tickets_data
}