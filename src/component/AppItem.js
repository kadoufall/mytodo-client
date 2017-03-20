import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import gql from 'graphql-tag';
import {graphql, compose} from 'react-apollo';
import {myQuery} from './AppBody';

// 单个Todo任务
class activeItem extends Component {

    // 处理单选框的点击事件
    handleChange(e) {
        this.props.mutation1({
            variables: {thisID: this.props.id, thisCompleted: e.target.checked},
            refetchQueries: [{query: myQuery}]
        });
    }

    // 处理删除按钮的事件
    handleDelete() {
        this.props.mutation2({variables: {thisID: this.props.id}, refetchQueries: [{query: myQuery}]});
    }

    // 处理鼠标移入事件
    handleMouseOver(e) {
        ReactDOM.findDOMNode(this.refs.item).style.background = '#eee';
        ReactDOM.findDOMNode(this.refs.del).style.display = 'table-cell';
        ReactDOM.findDOMNode(this.refs.finish).style.display = 'table-cell';
    }

    // 处理鼠标移出事件
    handleMouseOut(e) {
        ReactDOM.findDOMNode(this.refs.item).style.background = '#fff';
        ReactDOM.findDOMNode(this.refs.del).style.display = 'none';
        ReactDOM.findDOMNode(this.refs.finish).style.display = 'none';
    }

    render() {
        return (
            <li onMouseOver={this.handleMouseOver.bind(this)} onMouseOut={this.handleMouseOut.bind(this)} ref="item">
                <div className="input-group">
                    <span className="input-group-addon" ref="finish">
                        <input type="checkbox" checked={this.props.isCompleted}
                               onChange={this.handleChange.bind(this)}/>
                    </span>
                    <p style={{cursor: "pointer"}} className="form-control-static">{this.props.todoText}</p>
                    <span className="itemTime">{this.props.todoDate}</span>
                    <span className="input-group-addon" ref="del">
                        <button type="button" className="close"
                                onClick={this.handleDelete.bind(this)}><span>&times;</span></button>
                    </span>
                </div>
            </li>

        );
    }
}


class finishedItem extends Component {

    // 处理删除按钮的事件
    handleDelete() {
        this.props.mutation2({variables: {thisID: this.props.id}, refetchQueries: [{query: myQuery}]});
    }

    // 处理鼠标移入事件
    handleMouseOver(e) {
        ReactDOM.findDOMNode(this.refs.item).style.background = '#eee';
        ReactDOM.findDOMNode(this.refs.del).style.display = 'table-cell';
    }

    // 处理鼠标移出事件
    handleMouseOut(e) {
        ReactDOM.findDOMNode(this.refs.item).style.background = '#fff';
        ReactDOM.findDOMNode(this.refs.del).style.display = 'none';
    }

    render() {
        let ct = new Date(this.props.todoDate);
        let ft = new Date(this.props.finishDate);
        let time = ft.getTime() - ct.getTime();
        let tem = MillisecondToDate(time);

        return (
            <li onMouseOver={this.handleMouseOver.bind(this)} onMouseOut={this.handleMouseOut.bind(this)} ref="item">
                <div className="input-group">
                    <p className="form-control-static">{this.props.todoText}</p>
                    <span className="itemTime">{this.props.todoDate} --- {this.props.finishDate} _____
                        处理时间{tem}</span>
                    <span className="input-group-addon" ref="del">
                        <button type="button" className="close"
                                onClick={this.handleDelete.bind(this)}><span>&times;</span></button>
                    </span>
                </div>

            </li>
        );
    }
}

// 毫秒转为固定时间格式(时分秒)
function MillisecondToDate(msd) {
    let time = parseFloat(msd) / 1000;
    if (null !== time && "" !== time) {
        if (time > 60 && time < 60 * 60) {
            time = parseInt(time / 60.0, 10) + "分钟" + parseInt((parseFloat(time / 60.0) -
                    parseInt(time / 60.0, 10)) * 60, 10) + "秒";
        } else if (time >= 60 * 60 && time < 60 * 60 * 24) {
            time = parseInt(time / 3600.0, 10) + "小时" + parseInt((parseFloat(time / 3600.0) -
                    parseInt(time / 3600.0, 10)) * 60, 10) + "分钟" +
                parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0, 10)) * 60) -
                    parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0, 10)) * 60, 10)) * 60, 10) + "秒";
        } else {
            time = parseInt(time, 10) + "秒";
        }
    } else {
        time = "0 时 0 分0 秒";
    }
    return time;

}

// 改变处理状态
const mutation1 = gql`
    mutation changeCompleted($thisID: Int!, $thisCompleted : Boolean!){
        changeCompleted(todoId : $thisID , isCompleted : $thisCompleted){
            id
            todoDate
            todoText
            isCompleted
            finishDate
        }
    }`;

// 删除任务
const mutation2 = gql`
        mutation deleteTodo($thisID: Int!){
            deleteTodo(todoId : $thisID){
                id
                todoDate
                todoText
                isCompleted
                finishDate
            }
        }
    `;

// 改变任务内容
const mutation3 = gql`
        mutation changeText($thisID: Int!,$text: String!){
            changeText(todoId:$thisID,changedText : $text){
                id
                todoDate
                finishDate
                todoText
                isCompleted
            }
        }
    `;


const ActiveItem = compose(
    graphql(mutation2, {name: 'mutation2'}),
    graphql(mutation1, {name: 'mutation1'}),
    graphql(mutation3, {name: 'mutation3'}),
)(activeItem);

const FinishedItem = compose(
    graphql(mutation2, {name: 'mutation2'}),
    graphql(mutation1, {name: 'mutation1'}),
    graphql(mutation3, {name: 'mutation3'}),
)(finishedItem);

export {ActiveItem, FinishedItem};




