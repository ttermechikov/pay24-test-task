import React from 'react';
import { Form, Button } from 'react-bootstrap';

class Auth extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  onSubmit = async (e) => {
    e.preventDefault();

    const { login, password } = this.state;

    if (!login || !password) {
      return alert('Введите логин и пароль');
    }

    const user = { login, password };

    const res = await fetch('http://127.0.0.1:3001/api/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: Object.keys(user)
        .map(
          (key) => encodeURIComponent(key) + '=' + encodeURIComponent(user[key])
        )
        .join('&'),
    });

    if (res.ok) {
      const authToken = res.headers.get('x-auth');
      localStorage.setItem('authToken', authToken);
      window.location.href = '/notes';
    } else {
      alert('Введены неверые данные! Повторите снова!');
      this.setState({
        login: '',
        password: '',
      });
    }
  };

  handleInputChange = (e) => {
    const target = e.target;
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  };

  componentDidMount(e) {
    const authToken = localStorage.getItem('authToken');

    if (authToken) {
      window.location.href = '/notes';
    }
  }

  render() {
    const { login, password } = this.state;

    return (
      <Form className="mt-4">
        <Form.Group controlId="formBasicInn">
          <Form.Label>Имя пользователя</Form.Label>
          <Form.Control
            type="text"
            name="login"
            value={login}
            onChange={this.handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicInn">
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            type="text"
            name="password"
            value={password}
            onChange={this.handleInputChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={this.onSubmit}>
          Submit
        </Button>
      </Form>
    );
  }
}

export default Auth;
