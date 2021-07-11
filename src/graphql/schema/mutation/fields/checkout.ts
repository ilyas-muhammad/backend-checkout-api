import { ObjectDefinitionBlock } from 'nexus/dist/definitions/objectType';
import { intArg, arg } from 'nexus';
import { Checkout, SkuEnum } from '../../type/Checkout';
import checkout from '../../../resolver/checkout';

export default (t: ObjectDefinitionBlock<'Mutation'>): void => {
  t.field('checkout', {
    type: Checkout,
    args: {
      sku: arg({ type: SkuEnum, required: true }),
      quantity: intArg({ required: true }),
    },
    resolve: (_, args) => {
      return checkout(args);
    },
  });
};
