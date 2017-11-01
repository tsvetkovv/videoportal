import { GraphQLEnumType } from 'graphql';
import { USER_ROLES } from '../../constants';

const RoleType = new GraphQLEnumType({
  name: 'Role',
  values: {
    [USER_ROLES.admin]: { value: USER_ROLES.admin },
    [USER_ROLES.user]: { value: USER_ROLES.user },
  },
});

export default RoleType;
