import React from 'react';
import { Form, Button } from 'react-bootstrap';

class NoteForm extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  onSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = ['inn', 'lastName', 'firstName', 'phone', 'address'];
    const isFieldsFilled = requiredFields.every(
      (field) => this.state[field] && this.state[field].length > 0
    );
    const note = requiredFields.reduce((acc, curr) => {
      acc[curr] = this.state[curr];
      return acc;
    }, {});

    if (isFieldsFilled) {
      // prepare a sending data
      let formBody = [];
      for (const property in note) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(note[property]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      formBody = formBody.join('&');

      const res = await fetch('http://127.0.0.1:3001/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: formBody,
      });

      if (res.ok) {
        requiredFields.forEach((field) =>
          this.setState({
            [field]: '',
          })
        );
        alert('Успешно добавлено');
        window.location.href = window.location.href + '';
      } else {
        this.setState({
          errors: 'Возникла ошибка! Проверьте данные и попробуйте еще раз!ы',
        });
      }
    } else {
      alert('Заполните все поля!');
    }
  };

  handleInputChange = (e) => {
    const target = e.target;
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <Form onSubmit={this.onSubmit} className="mt-4">
        <Form.Group controlId="formBasicInn">
          <Form.Label>ИНН</Form.Label>
          <Form.Control
            type="text"
            name="inn"
            onChange={this.handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicLastName">
          <Form.Label>Фамилия</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            onChange={this.handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicFirstName">
          <Form.Label>Имя</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            onChange={this.handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicMiddleName">
          <Form.Label>Отчество</Form.Label>
          <Form.Control
            type="text"
            name="middleName"
            onChange={this.handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPhone">
          <Form.Label>Телефон</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            onChange={this.handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicAddress">
          <Form.Label>Адрес</Form.Label>
          <Form.Control
            type="text"
            name="address"
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

export default NoteForm;
