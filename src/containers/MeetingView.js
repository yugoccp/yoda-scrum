import React from 'react';
import { Button } from 'antd';
import Timer from '../components/Timer';
import DarthVader from '../components/char/DarthVader';
import { shuffle } from '../utils';

class MeetingView extends React.Component {

  constructor(props) {
    super(props);

    const { timeout, choosenOnes } = this.props;
    const shuffledOnes = shuffle(choosenOnes);

    this.state = {
      choosenOnes: shuffledOnes,
      currentIndex: 0,
      currentMs: 0,
      startTime: 0,
      meetingStartTime: 0,
      padawansData: [],
      timeout: timeout,
      overdue: false,
      started: false,
      releaseTimer: false
    }

    this.onComplete = this.onComplete.bind(this);
    this.onGo = this.onGo.bind(this);
  }

  componentDidMount() {

    // Update meeting start time
    this.setState({meetingStartTime: Date.now()})

    // Create interval to update padawan timer
    this.intervalId = setInterval(() => {
      const { releaseTimer } = this.state;
      if (releaseTimer) {
        const { startTime } = this.state;
        const { timeout } = this.props;
        const currentMs = Date.now() - startTime;
        this.setState({
          currentMs,
          overdue: currentMs > timeout*60*1000
        });
      }
    }, 10);
  }

  componentWillUnmount() {
    if(this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  onComplete() {
    this.stopTimer();
    const { currentMs } = this.state;

    this.setState({
      currentMs: 0,
      overdue: false,
      started: false
    });

    const { choosenOnes, currentIndex, padawansData, timeout } = this.state;

    const currentPadawan = choosenOnes[currentIndex];
    const currentSec = Math.floor(currentMs/1000);
    const padawanData = {
      username: currentPadawan.username,
      timeInSec: currentSec
    }

    const nextIndex = currentIndex+1;
    const newPadawansData = [...padawansData, padawanData];

    if (nextIndex < choosenOnes.length) {

      console.log('Next Padawan!');
      this.setState({
        padawansData: newPadawansData,
        currentIndex: nextIndex
      });

    } else {

      console.log('Complete Meeting!');
      const { meetingStartTime } = this.state;
      const totalTimeInSec = (Date.now() - meetingStartTime)/1000;
      this.props.onCompleteMeeting({
        padawansData: newPadawansData,
        timeInSec: totalTimeInSec,
        timeout: timeout
      });
      
    }
  }

  onGo() {
    this.setState({
      startTime: Date.now(),
      currentMs: 0,
      started: true
    });

    this.startTimer();
  }

  startTimer() {
    this.setState({ releaseTimer: true });
  }

  stopTimer() {
    this.setState({ releaseTimer: false });
  }

  render() {

    const { currentMs, currentIndex, overdue, started, choosenOnes } = this.state;
    const currentPadawan = choosenOnes[currentIndex];
    const btnMsg = currentIndex + 1 < choosenOnes.length ?
      `Next >> ${choosenOnes[currentIndex + 1].name.toUpperCase()}!` :
      `Finish meeting!`

    return (
      <div>
        { overdue &&
          <div style={{position: "absolute", left:"50px", top: "30px"}}>
            <DarthVader name={currentPadawan.name} />
          </div>
        }
        <div>
          <h1 className="title">{currentPadawan.name}</h1>
          <Timer currentMs={currentMs} styleClass={overdue ? 'timer timeout' : 'timer'}/>
          <div>
            { !started ?
              <Button onClick={this.onGo}>GO!</Button> :
              <div>
                <div>
                  <Button type='primary' onClick={this.onComplete}>{btnMsg}</Button>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default MeetingView;
