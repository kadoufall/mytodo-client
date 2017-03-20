import React, {Component} from 'react';
import {ListActive, ListFinished} from './AppBody';

class AppInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {show: "active"};
    }


    // 处理查看部分
    seePart(e) {
        if (e.target.value === "active") {
            this.setState({show: "active"});
        } else if (e.target.value === "finished") {
            this.setState({show: "finished"});
        } else {
            this.setState({show: "data"});
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
            appbody = <br />;
        }



        return (
            <div>

                <div className="form-group">
                    <button className="btn btn-primary showWhat" onClick={this.seePart.bind(this)} value="active">当前任务
                    </button>
                    <button className="btn btn-default showWhat" onClick={this.seePart.bind(this)} value="finished">
                        已完成任务
                    </button>
                    <button className="btn btn-default showWhat" onClick={this.seePart.bind(this)} value="data">数据分析
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