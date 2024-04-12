# TODOLIST
TODO List with Azure functions and Cosmos DB

## Setting up the environment

Install the following dependencies:

```
npm install mongoose
npm install mongodb
```

## Testing

Testing with curl:

```
curl --location http://localhost:7071/api/todo --header "Content-Type:application/json" --data '{"name":"shivali","items":[{"task":"testing","status":"todo"}]}' --verbose

curl --location http://localhost:7071/api/todo/6618d335168fd1a2295031c --verbose

curl --location http://localhost:7071/api/todo --verbose
```
