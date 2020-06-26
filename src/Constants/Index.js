export const PublicRoute = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  FORGOTPASWORD: '/auth/forgotPasword',
  URLWEBSITE:'https://puz.supply/'
};
export const PrivateRoute = {
  HOME: '/',
  SETINGS: '/setings',
  ORDER: '/order',
  CREATEORDER: '/create_order',
};
export const NameStorage = {
    USERID:'userId',
    USERORDE:'countOrder',
    USERINFO:'userInfo',
    USERTOKEN:'token',
    // ORDERID:'__Order',
}

export const OrderStatut = {
  valuating:{
    class: "valuating",
    text:'Розглядається'
  },
  unordered:{
    text:'Незавершені',
    class: ""
  }
}
