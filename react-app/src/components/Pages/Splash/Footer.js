import React from "react";

const Footer = (props) => {
	return (
		<footer>
			<div className="footer--container">
				<div className="footer--top-text">
					<a
						href="https://github.com/codylavene"
						target="_blank"
						rel="noreferrer"
					>
						GitHub
					</a>
					<a
						href="https://www.linkedin.com/in/codylavene/"
						target="_blank"
						rel="noreferrer"
					>
						LinkedIn
					</a>
					{/* <a
						href="https://codylavene.dev"
						target="_blank"
						rel="noreferrer"
					>
						Portfolio
					</a> */}
				</div>
				<div className="footer--mid-text">
					<div className="footer--links">
						<div>Check out my other projects!</div>
						<a
							href="https://udderly-forgetful.herokuapp.com/"
							target="_blank"
							rel="noreferrer"
						>
							Udderly Forgetful
						</a>
						<a
							href="https://space-cation.herokuapp.com/"
							target="_blank"
							rel="noreferrer"
						>
							SpaceCation
						</a>
						<a
							href="https://split-a-bill.herokuapp.com/"
							target="_blank"
							rel="noreferrer"
						>
							Splitabill
						</a>
					</div>
					<div className="techs-used">
						<ul>
							<li>React</li>
							<li>Redux</li>
							<li>Flask</li>
							<li>SQLAlchemy</li>
							<li>PostgreSQL</li>
							<li>AWS</li>
						</ul>
					</div>
				</div>
				<div className="footer--bottom-text">
					<span>Feta</span>
					<i className="fa-regular fa-copyright"></i>
					<span>2022</span>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
