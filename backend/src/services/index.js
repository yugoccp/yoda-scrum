const dataProvider = require('../providers/fileDataProvider');
const MemberStatus = require('../constants/MemberStatus');
const MeetingStatus = require('../constants/MeetingStatus');
const utils = require('../utils');

function buildDsm() {
	return {
		date: new Date(),
		members: [],
		timeInMs: 0,
		currentMemberIndex: 0,
		meetingStatus: MeetingStatus.WAITING
	};
}

module.exports = function(){

	let dsm = buildDsm();

	const updateStatus = (status) => {
		dsm.status = status;
	}

	const getStatus = () => {
		return dsm.status;
	}

	const start = () => {
		const { members, currentMemberIndex } = dsm;
		dsm.members = utils.shuffle(members);
		const currentMember = dsm.members[currentMemberIndex];
		currentMember.status = MemberStatus.IN_PROGRESS;
		currentMember.startTime = Date.now();
		dsm.status = MeetingStatus.IN_PROGRESS;
	}

	const getMembers = () => {
		return dsm.members;
	} 

	const addMember = (name) => {
		if (!dsm.members.find(m => m.name === name)) {
			dsm.members.push({
				name,
				status: MemberStatus.PENDING,
				timeInMs: 0,
				startTime: undefined
			});
		}
	}

	const removeMember = (name) => {
		dsm.members = dsm.members.filter(m => m.name !== name);
	}

	const nextMember = (currentTimeInMs) => {
		const { currentMemberIndex, members } = dsm;
		members[currentMemberIndex].status = MemberStatus.DONE;
		members[currentMemberIndex].timeInMs = currentTimeInMs;
		const nextMemberIndex = currentMemberIndex + 1;
		if (nextMemberIndex < members.length) {
			console.log("Go to next member...");
			members[nextMemberIndex].status = MemberStatus.IN_PROGRESS;
			members[nextMemberIndex].startTime = Date.now();
			dsm.currentMemberIndex = nextMemberIndex;
		} else {
			console.log("Finished meeting...");
			const timeInMs = members.reduce((time, m) => time += parseInt(m.timeInMs), 0);
			dsm.status = MeetingStatus.FINISHED;
			dsm.timeInMs = timeInMs;
			// Store current DSM data
			dataProvider.saveDsm(dsm);
		}
	}

	const getAllDsm = () => {
		return dataProvider.findAllDsm();
	}

	return {
		updateStatus,
		getStatus,
		start,
		getMembers,
		addMember,
		removeMember,
		nextMember,
		getAllDsm
	};

}