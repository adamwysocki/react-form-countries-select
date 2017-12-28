/* @flow */
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { countries } from "./data/countries";

/**
 * Some constants.
 */
const NAME_LITERAL = "[NAME]";
const CODE_LITERAL = "[CODE]";
const DEFAULT_OPTION_STRING = "Select a country ...";
const DEFAULT_SELECT_STYLE = `
    min-width: 10rem;
    padding: 0.5rem 0;
    margin: 0.125rem 0 0;
    font-size: 1rem;
    color: #212529;
    text-align: left;
    list-style: none;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 0.25rem;
`;

/**
 * Type definition for class props.
 */
type Props = {
  defaultOptionText?: string,
  hasDefaultOption?: boolean,
  valueTemplate?: string,
  onChange: Function,
  style?: any,
  className?: string
};

/**
 * React class for country select in a form
 * @class CountriesSelect
 */
class CountriesSelect extends React.Component<Props> {
  /**
   * @memberof CountriesSelect
   * @static
   */
  static defaultProps = {
    hasDefaultOption: true,
    defaultOptionText: DEFAULT_OPTION_STRING,
    valueTemplate: NAME_LITERAL,
    style: {},
    className: null
  };

  /**
   * @memberof CountriesSelect class.
   * @static
   * @property {bool} [hasDefaultOption] - Toggles default option on/off.
   * @property {string} [defaultOptionText] - Customized text for the default option.
   * @property {string} [valueTemplate] - Customized template for the "value" in each select option.
   * @property {func} onChange - Function to fire with newly selected data
   * @property {Object} style - React style. Javascript object with camelCase css properties.
   * @property {string} className - CSS class. Overrides all default styles (see render method)
   */
  static propTypes = {
    hasDefaultOption: PropTypes.bool,
    defaultOptionText: PropTypes.string,
    valueTemplate: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    style: PropTypes.any,
    className: PropTypes.string
  };

  /**
   * Parse the template passed in to display each option's "value".
   * @memberof CountriesSelect class.
   * @param {string} template - The template passed into the component.
   * @param {string} countryName - The name of the country from the current iteration.
   * @param {string} countryCode - The two charater code for the country from the current iteration.
   */
  parseTemplate = (template: string, countryName: string, countryCode: string) => {
    template = template.replace(NAME_LITERAL, countryName);
    template = template.replace(CODE_LITERAL, countryCode);
    return template;
  };

  /**
   * Handle onChange fired from select element. Checks to make sure the default option
   * doesn't fire a change.
   *
   * @memberof CountriesSelect class.
   * @param {SyntheticEvent<HTMLSelectElement>} event - The html event object
   */
  change = (event: SyntheticEvent<HTMLSelectElement>) => {
    const index = event.currentTarget.value;
    if (index === "null") return;
    const selectedCountry = countries[index];
    this.props.onChange(event, selectedCountry);
  };

  /**
   * React render method.
   * @return {string} - HTML markup for the component.
   */
  render() {
    // Setup the default option
    let defaultOption = <option value="null">{this.props.defaultOptionText}</option>;

    if (!this.props.hasDefaultOption) {
      defaultOption = null;
    }

    // Setup the style. className won't override styled component, so if caller specifies
    // className, set styled component style to nothing. It's all or none.
    let componentStyle = DEFAULT_SELECT_STYLE;

    if (this.props.className) {
      componentStyle = "";
    }

    const Wrapper = styled.div`
      > select {
        ${componentStyle};
      }
    `;

    return (
      <Wrapper>
        <select
          id="country"
          name="country"
          onChange={this.change}
          style={this.props.style}
          className={this.props.className || ""}
        >
          {defaultOption}
          {countries.map((country, i) => {
            const valueTemplate = this.props.valueTemplate || NAME_LITERAL;
            return (
              <option key={country.name} value={i}>
                {this.parseTemplate(valueTemplate, country.name, country.abbreviation)}
              </option>
            );
          })}
        </select>
      </Wrapper>
    );
  }
}

export default CountriesSelect;
