import { GraphQLEnumType } from 'graphql';
import { ORDERS } from '../../constants';

const OrderType = new GraphQLEnumType({
  name: 'Order',
  values: {
    [ORDERS.date]: { value: ORDERS.date },
    [ORDERS.rating]: { value: ORDERS.rating },
  },
});

export default OrderType;
