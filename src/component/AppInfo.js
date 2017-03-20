import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import {ListActive, ListFinished, DataAnalysis} from './AppBody';

class AppInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {show: "active"};
    }

    // 处理查看部分
    seePart(e) {
        if (e.target.value === "active") {
            this.setState({show: "active"});
            ReactDOM.findDOMNode(this.refs.active).className = "btn btn-primary showWhat";
            ReactDOM.findDOMNode(this.refs.finish).className = "btn btn-default showWhat";
            ReactDOM.findDOMNode(this.refs.data).className = "btn btn-default showWhat";
        } else if (e.target.value === "finished") {
            this.setState({show: "finished"});
            ReactDOM.findDOMNode(this.refs.active).className = "btn btn-default showWhat";
            ReactDOM.findDOMNode(this.refs.finish).className = "btn btn-primary showWhat";
            ReactDOM.findDOMNode(this.refs.data).className = "btn btn-default showWhat";
        } else {
            this.setState({show: "data"});
            ReactDOM.findDOMNode(this.refs.active).className = "btn btn-default showWhat";
            ReactDOM.findDOMNode(this.refs.finish).className = "btn btn-default showWhat";
            ReactDOM.findDOMNode(this.refs.data).className = "btn btn-primary showWhat";
        }
    }

    render() {
        let showWhat = this.state.show;
        let appbody = null;
        if (showWhat === "active") {
            appbody = <ListActive />;
        } else if (showWhat === "finished") {
            appbody = <ListFinished />;
        } else {
            appbody = <DataAnalysis />;
        }

        return (
            <div>
                <div className="form-group">
                    <button className="btn btn-primary showWhat" ref="active" onClick={this.seePart.bind(this)} value="active">当前任务
                    </button>
                    <button className="btn btn-default showWhat" ref="finish" onClick={this.seePart.bind(this)} value="finished">
                        已完成任务
                    </button>
                    <button className="btn btn-default showWhat" ref="data" onClick={this.seePart.bind(this)} value="data">数据分析
                    </button>
                </div>
                <div id="showBody">
                    {appbody}
                </div>

            </div>

        );
    }

}

export default AppInfo;