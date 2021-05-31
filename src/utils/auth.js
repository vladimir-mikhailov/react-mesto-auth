class Auth {
  constructor({baseUrl}) {
    this.baseUrl = baseUrl;
  }

  _handleResponse(res) {
    //return res.ok ? res.json() : Promise.reject(res)
    return res.ok ? res.json() : res.json().then(Promise.reject.bind(Promise))
  }

  getUserData (token) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(res => this._handleResponse(res))
  }

  register({email, password}) {
    return fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password})
    })
      .then(res => this._handleResponse(res))
  }

  login({email, password}) {
    return fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password})
    })
      .then(res => this._handleResponse(res))
  }
}

const auth = new Auth({
  baseUrl: 'https://auth.nomoreparties.co'
});

export default auth
