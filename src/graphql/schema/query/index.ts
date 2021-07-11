import { queryType } from 'nexus';
import healthCheck from './fields/healtCheck';

export const Query = queryType({
  definition(t) {
    healthCheck(t);
  },
});
