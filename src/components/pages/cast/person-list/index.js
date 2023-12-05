import React from 'react';
import PersonCard from '@/components/person-card';
import styles from './index.module.scss';

const Index = props => {
	const {
		person = [],
		type = 'cast'
	} = props;

	const filteredCategories = person;

	const categoriesNew = Object.keys(filteredCategories).sort();

	return (
		<>
			{type === 'crew' ? <> {categoriesNew.map((category, index) =>
				<div key={`category-${index}`} className={styles.personWrapper}>
					<h4>{category}</h4>
					<ul>
						{filteredCategories[category].map((newPerson, key) =>
							<li key={`category-${index}-item-${key}`}
								className={styles.personItemContainer}>
								<PersonCard secondary member={newPerson}/>
							</li>
						)}
					</ul>
				</div>)}</>
				: <div className={styles.personWrapper}>
					<ul>
						{person.map(newPerson =>
							<li key={newPerson.id} className={styles.personItemContainer}>
								<PersonCard secondary member={newPerson}/>
							</li>
						)}
					</ul>
				</div>
			}
		</>
	)
}

export default Index;
