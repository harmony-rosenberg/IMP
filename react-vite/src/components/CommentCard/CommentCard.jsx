import './CommentCard.css';
import { useDispatch, useSelector } from "react-redux";
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import UpdateComment from "../UpdateComment";
import DeleteComment from "../DeleteComment/DeleteComment";

const CommentCard = ({album}) => {
	const user = useSelector(state => state.session.user)
	const comments = album.comments

	return (
		<div className="comments-container">
		{Object.values(comments).map((comment) => (
			comment.user_id == user.id ? (
			<div
			className="comment"
			key={comment.id}>
				<div className="comment-user">{comment.user.artistName}:</div>
				{comment.body}
				<div className='manage-comment-btns'>
				<OpenModalMenuItem
				itemText='edit'
				modalComponent={<UpdateComment comment={comment} />}
				/>
				<OpenModalMenuItem
				itemText='delete'
				modalComponent={<DeleteComment comment={comment} />}
				/>
				</div>
				</div>
			) : (
				<div
				className="comment"
				key={comment.id}>
					<div className="comment-user">{comment.user.artistName} :</div>
					{comment.body}
					</div>
			)
		))}
	</div>
	)
}

export default CommentCard;
