import { Mongo } from 'meteor/mongo';

const CollectionUtil = {
  create: (name) => {
    const collection = new Mongo.Collection(name);
    collection.deny({
      insert() {
        return true;
      },
      update() {
        return true;
      },
      remove() {
        return true;
      },
    });

    return collection;
  }
}

export default CollectionUtil;
