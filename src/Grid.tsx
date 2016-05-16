import React = require("react");
import {Column, ColumnProps} from "./Column";
import {isFunction, isUndefined, extend} from "./utils/helpers";

interface Props {
    data?: any[];
    children?: any[];
    tableClassName?: string;
    containerClassName?: string;
    showFilterBox?: boolean;
}
interface State {
}

interface FilterInfo {
    filterMethod?: Function;
    component?: any;
    onChange?: Function;
    value?: any;
}


class Grid extends React.Component<Props, State>{

    state: State = {
    }

    static propTypes: Props = {

    }

    static defaultProps: Props = {
        showFilterBox: false
    }

    filters: { [colIndex: number]: FilterInfo; } = {};

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

                            if (!(colIndex in this.filters)) {
                                let filterInfo: FilterInfo = {};
                                filterInfo.onChange = (v) => {
                                    // TODO: if the typeof v is SyntheticEvent object then it will be null, extending it will prevent the bug, maybe there is some other way
                                    filterInfo.value = typeof v == 'object' ? extend(v) : v;
                                    this.forceUpdate();
                                }
                                if (isUndefined(c.props.filterComponent)) {
                                    filterInfo.component = React.createElement('input', {
                                        onChange: (e: any) => filterInfo.onChange(e.target.value)
                                    });
                                }
                                else {
                                    var newProps = extend(c.props.filterComponent.props,{
                                        onChange: (v: any) => filterInfo.onChange(v)
                                    });
                                    filterInfo.component = React.cloneElement(c.props.filterComponent, newProps, c.props.filterComponent.children);
                                }
                                filterInfo.filterMethod = c.props.filterMethod;
                                this.filters[colIndex] = filterInfo;
                            }
                            return <th key={colIndex}>
                                <div>{c.props.title}</div>
                                {this.filters[colIndex].component}
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

                            let filter = this.filters[colIndex];
                            if (isUndefined(filter.filterMethod) == false &&
                                filter.value &&
                                filter.filterMethod(d, filter.value) == false) {
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
