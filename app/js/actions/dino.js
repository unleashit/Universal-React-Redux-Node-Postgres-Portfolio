export const DINO_GROWLED = 'DINO_GROWLED';

export function dinoInit(number = 0) {
  return (dispatch, getState) => {
    if (getState().dino.growls === 0) {
      return dispatch({type: DINO_GROWLED, payload: number});
    }
  }
}

export function dinoGrowled(number = 0) {
  return (dispatch, getState) => {
      return dispatch({type: DINO_GROWLED, payload: number});
  }
}