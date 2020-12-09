// import { EnumPermissions } from './ConstantsConfig';

const regexTest = (reg, string) => {
  const regex = new RegExp(`${reg.replace(/\//, '\\/')}`);
  return regex.test(string);
};

// declaração de referência de rotas para buscar link das rotas em outros arquivos
const ROUTES = {
  DEFAULT: {
    src: () => '/',
    path: match => regexTest('/{1}$', match),
  },
  LOGIN: {
    src: () => '/login',
    path: match => regexTest('/login$', match),
  },
  CHAT: {
    src: () => '/chat',
    path: match => regexTest('/chat$', match),
  },
  // SEARCH: {
  //   src: (search = ':search') => `/program/search/${search}`,
  //   path: match => regexTest('/program/search$', match),
  // },
  // PROGRAM_EPISODES: {
  //   src: (fontId = ':fontId', url = ':url') => `/program/episodes/${fontId}/${url}`,
  //   path: match => regexTest('/program/episodes$', match),
  // },
  // PROGRAM_VIDEOS: {
  //   src: (fontId = ':fontId', url = ':url') => `/program/episodes/videos/${fontId}/${url}`,
  //   path: match => regexTest('/program/episodes/videos$', match),
  // },

  // MODELOS: '/modelos',
  // GERENCIAR_MODELOS_SALVAR: id =>
  // `/gerenciar/modelos/salvar/${(!!id || id === 0) ? id : ':id?'}`,
};

// declaração de rotas para roteamento da aplicação
const RoutesConfig = [
  // newRoute(ROUTES.Admin(), import('pages/Admin/AdminPage'), EnumPermissions.ADMIN),
  { path: ROUTES.DEFAULT.src(), component: import('../views/home/HomeView'), permissions: [], isProtected: true },
  { path: ROUTES.LOGIN.src(), component: import('../views/login/LoginView'), permissions: [], isProtected: false },
  { path: ROUTES.CHAT.src(), component: import('../views/chat/ChatView'), permissions: [], isProtected: true }
];

// manter rota NotFound em ultimo lugar
RoutesConfig.push({
  path: undefined,
  component: import('../views/not-found/NotFoundView'),
  permissions: [],
  isProtected: false
});

export { RoutesConfig, ROUTES };
