import { useContext, useState } from 'react';
import { AuthContext } from '../../src/context/authContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import moment from 'moment/moment';

export const Comments = ({ articleId }) => {
  const [content, setContent] = useState('');
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser.id;

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery(['comments'], () => 
    axios.get(`http://localhost:8800/comments/${articleId}`).then((res) => {
      const data = res.data.comments;
      return data;
    })
  );

  // Mutation used to make changes to the server, provide data as 'newComment'
  const mutation = useMutation(
    (newComment) => {
      return axios.post('http://localhost:8800/comments', newComment);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['comments']);
      },
    }
  );

  const handleClick = async (event) => {
    event.preventDefault();
    mutation.mutate({ userId, content, articleId });
    setContent('');
  };
  console.log(data)
  return (
    <div className='comments'>
      <div className='write'>
        <p>{currentUser.username}</p>
        <input
          type='text'
          placeholder='Write a comment'
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
        <button onClick={handleClick}>Send</button>
      </div>
      {data && data.map((comment) => (
        <div className='comment' key={comment.index}>
          <div className='user-info'>
            <h2>{comment.username}</h2>
            <p>{comment.content}</p>
          </div>
          <span className='date'>{moment(comment.createdAt).fromNow()}</span>
        </div>
      ))}
    </div>
  );
};
