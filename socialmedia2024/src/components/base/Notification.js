import React from 'react'
import ProfileRoute from './ProfileRoute';
import moment from 'moment';

const Notification = ({ notification }) => {
  console.log(notification);
  return (
    <div div className='flex flex-wrap' >
      {
        notification.map((note, index) => (
          <div className='flex p-2 items-center hover:rounded-lg hover:bg-[--hover-color] hover:cursor ' key={index}>
            <div><ProfileRoute avatar={note.avatar} /></div>
            <div>
              <p><b>{note.senderName} </b> {note.reaction} một bài viết của bạn</p>
              <p>{moment(note.createdAt).fromNow()}</p>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Notification;
