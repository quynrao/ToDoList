import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
import React from "react";
import Select from "react-select";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Input,
  Row,
  ListGroup,
  ListGroupItem,
  CardFooter,
} from "reactstrap";
import "./App.css";

const priorityList = [
  { value: 1, label: "low" },
  { value: 2, label: "normal" },
  { value: 3, label: "high" },
];

const disablePastDate = () => {
  const today = new Date();
  const dd = String(today.getDate() + 1).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  return yyyy + "-" + mm + "-" + dd;
};
class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      descriptionText: "",
      taskTitle: "",
      dueDate: moment().format("YYYY-MM-DD"),
      priority: { value: 2, label: "normal" },
      listTasksTodo: [
        {
          id: 1,
          descriptionText: "cbhsdvhsdv",
          taskTitle: "Task1",
          dueDate: moment().format("YYYY-MM-DD"),
          priority: { value: 2, label: "normal" },
          isShowDetail: false,
          isCheckbox: false,
          isDone: false,
        },
        {
          id: 2,
          descriptionText: "Do something",
          taskTitle: "Task2",
          dueDate: moment().format("YYYY-MM-DD"),
          priority: { value: 2, label: "normal" },
          isShowDetail: false,
          isCheckbox: false,
          isDone: false,
        },
        {
          id: 3,
          descriptionText: "this is task3",
          taskTitle: "Task 3",
          dueDate: moment().format("YYYY-MM-DD"),
          priority: { value: 1, label: "low" },
          isShowDetail: false,
          isCheckbox: false,
          isDone: false,
        },
      ],
      temporary: {
        descriptionText: "",
        taskTitle: "",
        dueDate: moment().format("YYYY-MM-DD"),
        priority: { value: 2, label: "normal" },
      },
      searchList: [],
      textSearch: "",
    };
  }
  componentDidMount() {
    this.setState({ searchList: this.state.listTasksTodo });
  }
  onChangeDescription = (e) => {
    const des = e?.target?.value ?? "";
    this.setState({ descriptionText: des });
  };

  onChangeTaskTitle = (e) => {
    const tile = e?.target?.value ?? "";
    this.setState({ taskTitle: tile });
  };

  onChangeDueDate = (e) => {
    const dueDate = e?.target?.value ?? "";
    this.setState({ dueDate: dueDate });
  };

  onChangePriority = (e) => {
    this.setState({ priority: e });
  };

  onClickAdd = (e) => {
    const newTask = {
      descriptionText: this.state.descriptionText,
      taskTitle: this.state.taskTitle,
      dueDate: this.state.dueDate,
      priority: this.state.priority,
      isShowDetail: false,
      isCheckbox: false,
      id: Number(moment().format("sss")),
    };
    const newArray = [...this.state.listTasksTodo, newTask];
    newArray.sort((a, b) => a.dueDate.localeCompare(b.dueDate));
    this.setState({ listTasksTodo: newArray });
  };

  onClickDetail = (item) => {
    const newList = this.state.listTasksTodo.map((task) => {
      return {
        ...task,
        isShowDetail: task.id === item.id ? !task.isShowDetail : false,
      };
    });
    this.setState({ listTasksTodo: newList, temporary: item });
  };

  onChangeTempDescription = (e) => {
    const des = e?.target?.value ?? "";
    this.setState({
      temporary: { ...this.state.temporary, descriptionText: des },
    });
  };

  onChangeTempTaskTitle = (e) => {
    const tile = e?.target?.value ?? "";
    this.setState({ temporary: { ...this.state.temporary, taskTitle: tile } });
  };

  onChangeTempDueDate = (e) => {
    const dueDate = e?.target?.value ?? "";
    this.setState({ temporary: { ...this.state.temporary, dueDate: dueDate } });
  };

  onChangeTempPriority = (e) => {
    this.setState({ temporary: { ...this.state.temporary, priority: e } });
  };

  onChangeTextSearch = (e) => {
    const text = e.target.value;
    const newArray = this.state.listTasksTodo.filter((task) =>
      task.taskTitle.includes(text)
    );
    this.setState({ searchList: newArray, textSearch: text });
  };

  onClickUpdate = (e, index) => {
    const id = this.state.temporary.id;
    const newArray = this.state.listTasksTodo.map((task) => {
      if (id === task.id) return this.state.temporary;
      else return task;
    });
    newArray.sort((a, b) => a.dueDate.localeCompare(b.dueDate));
    this.setState({ listTasksTodo: newArray });
  };

  onClickRemove = (e) => {
    const newArray = this.state.listTasksTodo.filter((task) => task.id !== e);
    this.setState({ listTasksTodo: newArray });
  };

  onClickCheckbox = (e) => {
    const newArray = this.state.listTasksTodo.map((task) => {
      return {
        ...task,
        isCheckbox: task.id === e ? !task.isCheckbox : task.isCheckbox,
      };
    });
    this.setState({ listTasksTodo: newArray });
  };

  onClickRemoveAll = () => {
    const newArray = this.state.listTasksTodo.filter(
      (task) => !task.isCheckbox
    );
    this.setState({ listTasksTodo: newArray });
  };

  renderNewTaskTab() {
    return (
      <Card className="new-task">
        <CardHeader style={{ textAlign: "center" }}>New Task</CardHeader>
        <CardBody>
          <Input
            type="text"
            placeholder="Add new task..."
            value={this.state.taskTitle}
            onChange={(e) => this.onChangeTaskTitle(e)}
          ></Input>
          <CardTitle>Description</CardTitle>
          <Input
            type="textarea"
            value={this.state.descriptionText}
            onChange={(e) => this.onChangeDescription(e)}
          ></Input>
          <Row style={{ display: "flex" }}>
            <Col>
              <CardTitle>Due Date</CardTitle>
              <Input
                type="date"
                value={this.state.dueDate}
                onChange={this.onChangeDueDate}
                min={disablePastDate()}
              ></Input>
            </Col>
            <Col>
              <CardTitle>Priority</CardTitle>
              <Select
                options={priorityList}
                value={this.state.priority}
                onChange={this.onChangePriority}
              ></Select>
            </Col>
          </Row>
          <Button
            className="add-btn mt-2"
            color="success"
            onClick={this.onClickAdd}
            style={{ width: "100%" }}
          >
            Add
          </Button>
        </CardBody>
      </Card>
    );
  }

  renderTodoListTab() {
    return (
      <Card className="to-do-list">
        <CardHeader style={{ textAlign: "center" }}>To Do List</CardHeader>
        <CardBody>
          <Input
            type="text"
            placeholder="Search..."
            value={this.state.textSearch}
            onChange={(e) => this.onChangeTextSearch(e)}
          ></Input>
          <ListGroup>
            {this.state.searchList.map((item, index) => {
              return (
                <div key={index}>
                  <ListGroupItem action href="#" id={item.id}>
                    <Row>
                      <Col>
                        <input
                          type="checkbox"
                          value={item.isCheckbox}
                          onChange={() => this.onClickCheckbox(item.id)}
                        />
                        {item.taskTitle}
                      </Col>
                      <Col
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        <Row style={{ display: "flex" }}>
                          <Col>
                            <Button
                              color="info"
                              size="sm"
                              onClick={() => this.onClickDetail(item)}
                            >
                              Detail
                            </Button>
                          </Col>
                          <Col>
                            <Button
                              color="danger"
                              size="sm"
                              onClick={() => this.onClickRemove(item.id)}
                            >
                              Remove
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </ListGroupItem>
                  {item.isShowDetail ? (
                    <CardBody>
                      <Input
                        type="text"
                        placeholder="Add new task..."
                        value={this.state.temporary.taskTitle}
                        onChange={(e) => this.onChangeTempTaskTitle(e)}
                      ></Input>
                      <CardTitle>Description</CardTitle>
                      <Input
                        type="textarea"
                        value={this.state.temporary.descriptionText}
                        onChange={(e) => this.onChangeTempDescription(e)}
                      ></Input>
                      <Row style={{ display: "flex" }}>
                        <Col>
                          <CardTitle>Due Date</CardTitle>
                          <Input
                            type="date"
                            value={this.state.temporary.dueDate}
                            onChange={this.onChangeTempDueDate}
                            min={disablePastDate()}
                          ></Input>
                        </Col>
                        <Col>
                          <CardTitle>Priority</CardTitle>
                          <Select
                            options={priorityList}
                            value={this.state.temporary.priority}
                            onChange={this.onChangeTempPriority}
                          ></Select>
                        </Col>
                      </Row>
                      <Button
                        className="add-btn mt-2"
                        color="success"
                        onClick={(e) => this.onClickUpdate(e, index)}
                        style={{ width: "100%" }}
                      >
                        Update
                      </Button>
                    </CardBody>
                  ) : null}
                </div>
              );
            })}
          </ListGroup>
        </CardBody>
        {this.state.listTasksTodo.find((e) => e.isCheckbox) ? (
          <CardFooter>
            <Col>Bulk action:</Col>
            <Col
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Row style={{ display: "flex" }}>
                <Col>
                  <Button color="primary" size="sm">
                    Done
                  </Button>
                </Col>
                <Col>
                  <Button
                    color="danger"
                    size="sm"
                    onClick={this.onClickRemoveAll}
                  >
                    Remove
                  </Button>
                </Col>
              </Row>
            </Col>
          </CardFooter>
        ) : null}
      </Card>
    );
  }

  render() {
    return (
      <div className="App">
        {this.renderNewTaskTab()}
        {this.renderTodoListTab()}
      </div>
    );
  }
}

export default TodoList;
