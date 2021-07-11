import { mutationType } from 'nexus';
import checkout from './fields/checkout';

export const Mutation = mutationType({
  definition(t) {
    checkout(t);
  },
});
