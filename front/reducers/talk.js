export const ADD_TALK_REQUEST = 'ADD_TALK_REQUEST'
export const ADD_TALK_SUCCESS = 'ADD_TALK_SUCCESS'
export const ADD_TALK_FAILURE = 'ADD_TALK_FAILURE'
export const DELETE_TALK_REQUEST = 'DELETE_TALK_REQUEST'
export const DELETE_TALK_SUCCESS = 'DELETE_TALK_SUCCESS'
export const DELETE_TALK_FAILURE = 'DELETE_TALK_FAILURE'
export const EDIT_TALK_REQUEST = 'EDIT_TALK_REQUEST'
export const EDIT_TALK_SUCCESS = 'EDIT_TALK_SUCCESS'
export const EDIT_TALK_FAILURE = 'EDIT_TALK_FAILURE'
export const LOAD_TALK_REQUEST = 'LOAD_TALK_REQUEST'
export const LOAD_TALK_SUCCESS = 'LOAD_TALK_SUCCESS'
export const LOAD_TALK_FAILURE = 'LOAD_TALK_FAILURE'
export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST'
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS'
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE'
export const DELETE_COMMENT_REQUEST = 'DELETE_COMMENT_REQUEST'
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS'
export const DELETE_COMMENT_FAILURE = 'DELETE_COMMENT_FAILURE'

const initialState = {
  talks : [],
  isAddingTalk : false,
  addedTalk : false,
  addTalkError : '',
  isDeletingTalk : false,
  deletedTalk : false,
  deleteTalkError : '',
  isEditingTalk : false,
  editedTalk : false,
  editTalkError : '',
  isAddingComment:false,
  addedComment:false,
  addCommentError:'',
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TALK_REQUEST:{
      return{
        ...state,
      };
    }
    case LOAD_TALK_SUCCESS:{
      return{
        ...state,
        talks:action.data
      };
    }
    case LOAD_TALK_FAILURE:{
      return{
        ...state,
      };
    }
    case EDIT_TALK_REQUEST:{
      return{
        ...state,
        isEditingTalk:true,
        editTalkError:'',
        editedTalk:false,
      };
    }
    case EDIT_TALK_SUCCESS:{
      const index = state.talks.findIndex(v => v.id === action.data.talkId);
      const talk = state.talks[index];
      talk.content = action.data.content;
      const talks = [...state.talks];
      talks[index] = talk;
      return{
        ...state,
        talks,
        isEditingTalk:false,
        editedTalk:true,
      };
    }
    case EDIT_TALK_FAILURE:{
      return{
        ...state,
        isEditingTalk:false,
        editTalkError:action.error,
      };
    }
    case ADD_TALK_REQUEST:{
      return{
        ...state,
        isAddingTalk:true,
        addTalkError:'',
        addedTalk:false,
      };
    }
    case ADD_TALK_SUCCESS:{
      return{
        ...state,
        isAddingTalk:false,
        addedTalk:true,
        talks:[action.data, ...state.talks]
      };
    }
    case ADD_TALK_FAILURE:{
      return{
        ...state,
        isAddingTalk:false,
        addTalkError:action.error
      };
    }
    case DELETE_TALK_REQUEST:{
      return{
        ...state,
        isDeletingTalk:true,
        deleteTalkError:''
      };
    }
    case DELETE_TALK_SUCCESS:{
      const index = state.talks.findIndex(v => v.id === action.data);
      const talks = [...state.talks];
      talks.splice(index, 1);
      return{
        ...state,
        isDeletingTalk:false,
        talks
      };
    }
    case DELETE_TALK_FAILURE:{
      return{
        ...state,
        isDeletingTalk:false,
      };
    }
    case ADD_COMMENT_REQUEST:{
      return{
        ...state,
        isAddingComment:true,
        addedComment:false,
        addCommentError:''
      };
    }
    case ADD_COMMENT_SUCCESS:{
      const talkIndex = state.talks.findIndex(f=>f.id === action.data.TalkId);
      const talk = state.talks[talkIndex];
      const Comments = [...talk.Comments, action.data];
      const talks = [...state.talks];
      talks[talkIndex] = { ...talk, Comments};

      return{
        ...state,
        isAddingComment:false,
        addedComment:true,
        talks,
      };
    }
    case ADD_COMMENT_FAILURE:{
      return{
        ...state,
        isAddingComment:false,
        addCommentError:action.error
      };
    }
    default:{
      return {...state}
    }

  }
}
