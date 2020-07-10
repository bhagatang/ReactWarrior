import React from 'react';
import classNames from 'classnames';

const MovieTabs = (props) => {
	const { sortBy, updateSortBy } = props;

	const handleClick = (value) => () => {
		updateSortBy(value);
	};

	// const getClassLink = (value) => {
	// 	return `nav-link ${sortBy === value ? 'active' : ''}`;
	// };

	const activeLink = (value) => {
		return classNames({
			'nav-link' : true,
			'active' : sortBy === value
	});
	}

	return (
		<ul className="tabs nav nav-pills">
			<li className="nav-item">
				<div 
				className={activeLink('popularity.desc')}
				onClick={handleClick('popularity.desc')}
				>
					Popularity
				</div>
			</li>
			<li className="nav-item">
				<div 
				className={activeLink('revenue.desc')}
				onClick={handleClick('revenue.desc')}
				>
					Revenue
				</div>
			</li>
			<li className="nav-item">
				<div className={activeLink('vote-average.desc')}
				onClick={handleClick('vote-average.desc')}
				>
					Vote Average
				</div>
			</li>
		</ul>

		)
}

export default MovieTabs;