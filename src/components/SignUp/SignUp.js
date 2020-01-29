import React, { useState } from 'react'
import { Form, Input, Checkbox, Button } from 'antd';

const RegistrationForm = props => {
  const [confirmDirty, setConfirmDirty] = useState(false)

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  const handleConfirmBlur = e => {
    const { value } = e.target;
    setConfirmDirty({ confirmDirty: confirmDirty || !!value });
  };

  const compareToFirstPassword = (rule, value, callback) => {
    const { form } = props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Your passwords do not match');
    } else {
      callback();
    }
  };

  const validateToNextPassword = (rule, value, callback) => {
    const { form } = props;
    if (value && confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

    const { getFieldDecorator } = props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <Form {...formItemLayout} onSubmit={handleSubmit}>
        <h1 style={{textAlign: "center", marginBottom: "30px"}}>Create Your Account</h1>
        <Form.Item label="First Name">
          {getFieldDecorator('firstName', {
            rules: [
              {
                required: true,
                message: 'Please enter your first name!',
              }
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Last Name">
          {getFieldDecorator('lastName', {
            rules: [
              {
                required: true,
                message: 'Please enter your last name!',
              }
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="E-mail">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Password" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                min: 8,
                message: 'Password must contain at least 8 characters',
              },
              {
                validator: validateToNextPassword,
              }
            ],
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item label="Confirm Password" hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: compareToFirstPassword,
              },
            ],
          })(<Input.Password onBlur={handleConfirmBlur} />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          {getFieldDecorator('agreement', {
            valuePropName: 'checked',
            initialValue: false,
                rules: [{
                  required: true,
                  transform: value => (value || undefined),  // Those two lines
                  type: 'boolean',                           // Do the magic
                  message: 'Please agree to the terms and conditions.',
                }],
          })(
            <Checkbox>
              I agree to the <a href="/">terms and conditions</a>
            </Checkbox>,
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    );
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);
export default WrappedRegistrationForm;
