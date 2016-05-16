import React = require("react");
import qsort = require("quicksorter");

interface Props{
    children?:any;
    title?:string;
    filterMethod?:Function;
    filterComponent?:any;
    sortMethod?:(a:any,b:any)=>number;
}
interface State{

}

class Column extends React.Component<Props,State>{

    static propTypes:Props={

    }

    constructor(props:Props) {
        super(props);
    }

    render(){
        return <div></div>;
    }

}

export {Column,Props as ColumnProps};
