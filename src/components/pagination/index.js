import React, {useEffect} from 'react';
import classNames from 'classnames';
import Button from '@/components/UI/Button';
import useDebounce from '@/hooks/useDebounce';
import PrevChevron from '@/components/svg/prev-chevron';
import NextChevron from '@/components/svg/next-chevron';
import styles from './index.module.scss';

const Index = ({totalPages, currentPage, onPageChange}) => {
	const DOTS = '...';
	const debounceTiming = 500;

	useEffect(() => {
		if (currentPage > totalPages) {
			onPageChange(1);
		}
	}, [currentPage, totalPages, onPageChange]);

	const handlePrevPage = useDebounce(() => {
		currentPage > 1 && onPageChange(currentPage - 1);
	}, debounceTiming);

	const handleNextPage = useDebounce(() => {
		currentPage < totalPages && onPageChange(currentPage + 1);
	}, debounceTiming);

	const handleNumericChange = useDebounce(number => onPageChange(number), debounceTiming);

	const siblingCount = 1; // Adjust this value to control the number of siblings to show on each side

	const getPageNumbersToShow = () => {
		const pageNumbersToShow = [];

		if (totalPages <= 3) {
			for (let i = 1; i <= totalPages; i++) {
				pageNumbersToShow.push(i);
			}
		} else {
			const currentPageIdx = currentPage - 1;

			if (currentPage <= 2) {
				// If the current page is within the range of the first few pages, show the first 3 pages
				for (let i = 0; i < 3; i++) {
					pageNumbersToShow.push(i + 1);
				}
			} else if (currentPage >= totalPages - 1 - siblingCount) {
				// If the current page is within the range of the last few pages, show the last 3 pages
				for (let i = totalPages - 2 * siblingCount - 2; i < totalPages; i++) {
					pageNumbersToShow.push(i + 1);
				}
			} else {
				// For other cases, show the current page and its siblings
				pageNumbersToShow.push(1);
				pageNumbersToShow.push(DOTS);

				for (let i = currentPageIdx - siblingCount; i <= currentPageIdx + siblingCount; i++) {
					pageNumbersToShow.push(i + 1);
				}
			}
		}

		return pageNumbersToShow;
	};

	useEffect(() => {
		document.body.scrollTop = document.documentElement.scrollTop = 0;
	}, [currentPage]);

	return (
		<div className={styles.paginationWrapper}>
			<div className={styles.paginationContainer}>
				<Button
					design="secondary"
					className={styles.paginationItem}
					onClick={handlePrevPage}
					disabled={currentPage === 1}
				>
					<PrevChevron/>
				</Button>
				{getPageNumbersToShow().map((pageNumber, key) => {
					if (pageNumber === DOTS) return <p key={`dots_${key}`}>{DOTS}</p>

					return (
						<Button
							key={key}
							design="secondary"
							className={classNames([
								styles.paginationItem,
								pageNumber === currentPage && styles.paginationItemActive
							])}
							onClick={() => handleNumericChange(pageNumber)}
						>
							{pageNumber}
						</Button>
					)
				})}
				<Button
					design="secondary"
					className={styles.paginationItem}
					onClick={handleNextPage}
					disabled={currentPage === totalPages}
				>
					<NextChevron/>
				</Button>
			</div>
		</div>
	);
};

export default Index;
