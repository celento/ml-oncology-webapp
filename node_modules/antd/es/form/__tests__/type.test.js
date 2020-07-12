/* eslint-disable no-unused-expressions */
import * as React from 'react';
import Form from '..';
import Input from '../../input';
describe('Form.typescript', function () {
  it('Form.Item', function () {
    var form = /*#__PURE__*/React.createElement(Form, null, /*#__PURE__*/React.createElement(Form.Item, {
      name: "test"
    }, /*#__PURE__*/React.createElement(Input, null)));
    expect(form).toBeTruthy();
  });
});
/* eslint-enable */