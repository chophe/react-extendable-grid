import React = require("react");
import {Column, ColumnProps} from "./Column";
import {isFunction, isUndefined, extend} from "./utils/helpers";
import quicksorter = require('quicksorter');

let qsort = quicksorter["default"];

interface Props {
    data?: any[];
    children?: any[];
    tableClassName?: string;
    containerClassName?: string;
    showFilterBox?: boolean;
}
interface State {
}

interface ColumnInfo {
    filterMethod?: Function;
    filterComponent?: any;
    filterOnChange?: Function;
    filterValue?: any;
    sortMethod?:(a:any,b:any)=>number;
    sorted?:boolean;
}

class Grid extends React.Component<Props, State>{

    state: State = {
    }

    static propTypes: Props = {

    }

    static defaultProps: Props = {
        showFilterBox: false
    }

    columnsInfo: { [colIndex: number]: ColumnInfo; } = {};

    constructor(props: Props) {
        super(props);
    }

    resolveChild(child, data, rowIndex) {
        if (isFunction(child))
            return child(data, rowIndex);
        else
            return child;
    }//▼▲

    render() {
        let props = this.props;

        let columns: { props: ColumnProps }[] = props.children;

        let originalData = props.data || [];
        let data = originalData.map(d=>d);
        for (let c in this.columnsInfo) {
            if(this.columnsInfo[c].sorted){
                qsort(data,this.columnsInfo[c].sortMethod);
                break;
            }
        }

        let {containerClassName, tableClassName} = props;
        if (isUndefined(containerClassName) && isUndefined(tableClassName)) {
            containerClassName = 'extendable-grid-container shadow-z-1';
            tableClassName = 'table table-hover';
        }

        return <div className={containerClassName}>
            <table className={tableClassName}>
                <thead>
                    <tr>
                        {columns.map((c, colIndex) => {

                            // TODO: move to componentWillMount && componentWillReceiveProps
                            if (!(colIndex in this.columnsInfo)) {
                                let columnInfo: ColumnInfo = {};
                                columnInfo.filterOnChange = (v) => {
                                    // TODO: if the typeof v is SyntheticEvent object then it will be null, extending it will prevent the bug, maybe there is some other way
                                    columnInfo.filterValue = typeof v == 'object' ? extend(v) : v;
                                    this.forceUpdate();
                                }
                                if (isUndefined(c.props.filterComponent)) {
                                    columnInfo.filterComponent = React.createElement('input', {
                                        onChange: (e: any) => columnInfo.filterOnChange(e.target.value)
                                    });
                                }
                                else {
                                    var newProps = extend(c.props.filterComponent.props,{
                                        onChange: (v: any) => columnInfo.filterOnChange(v)
                                    });
                                    columnInfo.filterComponent = React.cloneElement(c.props.filterComponent, newProps, c.props.filterComponent.children);
                                }
                                columnInfo.filterMethod = c.props.filterMethod;
                                columnInfo.sorted = false;
                                columnInfo.sortMethod = c.props.sortMethod;
                                this.columnsInfo[colIndex] = columnInfo;
                            }
                            return <th key={colIndex}>
                                <div>{c.props.title}</div>
                                {this.columnsInfo[colIndex].filterComponent}
                                <div onClick={()=>{
                                    for (let c in this.columnsInfo) {
                                        this.columnsInfo[c].sorted = false;
                                    }
                                    this.columnsInfo[colIndex].sorted = true;
                                    this.forceUpdate();
                                }}>▼</div>
                            </th>
                        }) }
                    </tr>
                </thead>
                <tbody>
                    {data.map((d, rowIndex) => {

                        let doRenderRow = true;

                        let columnsContents = [];
                        columns.map((c, colIndex) => {
                            columnsContents.push(<td
                                key={colIndex}
                                data-title={c.props.title}>
                                {this.resolveChild(c.props.children, d, rowIndex) }
                            </td>);

                            let columnsInfo = this.columnsInfo[colIndex];
                            if (isUndefined(columnsInfo.filterMethod) == false &&
                                columnsInfo.filterValue &&
                                columnsInfo.filterMethod(d, columnsInfo.filterValue) == false) {
                                doRenderRow = false;
                            }
                        });
                        return doRenderRow ? <tr key={rowIndex}>{columnsContents}</tr> : null;
                    }) }
                </tbody>
            </table>
        </div>;
    }

}

export {Grid};
