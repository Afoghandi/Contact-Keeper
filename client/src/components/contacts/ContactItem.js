import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';

const ContactItem = ({ contact }) => {
	const contactContext = useContext(ContactContext);

	const { deleteContact, setCurrent, clearCurrent } = contactContext;
	const { id, name, email, phone, type } = contact;

	const onDelete = () => {
		deleteContact(id);
		clearCurrent();
	};

	return (
		<div className='card bg-light'>
			<h3 className='text-primary text-left'>
				{name}{' '}
				<span
					style={{ float: 'right' }}
					className={
						'badge ' +
						(type === 'professional' ? 'badge-success' : 'badge-primary')
					}
				>
					{type.charAt(0).toUpperCase() + type.slice(1)}{' '}
				</span>{' '}
			</h3>
			<ul className='list'>
				{email && (
					<li>
						<i className='fas fa-envelope-open' />
						{email}
					</li>
				)}
				{phone && (
					<li>
						<i className='fas fa-phone' />
						{phone}
					</li>
				)}
			</ul>
			<p>
				<div
					className='button btn btn-dark btn-sm'
					onClick={() => setCurrent(contact)}
				>
					Edit
				</div>
				<div className='button btn btn-danger btn-sm' onClick={onDelete}>
					Delete
				</div>
			</p>
		</div>
	);
};

ContactItem.propTypes = {
	contact: PropTypes.object.isRequired,
};
export default ContactItem;
