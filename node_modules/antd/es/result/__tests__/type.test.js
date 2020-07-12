import * as React from 'react';
import Result from '..';
describe('Result.typescript', function () {
  it('status', function () {
    var result = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Result, {
      status: "404",
      title: "404",
      subTitle: "Sorry, the page you visited does not exist."
    }), /*#__PURE__*/React.createElement(Result, {
      status: 404,
      title: "404",
      subTitle: "Sorry, the page you visited does not exist."
    }));
    expect(result).toBeTruthy();
  });
});