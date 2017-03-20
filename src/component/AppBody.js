import React, {Component} from 'react';
import gql from 'graphql-tag';
import Chart from "d3act";
import {graphql} from 'react-apollo';

import {ActiveItem, FinishedItem} from  './AppItem';

function listActive({data : {loading, todos}}) {
    if (loading) {
        return <div>加载中...</div>;
    } else {
        if (todos) {
            let length = 0;
            todos.map((item, index) => {
                length++;
            });
            if (length === 0) {
                return (
                    <div className="todo-empty ">暂无任务可显示</div>
                );
            }

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
                <div className="todo-empty ">暂无任务可显示</div>
            );
        }
    }


}

function listFinished({data : {loading, todos}}) {
    if (loading) {
        return <div>加载中...</div>;
    } else {
        if (todos) {
            let length = 0;
            todos.map((item, index) => {
                length++;
            });
            if (length === 0) {
                return (
                    <div className="todo-empty ">暂无任务可显示</div>
                );
            }

            return (
                <ul id="listFinished" className="list-unstyled">
                    {todos.map((item, index) => {
                        if (item.isCompleted) {
                            return <FinishedItem key={item.id} todoText={item.todoText} isCompleted={item.isCompleted}
                                                 id={item.id} todoDate={item.todoDate} finishDate={item.finishDate}
                                                 index={index}/>
                        }

                    })}
                </ul>
            );
        } else {
            return (
                <div className="todo-empty ">暂无任务可显示</div>
            );
        }
    }
}

function dataAnalysis({data : {loading, todos}}) {
    if (loading) {
        return <div>加载中...</div>;
    } else {
        if (!todos) {
            return (
                <div className="todo-empty ">暂无任务可显示</div>
            );
        }
        let create = new Map();
        let finish = new Map();
        let time = new Map();
        let length = 0;
        todos.map((item, index) => {
            if (item.isCompleted) {
                //   time.set(item.todoDate,item.finishDate);
                let tem = new Date(item.finishDate);
                let finishDate = tem.toLocaleDateString();
                if (finish.has(finishDate)) {
                    tem = finish.get(finishDate);
                    finish.set(finishDate, tem + 1);
                } else {
                    finish.set(finishDate, 1);
                }
            }

            let tem = new Date(item.todoDate);
            let todoDate = tem.toLocaleDateString();
            if (create.has(todoDate)) {
                tem = create.get(todoDate);
                create.set(todoDate, tem + 1);
            } else {
                create.set(todoDate, 1);
            }

            length++
        });

        let showCreate = [];
        for (let [key, value] of create) {
            showCreate.push({xValue: key, yValue: value});
        }

        let showFinish = [];
        for (let [key, value] of finish) {
            showFinish.push({xValue: key, yValue: value});
        }

        let chart1 = <div>当前暂无任务</div>;
        if (showCreate.length !== 0) {
            chart1 = <div>
                <p>每日添加的任务数</p>
                <Chart
                    type={"bar"}
                    width={300}
                    height={300}
                    margin={{top: 40, right: 40, bottom: 40, left: 40}}
                    showTooltips={true}
                    data={showCreate}
                />
            </div>;
        }


        let chart2 = <div>当前暂无已完成任务</div>;
        if (showFinish.length !== 0) {
            chart2 = <div>
                <p>每日完成的任务数</p>
                <Chart
                    type={"bar"}
                    width={300}
                    height={300}
                    margin={{top: 40, right: 40, bottom: 40, left: 40}}
                    showTooltips={true}
                    data={showFinish}
                />
            </div>;
        }

        return (
            <div>
                {chart1}
                {<hr />}
                {chart2}
            </div>
        );
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
const DataAnalysis = graphql(Query)(dataAnalysis);
export {ListActive, ListFinished, DataAnalysis};
export let myQuery = Query;
