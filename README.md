# react-form-countries-select

[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)
[ ![Codeship Status for adamwysocki/react-form-states-select](https://app.codeship.com/projects/0f13f5d0-cd5a-0135-da01-166a8e542bbe/status?branch=master)](https://app.codeship.com/projects/262034)

A React select component that displays contains countries and fires a callback when a new one is selected.

## Installation

```sh
yarn add react-form-countries-select

- or -

npm install react-form-countries-select
```

## Usage

1 . Require react-form-countries-select after installation

```js
import CountriesSelect from "react-form-countries-select";
```

2 . Include react-form-countries-select component

```js
onCountrySelect = (event, country) => {
    // event {SyntheticEvent<HTMLSelectElement>} - React HTML event
    // country {Object} - Object representing the state
    // country.name {string} - The full name of the selected country
    // country.abbreviation {string} - The two character country code
}

<CountriesSelect onChange={this.onCountrySelect} />
```

## Parameters

| Parameter         | Type       | Description                                                                                                                                                                                                                                                                                |
| :---------------- | :--------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| onChange          | `function` | Callback with the selected country. Parameters are the HTML event and an object with the format { name: 'United States', abbreviation: 'US' }                                                                                                                                              |
| defaultOptionText | `string`   | The label to display for the default/unselected option. A user selecting this option will not fire the callback. (default: "Select a country ...")                                                                                                                                         |
| hasDefaultOption  | `boolean`  | Toggle the default option on or off (default: true)                                                                                                                                                                                                                                        |
| valueTemplate     | `string`   | A template to customize how the label in the drop down is displayed. [NAME] will display the full country name. [CODE] will display the two character country code. (default: [NAME]). These can be used in combination. ie. "([CODE]) - [NAME]" which will display "(US) - United States" |
| style             | `Object`   | Javascript object with camelCased CSS properties rather than a CSS string. Standard React styles                                                                                                                                                                                           |
| className         | `string`   | A CSS class name. The presence of this attribute will override all default styles. So it's all or none                                                                                                                                                                                     |

## Build

```js
yarn run build
npm run build
```

## Test

```js
yarn run test
npm run test
```

## Lint

```js
yarn run lint
npm run lint
```

## Flow

```js
yarn run flow
npm run flow
```

## License

MIT
