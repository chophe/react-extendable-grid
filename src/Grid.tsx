import React = require("react");

interface GridProps{

}
interface GridState{

}

class Grid extends React.Component<GridProps,GridState>{

    static propTypes:GridProps={

    }

    constructor(props:GridProps) {
        super(props);
    }

    render(){
        return <div>
            test
        </div>;
    }

}

export = Grid
