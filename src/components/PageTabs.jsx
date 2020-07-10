import React from 'react';
import classNames from 'classnames';

function PageTabs (props) {

	const { currentPage, totalPages, changePage } = props;

	const routeToPage = (value) => () => {
		changePage(value)
	}

	const dot = <li className='page-item page-link' >...</li>

	const nextPage = (value) => () => {
		if(value < 500) {
			value++
		} else {
			value = 500;
		} 
		return changePage(value)
	}

	const previousPage = (value) => () => {
		if(value > 1) {
			--value
		} else {
			value = 1
		}
		return changePage(value)
	}

	console.log(currentPage)

	return (
		<div>
			<ul className="pagination justify-content-center">
				<li className='page-item page-link'
				onClick={previousPage(currentPage)}
				>Предыдущая</li>
				{currentPage != 1 ? <li 
				className='page-item page-link'
				onClick={routeToPage(1)}
				>1</li> : null}
				{currentPage > 2 ? dot : null}
				{currentPage > 2 ? <li 
				className='page-item page-link'
				onClick={routeToPage(currentPage - 1)}
				>{currentPage - 1}</li> : null}
				<li 
				className='page-item page-link'
				onClick={routeToPage(currentPage)}
				>{currentPage}</li>
				{currentPage < 499 ? <li 
				className='page-item page-link'
				onClick={routeToPage(currentPage + 1)}
				>{currentPage + 1}</li> : null}
				{currentPage < 499 ? dot : null}
				<li 
				className='page-item page-link'
				onClick={routeToPage(totalPages)}
				>{totalPages}</li>
				<li 
				className='page-item page-link'
				onClick={nextPage(currentPage)}
				>Следующая</li>
			</ul>
		</div>
	)
}

export default PageTabs;