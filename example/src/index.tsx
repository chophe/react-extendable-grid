import React = require("react");
import ReactDom = require("react-dom");
import {Grid, Column} from "../../src/index.tsx";

interface Person {
    name?: string;
    age?: number;
}

let data: Person[] = [
    {
        name: 'raoof 1',
        age: 28
    },
    {
        name: 'raoof 2',
        age: 19
    },
    {
        name: 'hojat',
        age: 29
    }
];

ReactDom.render(
    <Grid data={data}
        showFilterBox={true}>
        <Column title="Name"
            filterMethod={(p: Person, v: string) => p.name.indexOf(v) > -1}>
            {(p: Person) => p.name}
        </Column>
        <Column title="Age"
            filterComponent={<input type="checkbox"/>}
            filterMethod={(p: Person, e) => e.target.checked ? p.age > 20 : p.age <= 20}
            sortMethod={(a: Person, b: Person) => a.age < b.age ? -1 : a.age > b.age ? 1 : 0}>
            {(p: Person) => p.age}
        </Column>
        <Column title="Static" filterComponent={<input type="checkbox"/>}>
            static value
        </Column>
    </Grid>,
    document.getElementById("react-root")
);
