MONGO_HOST="mongodb://mongo:27017/database_web"
DB_NAME="database_web"
COLLECTION_NAME="activities"
JSON_FILE="actividades.json"

mongoimport --db ${DB_NAME} --collection ${COLLECTION_NAME} --type json --file ${JSON_FILE} --jsonArray

echo "Base de datos importada"