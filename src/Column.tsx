import React = require("react");

interface Props{
    children?:any;
    title?:string;
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