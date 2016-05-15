import React = require("react");
import ReactDom = require("react-dom");
import {Grid,Column} from "../../src/index.tsx";

interface Person{
    name?:string;
    age?:number;
}

let data:Person[] = [
    {
        name:'raoof',
        age:28
    },
    {
        name:'hojat',
        age:29
    }
];

ReactDom.render(
    <Grid data={data} >
        <Column title="Name">
            {(p:Person)=>p.name}
        </Column>
        <Column title="Age">
            {(p:Person)=>p.age}
        </Column>
        <Column title="Static">
            static value
        </Column>
    </Grid>,
    document.getElementById("react-root")
);
