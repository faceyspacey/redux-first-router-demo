import routesMap from './routesMap';
// import jwt from 'jsonwebtoken'

export const isServer = typeof window === 'undefined';
const ssrRest =
  process.env.NODE_ENV === 'production'
    ? 'https://rfr.afanasiev.xyz'
    : 'http://localhost:3000';
const apiRest = isServer ? 'http://localhost:3000' : ssrRest;

export const fetchData = async (path, jwToken) =>
  fetch(`${apiRest}${path}`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${jwToken || ''}`,
    },
  }).then((data) => data.json());

export const isAllowed = (type, state) => {
  const role = routesMap[type] && routesMap[type].role; // you can put arbitrary keys in routes
  if (!role) return true;

  const user = isServer
    ? jwt.verify(state.jwToken, process.env.JWT_SECRET)
    : userFromState(state);

  if (!user) return false;

  return user.roles.includes(role);
};

// VERIFICATION MOCK:
// since middleware is syncrhonous you must use a jwt package that is sync
// like the one imported above. For now we will mock both the client + server
// verification methods:

const fakeUser = {roles: ['admin']};
const userFromState = ({jwToken, user}) => jwToken === 'real' && fakeUser;
const jwt = {
  verify: (jwToken, secret) => jwToken === 'real' && fakeUser,
};

// NOTE ON COOKIES:
// we're doing combination cookies + jwTokens because universal apps aren't
// single page apps (SPAs). Server-rendered requests, when triggered via
// direct visits by the user, do not have headers we can set. That's the
// takeaway.
