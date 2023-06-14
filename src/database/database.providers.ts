import * as mongoose from 'mongoose';

const uri =
  'mongodb+srv://database:database@testingcluster.wxdykeb.mongodb.net/?retryWrites=true&w=majority';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: () => mongoose.connect(uri),
  },
];
