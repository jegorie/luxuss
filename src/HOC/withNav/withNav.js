import React from "react";
import "./withNav.styles.scss";

import Navigation from "../../pages/common/Navigation/Navigation";

const withNav = Component => {
	return ({ ...props }) => (
		<div className="withNav">
			<Navigation />
			<div className="withNav__component">
				<Component {...props} />
			</div>
		</div>
	);
};

export default withNav;
