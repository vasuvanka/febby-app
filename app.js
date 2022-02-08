const {
    Febby
} = require('febby')

const config = {
    port: 3000,
    serviceName: 'test app'
}

const app = new Febby(config)

const api = app.router('/api')

app.route(
    {
        path:'/',
        method: 'get',
        handler: (req,res) => {
            res.json({'status':'febby up'})
        }
    }
)

const list = []
let counter = 0

app.route({
    path:'/list',
    method: 'get',
    handler: (req,res) => {
        res.json({list})
    }
})

app.route({
    path: '/list',
    method: 'post',
    handler: (req,res) => {
        const {body} = req
        body.id = ++counter
        list.push(body)
        res.json({list})
    }
})

app.route({
    path:'/list/:id',
    method: 'delete',
    handler: function (req,res){
        const id = req.params.id
        const index = list.findIndex(i => i.id == id)
        if (index != -1){
            list.splice(index,1)
        }
        res.json({list})
    }
})

app.route({
    path:'/list',
    method:'delete',
    handler: (req,res)=>{
        list.length = 0
        res.json({list})
    }
})

app.bootstrap(()=>{
    console.log('app started on port : '+ config.port)
})