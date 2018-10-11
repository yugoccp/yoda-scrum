import React from 'react';
import { Button, List } from 'antd';
import Timer from '../components/Timer';
import DarthVader from '../components/char/DarthVader';

class DsmTimerView extends React.Component {
  render() {
    const { timer, timeout, members, member} = this.props;
    const overdue = timer > timeout;
    return (
      <div>
        { overdue && choosenOne.name === user &&
          <div style={{position: "absolute", left:"50px", top: "30px"}}>
            <DarthVader name={choosenOne.name} />
          </div>
        }
        <div>
          <Timer currentMs={timer} styleClass={overdue ? 'timer timeout' : 'timer'}/>
          <List
            bordered
            dataSource={choosenOnes}
            renderItem={item => (<List.Item>{item}</List.Item>)}
          ></List>
          <div>
            { !started ?
              <Button onClick={this.onStart}>Start!</Button> :
              <div>
                <div>
                  <Button type='primary' onClick={this.onComplete}>Finished!</Button>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default DsmTimerView;
