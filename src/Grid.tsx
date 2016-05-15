import React = require("react");
import {Column, ColumnProps} from "./Column";
import {isFunction} from "./utils/helpers";

interface Props {
    data?: any[];
    children?: any[];
}
interface State {

}

class Grid extends React.Component<Props, State>{

    static propTypes: Props = {

    }

    constructor(props: Props) {
        super(props);
    }

    resolveChild(child, data, rowIndex) {
        if (isFunction(child))
            return child(data, rowIndex);
        else
            return child;
    }

    render() {

        let props = this.props;
        let data = props.data || [];
        let columns: { props: ColumnProps }[] = props.children;

        return <table>
            <thead>
                <tr>
                    {columns.map((c, colIndex) => {
                        return <th key={colIndex}>{c.props.title}</th>
                    }) }
                </tr>
            </thead>
            <tbody>
                {data.map((d, rowIndex) => {
                    let columnsContents = [];
                    columns.map((c, colIndex) => {
                        columnsContents.push(<td key={colIndex}>{this.resolveChild(c.props.children, d, rowIndex) }</td>);
                    });
                    return <tr key={rowIndex}>{columnsContents}</tr>
                }) }
            </tbody>
        </table>;
    }

}

export {Grid};
