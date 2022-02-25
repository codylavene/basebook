import React from "react";

const PostLoading = (props) => {
	return (
		<div className="post-load--container">
			<div className="user-load"></div>
			<div className="posts-load">
				<div className="line-load"></div>
				<div className="line-load"></div>
				<div className="line-load"></div>
				<div className="line-load"></div>
				<div className="line-load"></div>
				{/* <div className="line-load"></div> */}
			</div>
		</div>
	);
};

export default PostLoading;
