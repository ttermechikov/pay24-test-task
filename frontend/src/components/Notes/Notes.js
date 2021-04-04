import React from 'react';
import { ListGroup } from 'react-bootstrap';

class Notes extends React.Component {
  constructor() {
    super();

    this.state = { notes: [] };
  }

  async componentDidMount(e) {
    // if is not authorized
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      return (window.location.href = '/login');
    }

    try {
      const res = await fetch('http://127.0.0.1:3001/api/notes', {
        headers: {
          'x-auth': authToken,
        },
      });
      const json = await res.json();

      this.setState({ notes: json.notes });
    } catch (e) {
      alert('Error - cannot to fetch notes - ', e);
    }
  }

  render() {
    const { notes } = this.state;

    return (
      <ul className="mt-4">
        {notes.map((note) => (
          <>
            <ListGroup key={note.firstName + note.lastName}>
              <ListGroup.Item>
                <p>
                  <i>Full name: </i>
                  {`${note.firstName} ${note.lastName} ${
                    note.middleName || ''
                  }`}
                </p>
              </ListGroup.Item>
              <ListGroup.Item>
                <p>
                  <i>Phone:</i> {note.phone}
                </p>
              </ListGroup.Item>
              <ListGroup.Item>
                <p>
                  <i>Address:</i> {note.address}
                </p>
              </ListGroup.Item>
            </ListGroup>
            <br />
          </>
        ))}
      </ul>
    );
  }
}

export default Notes;
