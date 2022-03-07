/*
export function someAction (context) {
}
*/
var u = {
    username:'Vincent',
    role:'superUser',
    token:'AAABBBCCCDDD000222'
}
export function login(context, user, pass){
    var u = {
        username:user,
        role:'superUser',
        token:'AAABBBCCCDDD000222',
        isValid:true
    }
    context.commit('login', u)
    //
}