import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';

import Results from '../src/panels/Results';

describe('<Results>', function () {
  it('should render the last5Calculations', function () {
    const wrapper = shallow(<Results result={ 20 }/>);
    expect(wrapper.props().result).to.be.defined;
  });

});