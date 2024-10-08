import { MongoClient } from 'mongodb';
import { ObjectId } from 'mongodb';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const url = `mongodb://${host}:${port}/${database}`;

    this.client = new MongoClient(url, { useUnifiedTopology: true });

    this.client.connect()
      .then(() => {
        this.db = this.client.db(database);
        console.log('Connected successfully to MongoDB');
      })
      .catch((err) => {
        console.error('Failed to connect to MongoDB', err);
      });
  }

  isAlive() {
    return this.client.isConnected();
 

