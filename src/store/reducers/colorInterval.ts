import ColorIntervalItem from '../models/ColorIntervalItem.ts';

/** Actions */

const CREATE = 'CREATE';
const UPDATE = 'UPDATE';
const DELETE = 'DELETE';
const CLEAR_ALL = 'CLEAR_ALL';

interface Action {
  type?: string;
  item?: ColorIntervalItem;
}

/** Reducer */

export default function colorInterval(state = [], action: Action = {}) {
  switch (action.type) {
    case CREATE:
      return [
        ...state,
        new ColorIntervalItem(action.item.color, action.item.interval)
      ];
    case UPDATE:
      return state.map(item => {
        if (item.id === action.item.id) {
          return new ColorIntervalItem(action.item.color, action.item.interval, action.item.id);
        }
        return item;
      });
    case DELETE:
      return state.filter(item => item.id !== action.item.id);
    case CLEAR_ALL:
      return [];
    default:
      return state;
  }
};

/** Action creators */

export const createItem = ({color, interval}) => {
  return {
    type: CREATE,
    item: {
      color,
      interval
    }
  };
};

export const updateItem = ({id, color, interval}) => {
  return {
    type: UPDATE,
    item: {
      id,
      color,
      interval
    }
  };
};

export const deleteItem = ({id}) => {
  return {
    type: DELETE,
    item: {
      id
    }
  };
};

export const clearAll = () => {
  return {
    type: CLEAR_ALL
  };
};
