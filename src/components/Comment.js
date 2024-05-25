import React, { useState } from "react";
import { CommentSection } from "react-comments-section";
import Wrapper from "../assets/wrappers/Comment";
import { getUserFromLocalStorage } from "../utils/localStorage";
import { Error } from "../pages";
import { useSelector } from "react-redux";
import customFetch from "../utils/axios";
//import 'react-comments-section/dist/index.css'

const Comment = ({ addComment, comments }) => {
  // const [data, setData] = useState([]); 
  //const { currentTask } = useSelector((store) => store.currentProject);

  // const comments = currentTask.commentaires;
  let data = [];
  if (Array.isArray(comments))
    data = comments.map((item) => {
      return {
        userId: item.author.id,
        comId: item.id,
        fullName: item.author.name,
        //userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
        text: item.date ? item.date.substring(0, 10) + " : " + item.content : "",
        avatarUrl:
          "https://ui-avatars.com/api/name=" +
          item.author.name +  
          "&background=random",
        replies: [],
      };
    });

  const customNoComment = () => (
    <div className="no-com" style={{ marginLeft: "10%", marginTop: "5%" }}>
      No comments, be the first to comment on this task!
    </div>
  );

  const editComment = async (commentId, updatedText) => {
    try {
      const response = await customFetch.patch(`/comments/${commentId}`, { text: updatedText });
      const updatedData = data.map(comment =>
        comment.comId === commentId ? { ...comment, text: response.data.text } : comment
      );
      // setData(updatedData);
    } catch (error) {
      console.error('Error editing comment:', error);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await customFetch.delete(`/comments/${commentId}`);
      const updatedData = data.filter(comment => comment.comId !== commentId);
      // setData(updatedData);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <Wrapper>
      <CommentSection
        currentUser={{
          currentUserId: getUserFromLocalStorage().id,
          currentUserImg:
            "https://ui-avatars.com/api/name=" +
            getUserFromLocalStorage().name +
            "&background=random",

          currentUserFullName: getUserFromLocalStorage().name,
        }}
        commentData={data}
        customNoComment={() => customNoComment()}
        removeEmoji={true}
        inputStyle={{
          border: "1px solid rgb(208 208 208)",
          width: "100%",
          height: "70%",
          margin: "1%",
        }}
        formStyle={{
          backgroundColor: "white",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 6fr  1fr",
          gridGap: "5px",
        }}
        submitBtnStyle={{
          border: "none",
          backgroundColor: "var(--primary-400)",
          marginLeft: "5%",
          marginTop: "7%",
          borderRadious: "5px",
        }}
        cancelBtnStyle={{
          border: "none",
          backgroundColor: "gray",
          color: "white",
        }}
        titleStyle={{ color: "#30336b", fontSize: "smaller" }}
        overlayStyle={{
          backgroundColor: "#F4EDF6",
          color: "#30336b",
          borderRadious: "10%",
        }}
        onSubmitAction={(
          newData
          /* : {
            userId: string
            comId: string
            avatarUrl: string
            userProfile?: string
            fullName: string
            text: string
            replies: any
            commentId: string
            }*/
        ) => {
          addComment(newData);
        }}
        onEditAction={editComment}
        onDeleteAction={deleteComment}
        currentData={(data) => {
          console.log("curent data", data);
        }}
      />
    </Wrapper>
  );
};

export default Comment;
