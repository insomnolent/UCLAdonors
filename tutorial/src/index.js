import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import './index.css';

// const reactFormContainer = document.querySelector('.react-form-container');

class ReactFormLabel extends React.Component {
  constructor() {
    super();
  }

  render() {
    return(
      <label htmlFor={this.props.htmlFor}>{this.props.title}</label>
    )
  }
}

class ReactForm extends React.Component {
  constructor(prop) {
    super(prop);

    this.state = {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  }

  handleChange = (e) => {
    let newState = {};

    newState[e.target.name] = e.target.value;

    this.setState(newState);
  };

  handleSubmit = (e, message) => {
    e.preventDefault();

    let formData = {
      formSender: this.state.name,
      formEmail: this.state.email,
      formSubject: this.state.subject,
      formMessage: this.state.message
    }

    if (formData.formSender.length < 1 || formData.formEmail.length < 1 || formData.formSubject.length < 1 || formData.formMessage.length < 1) {
      return false;
    }
    var info = JSON.stringify(formData);
    console.log(info);
    $.ajax({
      url: 'http://localhost:3000/test.php',
      dataType: 'json',
      type: 'POST',
      data: JSON.stringify(formData),
      success: function(data) {
        // if (confirm('Thank you for your message. Can I erase the form?')) {
          document.querySelector('.form-input').val('');

      },
      error: function(xhr, status, err) {
        console.error(status, err.toString());
        alert('Why is there an error :(');
      }
    });

    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  render() {
    return(
      <form className='react-form' onSubmit={this.handleSubmit}>
        <h1>My Information</h1>
        <h2>Name</h2>
        <hr />
        <p>The name you enter here will be used for legal/tax purposes, and will appear as you enter it on any receipts or mailings you receive from UCLA.</p>
        <fieldset className='form-group'>
          <ReactFormLabel htmlFor='formName' title='Title: ' />
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="none">None</option>
            <option value="admiral">Admiral</option>
            <option value="ambassador">Ambassador</option>
            <option value="cardinal">Cardinal</option>
          </select>
        </fieldset>
        <fieldset className='form-group'>
          <ReactFormLabel htmlFor='formName' title='First Name:' />
          <input id='formName' className='form-input' name='name' type='text' ref='formName' required onChange={this.handleChange} value={this.state.name} />
        </fieldset>
        <fieldset className='form-group'>
          <ReactFormLabel htmlFor='formName' title='Middle Name:' />
          <input id='formName' className='form-input' name='name' type='text' ref='formName' required onChange={this.handleChange} value={this.state.name} />
        </fieldset>
        <fieldset className='form-group'>
          <ReactFormLabel htmlFor='formName' title='Last Name:' />
          <input id='formName' className='form-input' name='name' type='text' ref='formName' required onChange={this.handleChange} value={this.state.name} />
        </fieldset>
        <fieldset className='form-group'>
          <ReactFormLabel htmlFor='formName' title='Suffix 1:  ' />
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="none">None</option>
            <option value="admiral">Admiral</option>
            <option value="ambassador">Ambassador</option>
            <option value="cardinal">Cardinal</option>
          </select>
        </fieldset>
        <fieldset className='form-group'>
          <ReactFormLabel htmlFor='formName' title='Suffix 2:  ' />
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="none">None</option>
            <option value="admiral">Admiral</option>
            <option value="ambassador">Ambassador</option>
            <option value="cardinal">Cardinal</option>
          </select>
        </fieldset>
        <h2>Birth Date</h2>
        <hr />
        <select value={this.state.value} onChange={this.handleChange}>
          <option value="jan">January</option>
          <option value="feb">February</option>
          <option value="march">March</option>
          <option value="april">April</option>
        </select>
        <select value={this.state.value} onChange={this.handleChange}>
          <option value="one">1</option>
          <option value="two">2</option>
          <option value="three">3</option>
          <option value="four">4</option>
        </select>
        <select value={this.state.value} onChange={this.handleChange}>
          <option value="1980">1980</option>
          <option value="1981">1981</option>
          <option value="1982">1982</option>
          <option value="1983">1983</option>
        </select>

        <h2>UCLA Education</h2>
        <hr />
        <fieldset className='form-group'>
          <ReactFormLabel htmlFor='formEmail' title='Email:' />

          <input id='formEmail' className='form-input' name='email' type='email' required onChange={this.handleChange} value={this.state.email} />
        </fieldset>

        <fieldset className='form-group'>
          <ReactFormLabel htmlFor='formSubject' title='Subject:'/>

          <input id='formSubject' className='form-input' name='subject' type='text' required onChange={this.handleChange} value={this.state.subject} />
        </fieldset>

        <fieldset className='form-group'>
          <ReactFormLabel htmlFor='formMessage' title='Message:' />

          <textarea id='formMessage' className='form-textarea' name='message' required onChange={this.handleChange}></textarea>
        </fieldset>

        <div className='form-group'>
          <input id='formButton' className='btn' type='submit' placeholder='Send message' />
        </div>
      </form>
    )
  }
};

ReactDOM.render(
  <ReactForm />,
  document.getElementById("root")
);
