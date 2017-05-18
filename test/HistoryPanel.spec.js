import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';

import HistoryPanel from '../src/panels/HistoryPanel';

describe('<HistoryPanel>', function () {
  it('should render the last5Calulations', function () {
  	var last5Calulations = ["2 X 3 = 6", "4 X 7 = 28"];
    const wrapper = shallow(<HistoryPanel last5Calulations={ last5Calulations }/>);
    expect(wrapper.props().last5Calulations).to.be.defined;
    expect(wrapper.find('.last-calc')).to.have.length(2);
    expect(wrapper.find('.heading')).to.have.length(1);
  });

});