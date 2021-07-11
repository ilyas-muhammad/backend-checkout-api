import { objectType, enumType } from 'nexus';

export const SkuEnum = enumType({
  name: 'SkuEnum',
  members: ['_120P90', '_43N23P', '_A304SD', '_234234'],
});

export const ScannedItem = objectType({
  name: 'ScannedItem',
  definition(t) {
    t.field('sku', { type: SkuEnum });
    t.string('name');
    t.int('quantity');
  },
});

export const Checkout = objectType({
  name: 'Checkout',
  definition(t) {
    t.float('total');
    t.field('items', { type: ScannedItem, list: true });
  },
});
