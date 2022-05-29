import { reducer, initialMainState } from './main-reducer.reducer';

describe('MainReducer Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialMainState, action);

      expect(result).toBe(initialMainState);
    });
  });
});
