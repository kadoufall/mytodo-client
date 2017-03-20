import React, {Component} from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import {ActiveItem, FinishedItem} from  './AppItem';

function listActive({data : {loading, todos}}) {
    if (loading) {
        return <div>加载中...</div>;
    } else {
        if (todos) {
            return (
                <div>
                    <ul id="listActive" className="list-unstyled">
                        {todos.map((item, index) => {
                            if (!item.isCompleted) {
                                return <ActiveItem key={item.id} todoText={item.todoText} isCompleted={item.isCompleted}
                                                   id={item.id} todoDate={item.todoDate} index={index}/>
                            }

                        })}
                    </ul>
                </div>
            );
        } else {
            return (
                <div className="todo-empty ">There is no TODO to show !</div>
            );
        }
    }


}

function listFinished({data : {loading, todos}}) {
    if (loading) {
        return <div>加载中...</div>;
    } else {
        if (todos) {
            return (
                <ul id="listFinished" className="list-unstyled">
                    {todos.map((item, index) => {
                        if (item.isCompleted) {
                            return <FinishedItem key={item.id} todoText={item.todoText} isCompleted={item.isCompleted}
                                                 id={item.id} todoDate={item.todoDate} finishDate={item.finishDate} index={index}/>
                        }

                    })}
                </ul>
            );
        } else {
            return (
                <div className="todo-empty ">There is no TODO to show !</div>
            );
        }
    }
}

const Query = gql`
  query{
    todos{
        id
        todoText
        todoDate
        isCompleted
        finishDate
  }
}
`;

const ListActive = graphql(Query)(listActive);
const ListFinished = graphql(Query)(listFinished);
export {ListActive, ListFinished};
export let myQuery = Query;
