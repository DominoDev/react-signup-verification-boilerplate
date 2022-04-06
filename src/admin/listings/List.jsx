import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { listingService } from '@/_services';

function List({ match }) {
    const { path } = match;
    const [listings, setListings] = useState(null);

    useEffect(() => {
        listingService.getAll().then(x => setListings(x));
    }, []);

    function deleteListing(id) {
        setListings(listings.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        listingService.delete(id).then(() => {
            setListings(listings => listings.filter(x => x.id !== id));
        });
    }

    return (
        <div>
            <h1>Listing</h1>
            <p>All listings from secure (admin only) api end point:</p>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add Listing</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Name</th>
                        <th style={{ width: '30%' }}>Email</th>
                        <th style={{ width: '30%' }}>Role</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {listings && listings.map(listing =>
                        <tr key={listing.id}>
                            <td>{listing.title} {listing.firstName} {listing.lastName}</td>
                            <td>{listing.email}</td>
                            <td>{listing.role}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${listing.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteListing(user.id)} className="btn btn-sm btn-danger" style={{ width: '60px' }} disabled={listing.isDeleting}>
                                    {listing.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!listings &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <span className="spinner-border spinner-border-lg align-center"></span>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export { List };