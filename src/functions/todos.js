const { app } = require('@azure/functions');
const mongoose = require ('mongoose');
const { ObjectId } = require('mongodb');
const { TodoModel } = require("./todoschema");

mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, autoIndex: true });
const con = mongoose.connection;

try {
    con.on('open', () => {
        console.log('Connected to the database');
    })
} catch (error) {
    console.log("Error: " + error);
}

// curl --location http://localhost:7071/api/todo --verbose
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

// curl --location http://localhost:7071/api/todo/6618d335168fd1a2295031c --verbose
app.http('getTodo', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'todo/{id}',
    handler: async (request, context) => {
        context.log(`Http function getTodo processed request for url "${request.url}"`);
        console.log('request.params.id', request.params.id);

        const id = request.params.id;
        if (ObjectId.isValid(id)) {
            const todo = await con.model('TodoList').findOne({ _id: id });

            if (todo) {
                return {
                    jsonBody: {todo: todo}
                }
            }
        }
        return {
            status:404,
            jsonBody: {error: "no todo found by that Id: " + request.params.id}
        }
    },
});

// curl -X POST --location http://localhost:7071/api/todo --header "Content-Type:application/json" --data '{"name":"shivali","items":[{"task":"testing","status":"todo"}]}' --verbose
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