import React, { Component } from 'react';
import { Form, Button, InputNumber, Table } from 'antd';
import Yoda from '../components/char/Yoda';

const tableCols = [
  {
    title: '',
    dataIndex: '',
    key: 'action'
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username'
  }
];

class SettingsView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      timeout: 2,
      choosenOnes: props.padawans
    }

    this.onChangeTimeout = this.onChangeTimeout.bind(this);
    this.onChooseOne = this.onChooseOne.bind(this);

  }

  onChangeTimeout(timeout) {
    this.setState({timeout});
  }

  onChooseOne(selectedRowKeys, selectedRows) {
    this.setState({ choosenOnes: selectedRows });
  }

  render() {

    const { timeout, choosenOnes } = this.state;
    const { padawans, onStartMeeting } = this.props;

    const rowSelection = {
      selectedRowKeys: choosenOnes.map(p => p.username),
      onChange: this.onChooseOne
    };

    return (
      <div id="dsm-setup-view">

        <div style={{position: "absolute", right: "230px", top: "10px"}}>
          <Yoda />
        </div>

        <h1 className="title">Yoda DSM</h1>

        <Form>
          <Form.Item label="Training time (min):">
            <InputNumber value={timeout} onChange={(e) => this.onChangeTimeout(e)}/>
          </Form.Item>

          <Form.Item label="The choosen ones:">
            <Table id="member-table" rowKey="username" rowSelection={rowSelection} dataSource={padawans} columns={tableCols}></Table>
          </Form.Item>

          <Form.Item>
            <Button type="primary" onClick={() => onStartMeeting(timeout, choosenOnes)}>Start Meeting!</Button>
          </Form.Item>
        </Form>

      </div>
    );
  }
}


export default SettingsView
