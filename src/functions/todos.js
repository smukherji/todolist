const { app } = require('@azure/functions');
const mongoose = require ('mongoose')
const { TodoModel } = require("./todoschema")
mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, autoIndex: true });
const con = mongoose.connection;

try {
    con.on('open', () => {
        console.log('Connected to the database');
    })
} catch (error) {
    console.log("Error: " + error);
}

app.http('getTodoList', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'todo',
    handler: async (request, context) => {
        context.log(`Http function getTodoList processed request for url "${request.url}"`);

        const todos = await con.model('TodoList').find({});

        return {
            jsonBody: {todos}
        }
    }
});

app.http('newTodo', {
    methods: ['POST'],
    authLevel: 'anonymous',
    route: 'todo',
    handler: async (request, context) => {
        context.log(`Http function newTodo processed request for url "${request.url}"`);

        const body = await request.json();
        // skipping validation -- but I can at least do some basic defaulting, and only grab the things I want.
        const newTodoResult = await con.model('TodoList').create({
            name: body?.name,
            items: body?.items
        });

        return{
            status: 201, /* Defaults to 200 */
            jsonBody: {_id: newTodoResult._id, name: newTodoResult.name, items:newTodoResult.items}
        };
    },
});