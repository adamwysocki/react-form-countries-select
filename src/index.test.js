// index.test.js
import React from "react";
import SelectCountries from "./index";
import renderer from "react-test-renderer";
import Enzyme, { shallow, render, mount } from "enzyme";
import sinon, { stub } from "sinon";
import Adapter from "enzyme-adapter-react-16";

// React 16 Enzyme Adapter
Enzyme.configure({ adapter: new Adapter() });

it("should render", () => {
  const onCountrySelect = stub();
  const component = renderer.create(<SelectCountries onChange={onCountrySelect} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it("should render without a default option if default option is turned off", () => {
  const onCountrySelect = stub();
  const wrapper = mount(<SelectCountries onChange={onCountrySelect} hasDefaultOption={false} />);
  const select = wrapper.find("select");
  expect(select.contains(<option value="null">Select a country ...</option>)).toEqual(false);
});

it("should render with the default option text specified", () => {
  const onCountrySelect = stub();
  const wrapper = mount(<SelectCountries onChange={onCountrySelect} defaultOptionText={"Country ..."} />);
  const select = wrapper.find("select");
  expect(select.contains(<option value="null">Country ...</option>)).toEqual(true);
});

it("should render with a custom formatted label", () => {
  const onCountrySelect = stub();
  const component = renderer.create(<SelectCountries onChange={onCountrySelect} valueTemplate={"[CODE] - [NAME]"} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it("should call onChange when select option is changed", () => {
  const onChange = sinon.spy();
  const event = { currentTarget: { value: 1 } };
  const wrapper = shallow(<SelectCountries onChange={onChange} />);
  wrapper.find("#country").simulate("change", event);
  expect(onChange.called).toEqual(true);
});

it("should call not call onChange when default option is selected", () => {
  const onChange = sinon.spy();
  const event = { currentTarget: { value: "null" } };
  const wrapper = shallow(<SelectCountries onChange={onChange} />);
  wrapper.find("#country").simulate("change", event);
  expect(onChange.called).toEqual(false);
});
