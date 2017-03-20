import React, {Component} from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import {myQuery} from './AppBody';

class AppHeader extends Component {
    // 处理输入后的enter事件
    handleKeyDown(e) {
        if (e.keyCode === 13) {      // enter按下
            let input = e.target.value;
            if (!input) {             // 为空跳出
                return false;
            }

            this.props.mutate({variables: {inputText: input}, refetchQueries: [{query: myQuery}]});
            e.target.value = "";
        }
    }

    render() {
        return (
            <div className="appHeader form-group">
                <input className="form-control" type="text" placeholder="请输入新任务的内容，按回车键确认"
                       onKeyDown={this.handleKeyDown.bind(this)} />
            </div>
        );
    }
}


export default graphql(gql`
  mutation insertTodo($inputText: String!) {
    insertTodo(newTest : $inputText) {
        todoDate
    	todoText
        id
        isCompleted
        finishDate
    }
  }
`)(AppHeader);
