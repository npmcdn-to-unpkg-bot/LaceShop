const tokenKey = 'ts57Token'

export default {
    login(useName){
        localStorage[tokenKey] = useName
    },
    logout() {
        delete localStorage[tokenKey]
    },
    loggedIn() {
        return !!localStorage[tokenKey]
    },
    getUserName(){
        return localStorage[tokenKey]
    }
}
