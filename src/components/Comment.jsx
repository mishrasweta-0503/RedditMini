import React from 'react';

export default function Comment({ item, level = 0 }){
    const hasReplies = item.data.replies?.data?.children || [];
    return(
        <>
            <div className="comment" style={{ marginLeft: level * 20 }}>
            <p className="comment-author">
                <strong>{item.data.author}</strong>
            </p>

            <p className="comment-body">{item.data.body}</p>
                {hasReplies.map(reply => (
                    <Comment key={reply.data.id} item={reply} level={level + 1}/>
                ))}
            </div>
        </>
    )
}