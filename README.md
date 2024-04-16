# TODOLIST
TODO List with Azure functions and Cosmos DB

## Setting up the environment

Install the following dependencies:

```
npm install -g azurite
npm install mongoose
npm install mongodb
```

## Testing

Testing with curl:

```
curl --location http://localhost:7071/api/todo --header "Content-Type:application/json" --data '{"name":"shivali","task":"testing","status":"todo"}' --verbose

curl --location http://localhost:7071/api/todo/6618d335168fd1a2295031c --verbose

curl --location http://localhost:7071/api/todo --verbose

curl --request PUT --location http://localhost:7071/api/todo/6618d335168fd1a2295031c4 --header "Content-Type:application/json" --data '{"name":"sayan","task":"coding","status":"done"}' --verbose

curl --request DELETE --location http://localhost:7071/api/todo/66192816fa6fb0bbd36e431a --verbose
```
## References

- [Quickstart: Create a JavaScript function in Azure using Visual Studio Code](https://learn.microsoft.com/en-us/azure/azure-functions/create-first-function-vs-code-node)
- [Serverless TypeScript API: Store data in MongoDB with Azure Functions](https://learn.microsoft.com/en-us/azure/developer/javascript/tutorial/azure-function-cosmos-db-mongo-api)
