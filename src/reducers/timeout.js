import {
	UPDATE_TIMEOUT
} from '../constants/ActionTypes'

const initialState = {
	timeout: 2
}

const timeout = (state = initialState, action) => {
	switch(action.type) {
		case UPDATE_TIMEOUT: 
			return {timeout: action.timeout}
		default:
      return state
	}
}

export default members