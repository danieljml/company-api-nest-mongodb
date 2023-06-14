import * as mongoose from 'mongoose';

const uri = 'mongodb://admin:secret@mongodb:27017/';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: () => mongoose.connect(uri),
  },
];
