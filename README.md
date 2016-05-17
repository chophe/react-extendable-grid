# react-extendable-grid [under development]
A simple react grid component that is highly extendable

##Installation

```
npm install --save react-extendable-grid
```

##Usage

##### Simple example:
```javascript
var React = require("react");
var ReactDom = require("react-dom");
var {Grid, Column} from "react-extendable-grid";

let data = [
  { name: 'a', age: 28 },
  { name: 'b', age: 15 },
  { name: 'c', age: 35 }
];

ReactDom.render(
    <Grid data={data}>
        <Column title="Name">
            {(p) => p.name}
        </Column>
        <Column title="Age">
            {(p) => p.age}
        </Column>
        <Column title="Static">
            static value
        </Column>
    </Grid>,
    document.getElementById("react-root")
);
```


##### Filter columns:
Filtering columns can be done by `filterMethod` prop through `Column` component, it is also possible to
customize the filter component by passing `filterComponent` prop, The `filterComponent` should have an `onChange` prop
with a callback that its argument will be available in `filterMethod` prop.
```javascript
<Grid data={data} showFilterBox={true}>
    <Column title="Name" filterMethod={(p, v) => p.name.indexOf(v) > -1}>
        {(p: Person) => p.name}
    </Column>
    <Column title="Age"
        filterComponent={<input type="checkbox"/>}
        filterMethod={(p, e) => e.target.checked ? p.age > 20 : p.age <= 20}>
        {(p) => p.age}
    </Column>
    <Column title="Static" filterComponent={<input type="checkbox"/>}>
        static value
    </Column>
</Grid>
```

##### Sort columns:
Sorting can be done by providing `sortMethod` prop through `Column` component. The callback should have two arguments which represent
two row of the data and returns `0` for equality, and `-1` `1` for inequality
```javascript
<Grid data={data}>
    <Column title="Name">
        {(p) => p.name}
    </Column>
    <Column title="Age"
        sortMethod={(a, b) => a.age < b.age ? -1 : a.age > b.age ? 1 : 0}>
        {(p) => p.age}
    </Column>
    <Column title="Static" filterComponent={<input type="checkbox"/>}>
        static value
    </Column>
</Grid>
```

##Build

```
npm install
typings install
npm run build
```

##Run example
```
npm run example
```
